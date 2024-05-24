import TriangleIcon from "@root/public/svgs/triangle.svg";
import * as Table from "@/components/ui/table";
import { RTGMachine } from "@/types";

import { Table as TanstackTable, flexRender } from "@tanstack/react-table";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/utils/cn";
import { deleteRTGMachines } from "@/api/rtg-machines.client";
import { queryKeys } from "@/constants/queryKeys";
import { queryClient } from "@/pages/_app";
import { useRouter } from "next/router";

interface RTGMachinesTableProps {
  table: TanstackTable<RTGMachine>;
}

export const RTGMachinesTable = ({ table }: RTGMachinesTableProps) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <>
      <Table.Root
        className="mt-4"
        tableStyle={{
          minWidth: "100%",
          width: table.getCenterTotalSize(),
        }}
      >
        <Table.Head>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.HeadCell
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{
                    width: header.id === "id" ? "1.5rem" : header.getSize(),
                  }}
                  className="group relative"
                  onClick={header.column.getToggleSortingHandler}
                >
                  <div
                    className="flex items-center gap-2"
                    onClick={() =>
                      header.column.toggleSorting(
                        header.column.getIsSorted() === "asc" ? true : false,
                      )
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                    {header.column.getCanSort() && (
                      <div className="flex.flex-col items-center text-zinc-500">
                        <TriangleIcon
                          className={cn(
                            "size-3 ",
                            header.column.getIsSorted() === "asc" &&
                              "text-zinc-900",
                          )}
                        />
                        <TriangleIcon
                          className={cn(
                            "-mt-1 size-3 rotate-180 transform",
                            header.column.getIsSorted() === "desc" &&
                              "text-zinc-900",
                          )}
                        />
                      </div>
                    )}
                  </div>
                  {header.column.getCanResize() && (
                    <div
                      className={cn(
                        "resizer absolute right-0 top-0 h-12 w-1 bg-transparent hover:cursor-col-resize group-hover:bg-gray-500",
                        table.options.columnResizeDirection,
                        header.column.getIsResizing() &&
                          "isResizing cursor-col-resize bg-blue-500",
                      )}
                      onDoubleClick={() => header.column.resetSize()}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                    />
                  )}
                </Table.HeadCell>
              ))}
            </Table.Row>
          ))}
        </Table.Head>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.BodyRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell
                  key={cell.id}
                  style={{
                    width:
                      cell.column.id === "id"
                        ? "1.5rem"
                        : cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table.Root>

      <Panel
        dataId="RTG machines"
        selectedData={table
          .getSelectedRowModel()
          .rows.map((row) => row.original.id)}
        onClear={() => table.toggleAllPageRowsSelected(false)}
        onDelete={async () => {
          await deleteRTGMachines(
            table.getSelectedRowModel().rows.map((row) => row.original.id),
          );
          refreshData();
          table.toggleAllPageRowsSelected(false);
          queryClient.invalidateQueries(queryKeys.interventions);
        }}
      />
    </>
  );
};
