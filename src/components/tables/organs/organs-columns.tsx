import { OrganTableMenu } from "@/components/popovers";
import { Checkbox } from "@/components/ui/table";
import { Organ } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Organ>();

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
  columnHelper.accessor("designation", {
    header: "Designation",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("serviceStartDate", {
    header: "Service Start Date",
    cell: (info) => new Date(info.getValue()).toLocaleString(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("supplier", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("catalog", {
    header: "Catalog",
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
  columnHelper.accessor("id", {
    id: "actions",
    header: "",
    cell: (info) => <OrganTableMenu original={info.row.original} />,
    footer: (info) => info.column.id,
    enableSorting: false,
    enableResizing: false,
    enableColumnFilter: false,
  }),
];

export { columns as organsColumns };
