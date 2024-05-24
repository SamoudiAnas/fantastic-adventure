import { collections } from "@/constants/collections";
import { db } from "@/lib/admin";
import { Organ } from "@/types";

export const getAllOrgans = async () => {
  try {
    const organsRef = await db.collection(collections.organs).get();
    const organs = organsRef.docs.map((doc) => ({
      ...doc.data(),
    }));

    return {
      error: null,
      organs: organs as Organ[],
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Something went wrong",
      organs: [] as Organ[],
    };
  }
};
