import { cn } from "@/utils/cn";

interface EmptyDataProps {
  className?: string;
}

export const EmptyData = ({ className = "" }: EmptyDataProps) => {
  return (
    <div className={cn("mt-8", className)}>
      <h1>No data available at the moment. Please try again later!</h1>
    </div>
  );
};
