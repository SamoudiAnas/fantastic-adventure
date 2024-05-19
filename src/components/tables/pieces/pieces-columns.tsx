import { Checkbox } from "@/components/ui/table";
import { Piece } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Piece>();

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

  columnHelper.accessor("pieceType", {
    header: "Type",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("pieceUnit", {
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
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated at",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

export { columns as piecesColumns };
