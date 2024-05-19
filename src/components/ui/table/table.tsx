import { cn } from "@/utils/cn";
import { Checkbox as CheckboxPrimitive } from "@/components/ui/checkbox/";
import { CheckedState } from "@radix-ui/react-checkbox";

interface Props {
  children: React.ReactNode;
  className?: string;
}

interface TableProps {
  children: React.ReactNode;
  className?: string;
  tableClassName?: string;
}
export const Root = ({
  children,
  className = "",
  tableClassName = "",
}: TableProps) => {
  return (
    <div
      className={cn(
        "relative block overflow-auto rounded-xl border",
        className,
      )}
    >
      <table className={cn("w-full", tableClassName)}>{children}</table>
    </div>
  );
};

export const Head = ({ children, className = "" }: Props) => {
  return <thead className={cn(className)}>{children}</thead>;
};

export const Body = ({ children, className = "" }: Props) => {
  return <tbody className={cn("bg-white", className)}>{children}</tbody>;
};

export const Row = ({ children, className = "" }: Props) => {
  return (
    <tr
      className={cn(
        "h-10 bg-gray-50 text-left text-sm font-medium tracking-wide text-gray-600",
        className,
      )}
    >
      {children}
    </tr>
  );
};

export const BodyRow = ({ children, className = "" }: Props) => {
  return (
    <tr
      className={cn(
        "border-b text-gray-700 first:border-t last:border-b-0",
        className,
      )}
    >
      {children}
    </tr>
  );
};

export const HeadCell = ({ children, className = "" }: Props) => {
  return <td className={cn("px-4 py-2", className)}>{children}</td>;
};

export const Cell = ({ children, className = "" }: Props) => {
  return (
    <td
      className={cn(
        "border-x px-4 py-2 text-sm first:border-l-0 last:border-r-0",
        className,
      )}
    >
      {children}
    </td>
  );
};

interface CheckboxProps {
  checked: CheckedState | undefined;
  onCheckedChange?(checked: CheckedState): void;
  checkboxClassName?: string;
  className?: string;
}

export const Checkbox = ({
  checked,
  checkboxClassName = "",
  onCheckedChange,
  className = "",
}: CheckboxProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <CheckboxPrimitive
        checked={checked}
        className={checkboxClassName}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};
