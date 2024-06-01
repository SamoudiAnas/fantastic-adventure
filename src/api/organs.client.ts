import { collections } from "@/constants/collections";
import { toast } from "@/hooks/use-toast";
import { firestore } from "@/lib/firebase";
import { Organ } from "@/types";
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from "firebase/firestore";

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


export const deleteOrgan = async (id: string) => {
  try {
    toast({
      itemID: `delete-organ-${id}`,
      title: "Deleting...",
      description: "Please wait",
      variant: "default",
    });
    await deleteDoc(doc(firestore, collections.organs, id));
    toast({
      itemID: `delete-organ-${id}`,
      title: "Success",
      description: "organ deleted successfully",
      variant: "success",
    });
    return {
      error: null,
    };
  } catch (error) {
    console.log(error);
    toast({
      itemID: `delete-organ-${id}`,
      title: "Error",
      description: "An error occurred while deleting the organ",
      variant: "destructive",
    });
    return {
      error: "Something went wrong",
    };
  }
}


export const deleteOrgans = async (ids: string[]) => {
  try {
    toast({
      itemID: `delete-organs`,
      title: "Deleting...",
      description: "Please wait while we delete the organs",
      variant: "default",
    });

    const batch = writeBatch(firestore);

    ids.forEach((id) => {
      const ref = doc(firestore, collections.organs, id);
      batch.delete(ref);
    });

    await batch.commit();

    toast({
      itemID: `delete-organs`,
      title: "Success",
      description: "Organs deleted successfully",
      variant: "success",
    });

    return {
      error: null,
    };
  } catch (error) {
    console.log(error);
    toast({
      itemID: `delete-organs`,
      title: "Error",
      description: "An error occurred while deleting the organs",
      variant: "destructive",
    });

    return {
      error: "Something went wrong",
    };
  }
};
