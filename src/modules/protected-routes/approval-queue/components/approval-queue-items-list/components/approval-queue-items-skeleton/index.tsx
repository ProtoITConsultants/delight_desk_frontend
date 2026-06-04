import { Skeleton } from "@/components/ui/skeleton";

export const ApprovalQueueItemsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 rounded-lg border bg-card p-5 shadow-sm"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex items-center justify-end gap-2 pt-2">
            <Skeleton className="h-7 w-24 rounded-md" />
            <Skeleton className="h-7 w-32 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};
