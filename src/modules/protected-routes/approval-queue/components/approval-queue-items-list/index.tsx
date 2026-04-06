// import PendingItemsWarningTip from "./components/pending-items-warning";
import { APPROVAL_QUEUE_AGENT_FILTER_OPTIONS } from "./utils/constants";
import { useApprovalQueueContext } from "@/providers/approval-queue";
import { Button } from "@/components/ui/button";
import { ApprovalQueueItemsSkeleton } from "./components/approval-queue-items-skeleton";
import { ApprovalQueueItem } from "./components/approval-queue-item";

const ApprovalQueueItemsList = () => {
  const {
    activeAgentCategory,
    setActiveAgentCategory,
    isLoading,
    approvalQueueItems,
  } = useApprovalQueueContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {APPROVAL_QUEUE_AGENT_FILTER_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={
              activeAgentCategory === option.value ? "default" : "outline"
            }
            size="lg"
            onClick={() => setActiveAgentCategory(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
      {/* <PendingItemsWarningTip /> */}
      {isLoading ? (
        <ApprovalQueueItemsSkeleton />
      ) : approvalQueueItems?.length < 1 ? (
        <span>No items found!</span>
      ) : (
        approvalQueueItems.map((item) => (
          <ApprovalQueueItem key={item.id} {...item} />
        ))
      )}
    </div>
  );
};

export default ApprovalQueueItemsList;
