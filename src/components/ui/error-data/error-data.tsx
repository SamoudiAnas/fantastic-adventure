import { cn } from "@/utils/cn";

interface ErrorDataProps {
  className?: string;
}

export const ErrorData = ({ className = "" }: ErrorDataProps) => {
  return (
    <div className={cn("mt-8", className)}>
      <h1>An error occurred while fetching data. Please try again later!</h1>
    </div>
  );
};
