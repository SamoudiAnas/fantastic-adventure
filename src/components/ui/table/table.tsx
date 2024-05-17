import { cn } from "@/utils/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Table = ({ children, className = "" }: Props) => {
  return (
    <div className={cn("rounded-xl border overflow-hidden", className)}>
      <table className={cn("w-full")}>{children}</table>
    </div>
  );
};

export const TableHead = ({ children, className = "" }: Props) => {
  return <thead>{children}</thead>;
};

export const TableBody = ({ children, className = "" }: Props) => {
  return <tbody className={cn("bg-white", className)}>{children}</tbody>;
};

export const TableRow = ({ children, className = "" }: Props) => {
  return (
    <tr
      className={cn(
        "h-10 text-sm font-medium tracking-wide text-left text-gray-600 bg-gray-50",
        className
      )}
    >
      {children}
    </tr>
  );
};

export const TableBodyRow = ({ children, className = "" }: Props) => {
  return (
    <tr
      className={cn(
        "text-gray-700 border-b first:border-t last:border-b-0",
        className
      )}
    >
      {children}
    </tr>
  );
};

export const TableHeadCell = ({ children, className = "" }: Props) => {
  return <td className={cn("py-2 px-4", className)}>{children}</td>;
};

export const TableCell = ({ children, className = "" }: Props) => {
  return (
    <td
      className={cn(
        "py-2 px-4 first:border-l-0 last:border-r-0 border-x text-sm",
        className
      )}
    >
      {children}
    </td>
  );
};
