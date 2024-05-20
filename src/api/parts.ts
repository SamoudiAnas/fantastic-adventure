import { collections } from "@/constants/collections";
import { db } from "@/lib/admin";
import { Part } from "@/types";

export const getAllParts = async () => {
  try {
    const partsRef = await db.collection(collections.parts).get();
    const parts = partsRef.docs.map((doc) => ({
      ...doc.data(),
    }));

    return {
      error: null,
      parts: parts as Part[],
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Something went wrong",
      parts: [] as Part[],
    };
  }
};
