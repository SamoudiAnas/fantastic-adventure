import { EmptyData } from "@/components/ui/empty-data";
import { ErrorData } from "@/components/ui/error-data";
import { Button } from "@/components/ui/button";
import * as Table from "@/components/ui/table";
import { Piece } from "@/types";
import Head from "next/head";

import { getAllPieces } from "@/api/pieces";
import { AddPiece } from "@/components/sheets/piece";

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
            <p className="max-w-[55ch] text-sm text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Suscipit, quae vero. Voluptas adipisci praesentium.
            </p>
          </div>
          <AddPiece />
        </div>

        {error && <ErrorData />}

        {!error && pieces?.length === 0 && <EmptyData />}

        {!error && pieces?.length > 0 && (
          <Table.Root className="mt-8">
            <Table.Head>
              <Table.Row>
                <Table.HeadCell className="w-fit pr-4">
                  <Table.Checkbox checked={false} />
                </Table.HeadCell>
                <Table.HeadCell>Part Designation</Table.HeadCell>
                <Table.HeadCell>Unit</Table.HeadCell>
                <Table.HeadCell>Type</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell>Reception Date</Table.HeadCell>
                <Table.HeadCell>Created at</Table.HeadCell>
                <Table.HeadCell>Updated at</Table.HeadCell>
                <Table.HeadCell> </Table.HeadCell>
              </Table.Row>
            </Table.Head>

            <Table.Body>
              {pieces.map((piece) => (
                <Table.BodyRow key={piece.id}>
                  <Table.Cell className="pr-4">
                    <Table.Checkbox checked={false} />
                  </Table.Cell>
                  <Table.Cell>{piece.partDesignation}</Table.Cell>
                  <Table.Cell>{piece.pieceUnit}</Table.Cell>
                  <Table.Cell>{piece.pieceType}</Table.Cell>
                  <Table.Cell>{piece.price}</Table.Cell>
                  <Table.Cell>{piece.quantity}</Table.Cell>
                  <Table.Cell>{piece.receptionDate}</Table.Cell>
                  <Table.Cell>{piece.createdAt}</Table.Cell>
                  <Table.Cell>{piece.updatedAt}</Table.Cell>
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
