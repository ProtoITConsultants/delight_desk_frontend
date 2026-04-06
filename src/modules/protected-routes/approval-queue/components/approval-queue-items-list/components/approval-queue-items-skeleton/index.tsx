import { Skeleton } from "@/components/ui/skeleton";

export const ApprovalQueueItemsSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-30 w-full rounded-lg" />
      ))}
    </div>
  );
};
