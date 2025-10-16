import { cn } from "@/lib/utils";

const ApprovalQueueRoot = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("max-w-6xl mx-auto p-6 flex flex-col gap-6", className)}>
      {children}
    </div>
  );
};

export default ApprovalQueueRoot;
