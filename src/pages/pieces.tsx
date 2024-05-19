import { EmptyData } from "@/components/ui/empty-data";
import { ErrorData } from "@/components/ui/error-data";
import { Piece } from "@/types";
import Head from "next/head";
import { CSVLink } from "react-csv";

import { getAllPieces } from "@/api/pieces";
import { AddPiece } from "@/components/sheets/piece";
import { SearchInput } from "@/components/ui/input";
import { PiecesTable } from "@/components/tables/pieces/pieces-table";
import { Button, buttonVariants } from "@/components/ui/button";

export const getServerSideProps = async () => {
  const { pieces, error } = await getAllPieces();
  return { props: { pieces, error } };
};

interface PieceProps {
  pieces: Piece[];
  error: string | null;
}

export default function Home({ pieces, error }: PieceProps) {
  return (
    <>
      <Head>
        <title>Piece - Dashboard</title>
      </Head>
      <main className="p-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-lg font-bold">Pieces</h1>
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
              data={pieces}
              enclosingCharacter={`'`}
              filename={`pieces-${new Date().toISOString()}.csv`}
              className={buttonVariants({ variant: "outlined-ghost" })}
            >
              Export
            </CSVLink>
            <AddPiece />
          </div>
        </div>

        {error && <ErrorData />}
        {!error && pieces?.length === 0 && <EmptyData />}
        {!error && pieces?.length > 0 && <PiecesTable pieces={pieces} />}
      </main>
    </>
  );
}
