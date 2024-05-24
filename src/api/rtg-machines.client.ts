import { collections } from "@/constants/collections";
import { toast } from "@/hooks/use-toast";
import { firestore } from "@/lib/firebase";
import { doc, writeBatch } from "firebase/firestore";

export const deleteRTGMachines = async (ids: string[]) => {
  try {
    toast({
      itemID: `delete-rtg-machine`,
      title: "Deleting...",
      description: "Please wait while we delete the rtg-machine",
      variant: "default",
    });

    const batch = writeBatch(firestore);

    ids.forEach((id) => {
      const ref = doc(firestore, collections.rtgMachines, id);
      batch.delete(ref);
    });

    await batch.commit();

    toast({
      itemID: `delete-rtg-machine`,
      title: "Success",
      description: "Interventions deleted successfully",
      variant: "success",
    });

    return {
      error: null,
    };
  } catch (error) {
    console.log(error);
    toast({
      itemID: `delete-rtg-machine`,
      title: "Error",
      description: "An error occurred while deleting the rtg-machine",
      variant: "destructive",
    });

    return {
      error: "Something went wrong",
    };
  }
};
