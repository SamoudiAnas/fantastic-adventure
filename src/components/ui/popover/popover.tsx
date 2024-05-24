"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/utils/cn";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-56 rounded-md border bg-white p-2 text-zinc-900 shadow-md outline-none",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[state=open]:animate-in  data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

interface PopoverMenuItemProps {
  variant?: "default" | "destructive";
  Icon: React.ElementType;
  content: string;
  onClick: (...args: any) => any;
}

const PopoverMenuItem = ({
  Icon,
  content,
  onClick,
  variant = "default",
}: PopoverMenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center space-x-2 rounded-md px-3 py-1.5 text-left text-zinc-900 hover:bg-indigo-100",
        variant === "destructive" && "text-red-500 hover:bg-red-100",
      )}
    >
      <Icon className="size-5 flex-shrink-0" />
      <span>{content}</span>
    </button>
  );
};

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverMenuItem,
};
