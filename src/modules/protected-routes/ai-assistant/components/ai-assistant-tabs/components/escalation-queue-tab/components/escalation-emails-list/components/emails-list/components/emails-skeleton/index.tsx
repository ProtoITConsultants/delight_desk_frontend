import { Skeleton } from "@/components/ui/skeleton";

const EscalationEmailsSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-3 border-b border-border/60 px-3 py-3 last:border-b-0"
        >
          <Skeleton className="h-4 w-4 rounded-sm" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-3.5 w-3/5" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="h-3 w-1/2" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-4 w-14 rounded-full" />
              <Skeleton className="h-4 w-16 rounded-full" />
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EscalationEmailsSkeleton;
