import { EmptyData } from "@/components/ui/empty-data";
import { Button } from "@/components/ui/button";
import * as Table from "@/components/ui/table";
import { getAllStores } from "@/api/stores";
import { Store } from "@/types";
import { ErrorData } from "@/components/ui/error-data";
import Head from "next/head";

import { AddStore } from "@/components/sheets/store";

export const getServerSideProps = async () => {
  const { stores, error } = await getAllStores();
  return { props: { stores, error } };
};

interface HomeProps {
  stores: Store[];
  error: string | null;
}

export default function Home({ stores, error }: HomeProps) {
  return (
    <>
      <Head>
        <title>Magasin - Dashboard</title>
      </Head>
      <main className="p-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-lg font-bold">Magasin</h1>
            <p className="max-w-[55ch] text-sm text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Suscipit, quae vero. Voluptas adipisci praesentium.
            </p>
          </div>
          <AddStore />
        </div>

        {error && <ErrorData />}

        {!error && stores.length === 0 && <EmptyData />}

        {!error && stores.length > 0 && (
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
              {stores.map((store) => (
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
        )}
      </main>
    </>
  );
}
