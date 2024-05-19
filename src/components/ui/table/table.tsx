import { cn } from "@/utils/cn";
import { Checkbox as CheckboxPrimitive } from "@/components/ui/checkbox/";
import { CheckedState } from "@radix-ui/react-checkbox";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface TableProps {
  children: React.ReactNode;
  className?: string;
  tableClassName?: string;
  style?: React.CSSProperties;
  tableStyle?: React.CSSProperties;
}
export const Root = ({
  children,
  className = "",
  tableClassName = "",
  style,
  tableStyle,
}: TableProps) => {
  return (
    <div
      style={style}
      className={cn(
        "relative block overflow-auto rounded-md border",
        className,
      )}
    >
      <table style={tableStyle} className={cn("w-full", tableClassName)}>
        {children}
      </table>
    </div>
  );
};

export const Head = ({ children, style, className = "" }: Props) => {
  return (
    <thead style={style} className={cn("h-12", className)}>
      {children}
    </thead>
  );
};

export const Body = ({ children, style, className = "" }: Props) => {
  return (
    <tbody style={style} className={cn("bg-white", className)}>
      {children}
    </tbody>
  );
};

export const Row = ({ children, style, className = "" }: Props) => {
  return (
    <tr
      style={style}
      className={cn(
        " bg-gray-50 text-left text-sm font-medium tracking-wide text-gray-600",
        className,
      )}
    >
      {children}
    </tr>
  );
};

export const BodyRow = ({ children, style, className = "" }: Props) => {
  return (
    <tr
      style={style}
      className={cn(
        "border-b text-gray-700 first:border-t last:border-b-0",
        className,
      )}
    >
      {children}
    </tr>
  );
};

export const HeadCell = ({
  children,
  className = "",
  colSpan,
  style,
  onClick,
}: Props & { colSpan: number; onClick: (...args: any) => any }) => {
  return (
    <td
      onClick={onClick}
      colSpan={colSpan}
      style={style}
      className={cn(
        "overflow-hidden truncate border-x px-4 py-2 first:border-l-0 last:border-r-0",
        className,
      )}
    >
      {children}
    </td>
  );
};

export const Cell = ({ children, className = "" }: Props) => {
  return (
    <td
      className={cn(
        "h-16 truncate whitespace-nowrap border-x px-4 py-2 text-sm first:border-l-0 last:border-r-0",
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
