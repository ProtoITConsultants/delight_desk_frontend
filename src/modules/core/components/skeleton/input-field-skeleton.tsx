import { Skeleton } from "@/components/ui/skeleton";

const InputFieldSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-20 h-5 rounded-md" />
      <Skeleton className="w-full h-10 rounded-lg" />
    </div>
  );
};

export default InputFieldSkeleton;
