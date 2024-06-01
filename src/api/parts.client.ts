"use client";

import { collections } from "@/constants/collections";
import { toast } from "@/hooks/use-toast";
import { firestore } from "@/lib/firebase";
import {

  doc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";



export const deletePart = async (id: string) => {
  try {
    toast({
      itemID: `delete-part-${id}`,
      title: "Deleting...",
      description: "Please wait",
      variant: "default",
    });
    await deleteDoc(doc(firestore, collections.parts, id));
    toast({
      itemID: `delete-part-${id}`,
      title: "Success",
      description: "part deleted successfully",
      variant: "success",
    });
    return {
      error: null,
    };
  } catch (error) {
    console.log(error);
    toast({
      itemID: `delete-part-${id}`,
      title: "Error",
      description: "An error occurred while deleting the part",
      variant: "destructive",
    });
    return {
      error: "Something went wrong",
    };
  }
};

export const deleteParts = async (ids: string[]) => {
  try {
    toast({
      itemID: `delete-parts`,
      title: "Deleting...",
      description: "Please wait while we delete the parts",
      variant: "default",
    });

    const batch = writeBatch(firestore);

    ids.forEach((id) => {
      const ref = doc(firestore, collections.parts, id);
      batch.delete(ref);
    });

    await batch.commit();

    toast({
      itemID: `delete-parts`,
      title: "Success",
      description: "Parts deleted successfully",
      variant: "success",
    });

    return {
      error: null,
    };
  } catch (error) {
    console.log(error);
    toast({
      itemID: `delete-parts`,
      title: "Error",
      description: "An error occurred while deleting the parts",
      variant: "destructive",
    });

    return {
      error: "Something went wrong",
    };
  }
};
