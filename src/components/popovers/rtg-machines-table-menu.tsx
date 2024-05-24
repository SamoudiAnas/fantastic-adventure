import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverMenuItem,
  PopoverTrigger,
} from "@/components/ui/popover";
import { buttonVariants } from "@/components/ui/button";
import { doc, deleteDoc } from "firebase/firestore";
import {
  Edit,
  Ellipsis,
  History,
  PanelLeftOpen,
  Settings,
  Trash,
} from "lucide-react";
import { firestore } from "@/lib/firebase";
import { collections } from "@/constants/collections";
import { toast } from "@/hooks/use-toast";
import { RTGMachine } from "@/types";
import { EditRTGMachine } from "../sheets/rtg-machine/edit-rtg-machine";
import { useRouter } from "next/router";
import { AddIntervention } from "../sheets/intervention";
import { HistoryIntervention } from "../sheets/intervention/history-intervention";

interface RTGMachineTableMenuProps {
  original: RTGMachine;
}

export const RTGMachineTableMenu = ({ original }: RTGMachineTableMenuProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);
  const [openIntervention, setOpenIntervention] = useState(false);
  const [openInterventionsHistory, setOpenInterventionsHistory] =
    useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteRTGMachine = async () => {
    try {
      toast({
        itemID: `delete-rtg-machine-${original.id}`,
        title: "Loading...",
        description: "Deleting the rtg-machine",
      });
      await deleteDoc(doc(firestore, collections.rtgMachines, original.id));
      refreshData();
      toast({
        itemID: `delete-rtg-machine-${original.id}`,
        title: "Success",
        description: "The rtg-machine has been deleted",
        variant: "success",
      });
    } catch (err) {
      console.error(err);
      toast({
        itemID: `delete-rtg-machine-${original.id}`,
        title: "Erreur",
        description: "An error occurred while deleting the rtg-machine",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <EditRTGMachine
        rtgMachine={original}
        open={openPanel}
        setIsOpen={setOpenPanel}
      />
      <AddIntervention
        rtgMachineId={original.id}
        open={openIntervention}
        setIsOpen={setOpenIntervention}
      />
      <HistoryIntervention
        organId={original.id}
        open={openInterventionsHistory}
        setIsOpen={setOpenInterventionsHistory}
      />
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
            Icon={History}
            content="View history"
            onClick={() => {
              setOpenInterventionsHistory(true);
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
              deleteRTGMachine();
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
