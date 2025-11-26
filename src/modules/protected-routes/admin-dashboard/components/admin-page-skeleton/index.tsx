import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AdminPageSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-9 w-full max-w-40" />
        <Skeleton className="h-7 w-full max-w-60" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="px-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </Card>
        <Card className="lg:col-span-2 px-6">
          <Skeleton className="h-full w-full" />
        </Card>
      </div>
    </div>
  );
};

export default AdminPageSkeleton;
