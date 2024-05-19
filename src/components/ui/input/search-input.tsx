import * as React from "react";

import { cn } from "@/utils/cn";
import { SearchIcon } from "lucide-react";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, containerClassName, type, ...props }, ref) => {
    return (
      <div className={cn("relative", containerClassName)}>
        <SearchIcon className="absolute left-2 top-1/2 size-5 -translate-y-1/2 transform text-gray-400" />
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-1 pl-8 text-sm shadow-sm transition-colors placeholder:text-gray-500",

            "focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2",
            "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
