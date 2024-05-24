import React, { useMemo, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Table } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { DebouncedInput } from "@/components/ui/input";

const camelCaseToReadable = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

interface FilterProps {
  table: Table<any>;
}

const TableFilter: React.FC<FilterProps> = ({ table: tableProp }) => {
  const [isOpen, setisOpen] = useState(false);
  const [isCleared, setIsCleared] = useState(false);

  const table = useMemo(() => tableProp, [isCleared]);

  return (
    <Popover open={isOpen} onOpenChange={setisOpen}>
      <PopoverTrigger className={buttonVariants({ variant: "dashed-ghost" })}>
        Filters
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="max-h-80 w-80 overflow-y-auto p-6 py-6 lg:max-h-none lg:w-[35rem]"
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className="lg:grid lg:grid-cols-2 lg:gap-4 lg:gap-y-2"
          >
            {headerGroup.headers.map((header) => {
              if (header.column.getCanFilter()) {
                return (
                  <div key={header.id}>
                    {header.column.getCanFilter() ? (
                      <div>
                        <label className="mb-2 text-sm">
                          {camelCaseToReadable(header.column.id)}:
                        </label>

                        <div className="mb-3">
                          <DebouncedInput
                            type="text"
                            value={
                              (table
                                .getAllColumns()
                                .find(
                                  (column) => column.id === header.column.id,
                                )
                                ?.getFilterValue() as string) ?? ""
                            }
                            onChange={(value) =>
                              header.column.setFilterValue(String(value))
                            }
                            placeholder={`Search...`}
                            list={header.column.id + "list"}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        ))}

        <Button
          variant="outlined-ghost"
          onClick={() => {
            setIsCleared((prev) => !prev);
            table.setColumnFilters([]);
          }}
        >
          Clear Filters
        </Button>
      </PopoverContent>
    </Popover>
  );
};

const MemoizedTableFilter = React.memo(TableFilter);
export { MemoizedTableFilter as TableFilter };
