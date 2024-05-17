import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableBodyRow,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/ui/table";
import { Store } from "@/types";

const mockData: Store[] = [
  {
    id: 1,
    manager: "manager 1",
    capacity: 1,
    piecesIds: [1],
    exitVoucherIds: [1],
    accessoireIds: [1],
    createdAt: "2021-10-01",
    updatedAt: "2021-10-01",
  },
  {
    id: 2,
    manager: "manager 2",
    capacity: 2,
    piecesIds: [2],
    exitVoucherIds: [2],
    accessoireIds: [2],
    createdAt: "2021-10-02",
    updatedAt: "2021-10-02",
  },
  {
    id: 3,
    manager: "manager 3",
    capacity: 3,
    piecesIds: [3],
    exitVoucherIds: [3],
    accessoireIds: [3],
    createdAt: "2021-10-03",
    updatedAt: "2021-10-03",
  },
  {
    id: 4,
    manager: "manager 4",
    capacity: 4,
    piecesIds: [4],
    exitVoucherIds: [4],
    accessoireIds: [4],
    createdAt: "2021-10-04",
    updatedAt: "2021-10-04",
  },
  {
    id: 5,
    manager: "manager 5",
    capacity: 5,
    piecesIds: [5],
    exitVoucherIds: [5],
    accessoireIds: [5],
    createdAt: "2021-10-05",
    updatedAt: "2021-10-05",
  },
  {
    id: 6,
    manager: "manager 6",
    capacity: 6,
    piecesIds: [6],
    exitVoucherIds: [6],
    accessoireIds: [6],
    createdAt: "2021-10-06",
    updatedAt: "2021-10-06",
  },
  {
    id: 7,
    manager: "manager 7",
    capacity: 7,
    piecesIds: [7],
    exitVoucherIds: [7],
    accessoireIds: [7],
    createdAt: "2021-10-07",
    updatedAt: "2021-10-07",
  },
  {
    id: 8,
    manager: "manager 8",
    capacity: 8,
    piecesIds: [8],
    exitVoucherIds: [8],
    accessoireIds: [8],
    createdAt: "2021-10-08",
    updatedAt: "2021-10-08",
  },
  {
    id: 9,
    manager: "manager 9",
    capacity: 9,
    piecesIds: [9],
    exitVoucherIds: [9],
    accessoireIds: [9],
    createdAt: "2021-10-09",
    updatedAt: "2021-10-09",
  },
  {
    id: 10,
    manager: "manager 10",
    capacity: 10,
    piecesIds: [10],
    exitVoucherIds: [10],
    accessoireIds: [10],
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
];

export default function Home() {
  return (
    <main className="p-8">
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-lg font-bold mb-2">Magasin</h1>
          <p className="text-sm text-gray-500 max-w-[55ch]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit,
            quae vero. Voluptas adipisci praesentium.
          </p>
        </div>
        <Button>Ajouter un magasin</Button>
      </div>

      <Table className="mt-8">
        <TableHead>
          <TableRow>
            <TableHeadCell className="pr-4 w-fit">
              <div className="flex items-center">
                <Checkbox />
              </div>
            </TableHeadCell>
            <TableHeadCell>Manager</TableHeadCell>
            <TableHeadCell>Capacité</TableHeadCell>
            <TableHeadCell>Créé le</TableHeadCell>
            <TableHeadCell>Modifié le</TableHeadCell>
            <TableHeadCell> </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {mockData.map((store) => (
            <TableBodyRow key={store.id}>
              <TableCell className="pr-4">
                <Checkbox />
              </TableCell>
              <TableCell>{store.manager}</TableCell>
              <TableCell>{store.capacity}</TableCell>
              <TableCell>{store.createdAt}</TableCell>
              <TableCell>{store.updatedAt}</TableCell>
              <TableCell>
                <Button size="sm">Modifier</Button>
              </TableCell>
            </TableBodyRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
