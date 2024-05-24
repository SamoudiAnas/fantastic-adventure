import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverMenuItem,
  PopoverTrigger,
} from "@/components/ui/popover";
import { buttonVariants } from "@/components/ui/button";
import { doc, deleteDoc } from "firebase/firestore";
import { Ellipsis, PanelLeftOpen, Trash } from "lucide-react";
import { firestore } from "@/lib/firebase";
import { collections } from "@/constants/collections";
import { toast } from "@/hooks/use-toast";
import { Organ } from "@/types";
import { EditOrgan } from "../sheets/organ/edit-organ";
import { useRouter } from "next/router";

interface OrganTableMenuProps {
  original: Organ;
}

export const OrganTableMenu = ({ original }: OrganTableMenuProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);
  useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteOrgan = async () => {
    try {
      toast({
        itemID: `delete-organ-${original.id}`,
        title: "Loading...",
        description: "Deleting the organ",
      });
      await deleteDoc(doc(firestore, collections.organs, original.id));
      refreshData();
      toast({
        itemID: `delete-organ-${original.id}`,
        title: "Success",
        description: "The organ has been deleted",
        variant: "success",
      });
    } catch (err) {
      console.error(err);
      toast({
        itemID: `delete-organ-${original.id}`,
        title: "Erreur",
        description: "An error occurred while deleting the organ",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <EditOrgan organ={original} open={openPanel} setIsOpen={setOpenPanel} />

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
            variant="destructive"
            Icon={Trash}
            content="Delete"
            onClick={() => {
              deleteOrgan();
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
