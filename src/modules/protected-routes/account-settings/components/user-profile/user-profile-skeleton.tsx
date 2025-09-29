import { Skeleton } from "@/components/ui/skeleton";
import InputFieldSkeleton from "@/modules/core/components/skeleton/input-field-skeleton";

const UserProfileSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputFieldSkeleton />
        <InputFieldSkeleton />
      </div>
      <InputFieldSkeleton />
      <InputFieldSkeleton />
      <div className="mt-6 pt-6 border-t space-y-2">
        <Skeleton className="w-20 h-5 rounded-md" />
        <Skeleton className="w-40 h-6 rounded-md" />
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
