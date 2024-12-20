import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  `
  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm shadow-md font-medium 
  ring-offset-2 transition-colors 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 
  disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: "bg-indigo-600 text-white hover:bg-indigo-600/90",
        destructive: "bg-red-600 text-white hover:bg-red-600/90",
        ghost: "bg-transparent text-gray-500 hover:bg-gray-100",
        "dashed-ghost":
          "bg-gray-50 border border-dashed border-gray-400 text-gray-500 hover:bg-gray-100",
        "outlined-ghost":
          "border border-gray-300 text-gray-500 shadow-none hover:bg-gray-100",
        outline:
          "border border-indigo-600 bg-transparent  hover:bg-indigo-600 hover:text-white",
        link: "text-blue-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
