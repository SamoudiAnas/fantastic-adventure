import { collections } from "@/constants/collections";
import { db } from "@/lib/admin";
import { Store } from "@/types";

export const getAllStores = async () => {
  try {
    const storesRef = await db.collection(collections.stores).get();
    const stores = storesRef.docs.map((doc) => ({
      ...doc.data(),
    }));

    return {
      error: null,
      stores: stores as Store[],
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Something went wrong",
      stores: [] as Store[],
    };
  }
};
