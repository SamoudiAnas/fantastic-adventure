import { collections } from "@/constants/collections";
import { db } from "@/lib/admin";
import { RTGMachine } from "@/types";

export const getAllRTGMachines = async () => {
  try {
    const rtgMachinesRef = await db.collection(collections.rtgMachines).get();
    const rtgMachines = rtgMachinesRef.docs.map((doc) => ({
      ...doc.data(),
    }));

    return {
      error: null,
      rtgMachines: rtgMachines as RTGMachine[],
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Something went wrong",
      rtgMachines: [] as RTGMachine[],
    };
  }
};
