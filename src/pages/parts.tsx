import { EmptyData } from "@/components/ui/empty-data";
import { ErrorData } from "@/components/ui/error-data";
import { Part } from "@/types";
import Head from "next/head";
import { CSVLink } from "react-csv";

import { getAllParts } from "@/api/parts";
import { AddPart } from "@/components/sheets/part";
import { DebouncedSearchInput } from "@/components/ui/input";
import { PartsTable } from "@/components/tables/parts/parts-table";
import { buttonVariants } from "@/components/ui/button";

import {
  ColumnFiltersState,
  FilterFnOption,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { partsColumns } from "@/components/tables/parts/parts-columns";
import { fuzzyFilter } from "@/helpers/fuzzyFilter";

export const getServerSideProps = async () => {
  const { parts, error } = await getAllParts();
  return { props: { parts, error } };
};

interface PartProps {
  parts: Part[];
  error: string | null;
}

export default function Home({ parts, error }: PartProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: parts,
    columns: partsColumns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy" as FilterFnOption<Part>,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });
  return (
    <>
      <Head>
        <title>Part - Dashboard</title>
      </Head>
      <main className="p-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-lg font-bold">Parts</h1>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <DebouncedSearchInput
              className="max-w-96 "
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search parts..."
            />
            <p className="text-gray-500">
              {table.getPrePaginationRowModel().rows.length} parts
            </p>
          </div>

          <div className="flex items-center gap-4">
            <CSVLink
              data={parts}
              enclosingCharacter={`'`}
              filename={`parts-${new Date().toISOString()}.csv`}
              className={buttonVariants({ variant: "outlined-ghost" })}
            >
              Export
            </CSVLink>
            <AddPart />
          </div>
        </div>

        {error && <ErrorData />}
        {!error && parts?.length === 0 && <EmptyData />}
        {!error && parts?.length > 0 && <PartsTable table={table} />}
      </main>
    </>
  );
}
