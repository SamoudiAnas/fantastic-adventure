import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverMenuItem,
  PopoverTrigger,
} from "@/components/ui/popover";
import { buttonVariants } from "@/components/ui/button";
import { doc, deleteDoc } from "firebase/firestore";
import { Edit, Ellipsis, PanelLeftOpen, Trash } from "lucide-react";
import { firestore } from "@/lib/firebase";
import { collections } from "@/constants/collections";
import { toast } from "@/hooks/use-toast";

interface PartTableMenuProps {
  id: string;
}

export const PartTableMenu = ({ id }: PartTableMenuProps) => {
  const [open, setOpen] = useState(false);

  const deletePart = async () => {
    try {
      toast({
        itemID: `delete-part-${id}`,
        title: "Loading...",
        description: "Deleting the part",
      });
      await deleteDoc(doc(firestore, collections.parts, id));
      toast({
        itemID: `delete-part-${id}`,
        title: "Success",
        description: "The part has been deleted",
        variant: "success",
      });
    } catch (err) {
      console.error(err);
      toast({
        itemID: `delete-part-${id}`,
        title: "Erreur",
        description: "An error occurred while deleting the part",
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
            className: "px-2 shadow-none",
          })}
        >
          <span className="sr-only">Open Menu</span>
          <Ellipsis className="size-6" />
        </PopoverTrigger>
        <PopoverContent align="end" className="flex flex-col gap-1">
          {/* <PopoverMenuItem
            Icon={PanelLeftOpen}
            content="Open in panel"
            onClick={() => {}}
          /> */}
          <PopoverMenuItem
            variant="destructive"
            Icon={Trash}
            content="Delete"
            onClick={() => {
              deletePart();
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
