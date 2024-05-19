import { EmptyData } from "@/components/ui/empty-data";
import { Button, buttonVariants } from "@/components/ui/button";
import * as Table from "@/components/ui/table";
import { getAllStores } from "@/api/stores";
import { Store } from "@/types";
import { ErrorData } from "@/components/ui/error-data";
import Head from "next/head";

import { AddStore } from "@/components/sheets/store";
import { SearchInput } from "@/components/ui/input";
import { CSVLink } from "react-csv";
import { StoresTable } from "@/components/tables/stores/stores-table";

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
            <h1 className="mb-2 text-lg font-bold">Magasins</h1>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SearchInput
              className="max-w-96 "
              placeholder="Search for a piece..."
            />
            <Button variant="dashed-ghost">Filter</Button>
          </div>

          <div className="flex items-center gap-4">
            <CSVLink
              data={stores}
              enclosingCharacter={`'`}
              filename={`pieces-${new Date().toISOString()}.csv`}
              className={buttonVariants({ variant: "outlined-ghost" })}
            >
              Export
            </CSVLink>
            <AddStore />
          </div>
        </div>

        {error && <ErrorData />}
        {!error && stores?.length === 0 && <EmptyData />}
        {!error && stores?.length > 0 && <StoresTable stores={stores} />}
      </main>
    </>
  );
}
