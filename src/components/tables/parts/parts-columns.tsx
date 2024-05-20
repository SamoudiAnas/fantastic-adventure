import { Checkbox } from "@/components/ui/table";
import { Part } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Part>();

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
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("partDesignation", {
    header: "Designation",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("partType", {
    header: "Type",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("partUnit", {
    header: "Unit",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("receptionDate", {
    header: "Reception Date",
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

export { columns as partsColumns };
