"use client";

import { collections } from "@/constants/collections";
import { toast } from "@/hooks/use-toast";
import { firestore } from "@/lib/firebase";
import { Intervention, Organ } from "@/types";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";

export const getInterventionByOrganId = async (machineId: string) => {
  try {
    const q = query(
      collection(firestore, collections.interventions),
      where("machineId", "==", machineId),
    );

    const querySnapshot = await getDocs(q);


    let interventions: Intervention[] = [];
    querySnapshot.forEach((doc) => {
      interventions.push(doc.data() as Intervention);
    });


    const organsRef = collection(firestore, collections.organs);
    const querySnapshotOrgans = await getDocs(organsRef);

    interventions = interventions.map((intervention) => {
      const organ = querySnapshotOrgans.docs.find(
        (organ) => organ.id === intervention.organId.toUpperCase(),
      )?.data();

      return {
        ...intervention,
        organ: organ ?? {},
      };
    });

    return {
      error: null,
      interventions: interventions as (Intervention & {organ:Organ})[],
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
      interventions: [] as (Intervention & {organ:Organ})[],
    };
  }
};

export const deleteIntervention = async (id: string) => {
  try {
    toast({
      itemID: `delete-intervention-${id}`,
      title: "Deleting...",
      description: "Please wait",
      variant: "default",
    });
    await deleteDoc(doc(firestore, collections.interventions, id));
    toast({
      itemID: `delete-intervention-${id}`,
      title: "Success",
      description: "Intervention deleted successfully",
      variant: "success",
    });
    return {
      error: null,
    };
  } catch (error) {
    console.log(error);
    toast({
      itemID: `delete-intervention-${id}`,
      title: "Error",
      description: "An error occurred while deleting the intervention",
      variant: "destructive",
    });
    return {
      error: "Something went wrong",
    };
  }
};

export const deleteInterventions = async (ids: string[]) => {
  try {
    toast({
      itemID: `delete-interventions`,
      title: "Deleting...",
      description: "Please wait while we delete the interventions",
      variant: "default",
    });

    const batch = writeBatch(firestore);

    ids.forEach((id) => {
      const ref = doc(firestore, collections.interventions, id);
      batch.delete(ref);
    });

    await batch.commit();

    toast({
      itemID: `delete-interventions`,
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
      itemID: `delete-interventions`,
      title: "Error",
      description: "An error occurred while deleting the interventions",
      variant: "destructive",
    });

    return {
      error: "Something went wrong",
    };
  }
};
