import { collections } from "@/constants/collections";
import { db } from "@/lib/admin";
import { Piece } from "@/types";

export const getAllPieces = async () => {
  try {
    const piecesRef = await db.collection(collections.pieces).get();
    const pieces = piecesRef.docs.map((doc) => ({
      ...doc.data(),
    }));

    return {
      error: null,
      pieces: pieces as Piece[],
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Something went wrong",
      pieces: [] as Piece[],
    };
  }
};
