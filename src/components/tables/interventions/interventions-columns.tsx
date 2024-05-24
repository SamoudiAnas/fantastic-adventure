import { Intervention } from "@/types";
import { Checkbox } from "@/components/ui/table";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Intervention>();

const columns = [
  columnHelper.accessor("id", {
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsSomeRowsSelected()
              ? "indeterminate"
              : table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
    enableResizing: false,
    enableColumnFilter: false,

    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("duration", {
    header: "Duration",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("registrationNumber", {
    header: "Registration Number",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("machineId", {
    header: "Machine ID",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("createdAt", {
    header: "Created at",
    cell: (info) => new Date(info.getValue()).toLocaleString(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated at",
    cell: (info) => new Date(info.getValue()).toLocaleString(),
    footer: (info) => info.column.id,
  }),
];

export { columns as interventionsColumns };