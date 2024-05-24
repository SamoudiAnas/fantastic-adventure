import { interventionsColumns } from "@/components/tables/interventions/interventions-columns";
import { InterventionsTable } from "@/components/tables/interventions/interventions-table";
import { TableFilter } from "@/components/tables/table-filters";
import { buttonVariants } from "@/components/ui/button";
import { DebouncedSearchInput } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { fuzzyFilter } from "@/helpers/fuzzyFilter";
import { Intervention } from "@/types";
import {
  ColumnFiltersState,
  FilterFnOption,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useState } from "react";
import { CSVLink } from "react-csv";
import { useQuery } from "react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getInterventionByOrganId } from "@/api/interventions.client";

interface HistoryInterventionProps {
  organId: string;
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const HistoryIntervention = ({
  organId,
  open,
  setIsOpen,
}: HistoryInterventionProps) => {
  const { data: interventionsData } = useQuery(queryKeys.interventions, () =>
    getInterventionByOrganId(organId),
  );

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: interventionsData?.interventions ?? [],
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
    <div>
      <Sheet open={open} onOpenChange={setIsOpen}>
        <SheetContent className="lg:max-w-screen-sm xl:max-w-screen-md">
          <div>
            <h1 className="mb-2 text-lg font-bold">Interventions</h1>
          </div>
          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <DebouncedSearchInput
                className="max-w-96 "
                value={globalFilter ?? ""}
                onChange={(value) => setGlobalFilter(String(value))}
                placeholder="Search interventions..."
              />
              <p className="text-gray-500">
                {table.getPrePaginationRowModel().rows.length} interventions
              </p>
              <TableFilter table={table} />
            </div>

            <div className="flex items-center gap-4">
              {interventionsData?.interventions?.length &&
                interventionsData?.interventions?.length > 0 && (
                  <CSVLink
                    data={interventionsData?.interventions ?? []}
                    enclosingCharacter={`'`}
                    filename={`interventions-${new Date().toISOString()}.csv`}
                    className={buttonVariants({ variant: "outlined-ghost" })}
                  >
                    Export
                  </CSVLink>
                )}
            </div>
          </div>
          <InterventionsTable table={table} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
