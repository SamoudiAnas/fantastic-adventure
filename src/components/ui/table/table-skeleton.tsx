import { cn } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      role="status"
      className={cn(
        "h-8 w-full animate-pulse rounded-md bg-gray-300",
        className,
      )}
    />
  );
};
