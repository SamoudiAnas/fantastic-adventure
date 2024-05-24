import { collections } from "@/constants/collections";
import { db } from "@/lib/admin";
import { Intervention } from "@/types";

export const getAllInterventions = async () => {
  try {
    const interventionsRef = await db
      .collection(collections.interventions)
      .get();
    const interventions = interventionsRef.docs.map((doc) => ({
      ...doc.data(),
    }));

    return {
      error: null,
      interventions: interventions as Intervention[],
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Something went wrong",
      interventions: [] as Intervention[],
    };
  }
};
