import { EmptyData } from "@/components/ui/empty-data";
import { ErrorData } from "@/components/ui/error-data";
import { Intervention, RTGMachine } from "@/types";
import Head from "next/head";
import { CSVLink } from "react-csv";

import { getAllRTGMachines } from "@/api/rtg-machines";
import { AddRTGMachine } from "@/components/sheets/rtg-machine";
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
import { useEffect, useState } from "react";

import { fuzzyFilter } from "@/helpers/fuzzyFilter";
import { TableFilter } from "@/components/tables/table-filters";
import { rtgMachinesColumns } from "@/components/tables/rtg-machine/rtg-machine-columns";
import { RTGMachinesTable } from "@/components/tables/rtg-machine/rtg-machine-table";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { collections } from "@/constants/collections";

export const getServerSideProps = async () => {
  const { rtgMachines, error } = await getAllRTGMachines();
  return { props: { rtgMachines, error } };
};

interface RTGMachineProps {
  rtgMachines: RTGMachine[];
  error: string | null;
}

export default function Home({ rtgMachines, error }: RTGMachineProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: rtgMachines,
    columns: rtgMachinesColumns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy" as FilterFnOption<RTGMachine>,
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
        <title>RTG Machine - Dashboard</title>
      </Head>
      <main className="p-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-lg font-bold">RTG Machines</h1>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <DebouncedSearchInput
              className="max-w-96 "
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search RTG Machines..."
            />
            <p className="text-gray-500">
              {table.getPrePaginationRowModel().rows.length} RTG Machines
            </p>

            <TableFilter table={table} />
          </div>

          <div className="flex items-center gap-4">
            {rtgMachines?.length > 0 && (
              <CSVLink
                data={rtgMachines}
                enclosingCharacter={`'`}
                filename={`rtgMachines-${new Date().toISOString()}.csv`}
                className={buttonVariants({ variant: "outlined-ghost" })}
              >
                Export
              </CSVLink>
            )}
            <AddRTGMachine />
          </div>
        </div>

        {error && <ErrorData />}
        {!error && rtgMachines?.length === 0 && <EmptyData />}
        {!error && rtgMachines?.length > 0 && (
          <RTGMachinesTable table={table} />
        )}
      </main>
    </>
  );
}
