import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import * as Table from "@/components/ui/table";
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
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="mb-2 text-lg font-bold">Magasin</h1>
          <p className="max-w-[55ch] text-sm text-gray-500">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit,
            quae vero. Voluptas adipisci praesentium.
          </p>
        </div>
        <Button>Ajouter un magasin</Button>
      </div>

      <Table.Root className="mt-8">
        <Table.Head>
          <Table.Row>
            <Table.HeadCell className="w-fit pr-4">
              <Table.Checkbox checked={false} />
            </Table.HeadCell>
            <Table.HeadCell>Manager</Table.HeadCell>
            <Table.HeadCell>Capacité</Table.HeadCell>
            <Table.HeadCell>Créé le</Table.HeadCell>
            <Table.HeadCell>Modifié le</Table.HeadCell>
            <Table.HeadCell> </Table.HeadCell>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {mockData.map((store) => (
            <Table.BodyRow key={store.id}>
              <Table.Cell className="pr-4">
                <Table.Checkbox checked={false} />
              </Table.Cell>
              <Table.Cell>{store.manager}</Table.Cell>
              <Table.Cell>{store.capacity}</Table.Cell>
              <Table.Cell>{store.createdAt}</Table.Cell>
              <Table.Cell>{store.updatedAt}</Table.Cell>
              <Table.Cell>
                <Button size="sm">Modifier</Button>
              </Table.Cell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table.Root>
    </main>
  );
}
