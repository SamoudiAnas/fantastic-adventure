import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverMenuItem,
  PopoverTrigger,
} from "@/components/ui/popover";
import { buttonVariants } from "@/components/ui/button";
import { Edit, Ellipsis, PanelLeftOpen, Trash } from "lucide-react";

interface PartTableMenuProps {
  id: string;
}

export const PartTableMenu = ({ id }: PartTableMenuProps) => {
  return (
    <Popover>
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
        <PopoverMenuItem
          Icon={PanelLeftOpen}
          content="Open in panel"
          onClick={() => {}}
        />
        <PopoverMenuItem Icon={Edit} content="Edit" onClick={() => {}} />
        <PopoverMenuItem
          variant="destructive"
          Icon={Trash}
          content="Delete"
          onClick={() => {}}
        />
      </PopoverContent>
    </Popover>
  );
};
