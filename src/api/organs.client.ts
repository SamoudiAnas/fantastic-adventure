import { collections } from "@/constants/collections";
import { firestore } from "@/lib/firebase";
import { Organ } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getAllOrgans = async () => {
  try {
    const organsRef = collection(firestore, collections.organs);

    const querySnapshot = await getDocs(organsRef);

    let organs: Organ[] = [];
    querySnapshot.forEach((doc) => {
      organs.push(doc.data() as Organ);
    });

    return {
      error: null,
      organs: organs as Organ[],
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
      organs: [] as Organ[],
    };
  }
};

export const getOrgansOfMachine = async (machineId: string) => {
  try {
    const organsRef = collection(firestore, collections.organs);
    const q = query(organsRef, where("machineId", "==", machineId));

    const querySnapshot = await getDocs(q);

    let organs: Organ[] = [];
    querySnapshot.forEach((doc) => {
      organs.push(doc.data() as Organ);
    });

    return {
      error: null,
      organs: organs as Organ[],
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
      organs: [] as Organ[],
    };
  }
};
