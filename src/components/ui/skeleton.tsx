import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "skeleton-shimmer relative isolate overflow-hidden rounded-xl bg-muted/80",
        "before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-foreground/[0.06] before:to-transparent",
        "after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-primary/25",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
