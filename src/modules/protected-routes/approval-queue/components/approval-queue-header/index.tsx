import { cn } from "@/lib/utils";
import { APPROVAL_QUEUE_HEADER_PROPS } from "../../utils/types/approval-queue-header";

const ApprovalQueueHeader = ({
  className,
  Icon,
  title,
  description,
  hasRightSection,
  rightSection,
  rightSectionClassName,
}: APPROVAL_QUEUE_HEADER_PROPS) => {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex items-start gap-3">
        {Icon}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900 sm:leading-4 leading-6">
            {title}
          </h1>
          <p className="text-gray-600 leading-normal">{description}</p>
        </div>
      </div>
      {hasRightSection && (
        <div className={cn("flex flex-col gap-2", rightSectionClassName)}>
          {rightSection}
        </div>
      )}
    </div>
  );
};

export default ApprovalQueueHeader;
