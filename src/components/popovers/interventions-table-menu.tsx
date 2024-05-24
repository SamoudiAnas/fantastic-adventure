import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverMenuItem,
  PopoverTrigger,
} from "@/components/ui/popover";
import { buttonVariants } from "@/components/ui/button";
import { doc, deleteDoc } from "firebase/firestore";
import { Edit, Ellipsis, PanelLeftOpen, Settings, Trash } from "lucide-react";
import { firestore } from "@/lib/firebase";
import { collections } from "@/constants/collections";
import { toast } from "@/hooks/use-toast";
import { Intervention } from "@/types";
import { useRouter } from "next/router";
import { AddIntervention } from "../sheets/intervention";

interface InterventionTableMenuProps {
  original: Intervention;
}

export const InterventionTableMenu = ({
  original,
}: InterventionTableMenuProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);
  const [openIntervention, setOpenIntervention] = useState(false);
  const [openInterventionsHistory, setOpenInterventionsHistory] =
    useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteIntervention = async () => {
    try {
      toast({
        itemID: `delete-intervention-${original.id}`,
        title: "Loading...",
        description: "Deleting the intervention",
      });
      await deleteDoc(doc(firestore, collections.interventions, original.id));
      refreshData();
      toast({
        itemID: `delete-intervention-${original.id}`,
        title: "Success",
        description: "The intervention has been deleted",
        variant: "success",
      });
    } catch (err) {
      console.error(err);
      toast({
        itemID: `delete-intervention-${original.id}`,
        title: "Erreur",
        description: "An error occurred while deleting the intervention",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={buttonVariants({
            variant: "ghost",
            className: "float-right px-2 shadow-none",
          })}
        >
          <span className="sr-only">Open Menu</span>
          <Ellipsis className="size-6" />
        </PopoverTrigger>
        <PopoverContent align="end" className="flex flex-col gap-1">
          <PopoverMenuItem
            Icon={PanelLeftOpen}
            content="Edit in panel"
            onClick={() => {
              setOpenPanel(true);
              setOpen(false);
            }}
          />
          <PopoverMenuItem
            Icon={Settings}
            content="Add intervention"
            onClick={() => {
              setOpenIntervention(true);
              setOpen(false);
            }}
          />
          <PopoverMenuItem
            variant="destructive"
            Icon={Trash}
            content="Delete"
            onClick={() => {
              deleteIntervention();
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
