import { collections } from "@/constants/collections";
import { db } from "@/lib/admin";
import { Intervention, Organ } from "@/types";

export const getAllInterventions = async () => {
  try {
    const interventionsRef = await db
      .collection(collections.interventions)
      .get();
  
    const organsRef = await db.collection(collections.organs).get();

    const interventions = interventionsRef.docs.map((doc) => ({
      ...doc.data(),
      organ: organsRef.docs.find((organ) => organ.id === doc.data().organId.toUpperCase())?.data() ?? {}as Organ,
    }));


    return {
      error: null,
      interventions: interventions as Intervention & {organ:Organ}[],
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Something went wrong",
      interventions: [] as ((Intervention & {organ:Organ})[]),
    };
  }
};
