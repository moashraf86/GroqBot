/* eslint-disable react/prop-types */
import { cn } from "@/utils/shadUtils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-primary/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
