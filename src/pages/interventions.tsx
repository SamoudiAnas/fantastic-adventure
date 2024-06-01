import { EmptyData } from "@/components/ui/empty-data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Intervention, Organ,  } from "@/types";
import { ErrorData } from "@/components/ui/error-data";
import Head from "next/head";

import { SearchInput } from "@/components/ui/input";
import { CSVLink } from "react-csv";
import { InterventionsTable } from "@/components/tables/interventions/interventions-table";
import { getAllInterventions } from "@/api/interventions";
import { useState } from "react";
import { ColumnFiltersState, FilterFnOption, SortingState, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { interventionsColumns } from "@/components/tables/interventions/interventions-columns";
import { fuzzyFilter } from "@/helpers/fuzzyFilter";

export const getServerSideProps = async () => {
  const { interventions, error } = await getAllInterventions();
  return { props: { interventions, error } };
};

interface InterventionProps {
  interventions: Intervention &{organ:Organ} [];
  error: string | null;
}

export default function Home({ interventions, error }: InterventionProps) {
 
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: interventions ?? [],
    columns: interventionsColumns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy" as FilterFnOption<Intervention>,
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
        <title>Interventions - Dashboard</title>
      </Head>
      <main className="p-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-lg font-bold">Interventions</h1>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SearchInput
              className="max-w-96 "
              placeholder="Search for a part..."
            />
            <Button variant="dashed-ghost">Filter</Button>
          </div>

          <div className="flex items-center gap-4">
            <CSVLink
              data={interventions}
              enclosingCharacter={`'`}
              filename={`interventions-${new Date().toISOString()}.csv`}
              className={buttonVariants({ variant: "outlined-ghost" })}
            >
              Export
            </CSVLink>
            
          </div>
        </div>

        {error && <ErrorData />}
        {!error && interventions?.length === 0 && <EmptyData />}
        {!error && interventions?.length > 0 && <InterventionsTable table={table} />}
      </main>
    </>
  );
}
