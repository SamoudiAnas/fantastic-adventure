import { EmptyData } from "@/components/ui/empty-data";
import { ErrorData } from "@/components/ui/error-data";
import { Intervention, Organ } from "@/types";
import Head from "next/head";
import { CSVLink } from "react-csv";

import { getAllOrgans } from "@/api/organs";
import { AddOrgan } from "@/components/sheets/organ";
import { DebouncedSearchInput } from "@/components/ui/input";
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

import { fuzzyFilter } from "@/helpers/fuzzyFilter";
import { TableFilter } from "@/components/tables/table-filters";
import { organsColumns } from "@/components/tables/organs/organs-columns";
import { OrgansTable } from "@/components/tables/organs/organs-table";
import { HistoryIntervention } from "@/components/sheets/intervention/history-intervention";
import { getAllInterventions } from "@/api/interventions";

export const getServerSideProps = async () => {
  const { organs, error } = await getAllOrgans();
  return { props: { organs, error } };
};

interface OrganProps {
  organs: Organ[];
  error: string | null;
}

export default function Home({ organs, error }: OrganProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: organs,
    columns: organsColumns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy" as FilterFnOption<Organ>,
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
        <title>Organ - Dashboard</title>
      </Head>
      <main className="p-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-lg font-bold">Organs</h1>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <DebouncedSearchInput
              className="max-w-96 "
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search organs..."
            />
            <p className="text-gray-500">
              {table.getPrePaginationRowModel().rows.length} organs
            </p>

            <TableFilter table={table} />
          </div>

          <div className="flex items-center gap-4">
            {organs?.length > 0 && (
              <CSVLink
                data={organs}
                enclosingCharacter={`'`}
                filename={`organs-${new Date().toISOString()}.csv`}
                className={buttonVariants({ variant: "outlined-ghost" })}
              >
                Export
              </CSVLink>
            )}
            <AddOrgan />
          </div>
        </div>

        {error && <ErrorData />}
        {!error && organs?.length === 0 && <EmptyData />}
        {!error && organs?.length > 0 && <OrgansTable table={table} />}
      </main>
    </>
  );
}
