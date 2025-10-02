import { Skeleton } from "@/components/ui/skeleton";

const EscalationEmailsSkeleton = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <Skeleton key={index} className="h-30 w-full rounded-lg" />
      ))}
    </div>
  );
};

export default EscalationEmailsSkeleton;
