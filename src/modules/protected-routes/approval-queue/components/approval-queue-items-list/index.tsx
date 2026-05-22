import { useApprovalQueueContext } from "@/providers/approval-queue";
import { ApprovalQueueItemsSkeleton } from "./components/approval-queue-items-skeleton";
import { ApprovalQueueItem } from "./components/approval-queue-item";
import { ApprovalQueuePagination } from "./components/approval-queue-pagination";
import { Inbox } from "lucide-react";

const ApprovalQueueItemsList = () => {
  const { isLoading, approvalQueueItems } = useApprovalQueueContext();

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <ApprovalQueueItemsSkeleton />
      ) : approvalQueueItems?.length < 1 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-card/50 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Inbox className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-base font-medium text-foreground">
            No items match these filters
          </p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Try clearing the status or agent filter, or check back once the
            agents process new customer emails.
          </p>
        </div>
      ) : (
        <>
          {approvalQueueItems.map((item) => (
            <ApprovalQueueItem key={item.id} {...item} />
          ))}
          <ApprovalQueuePagination />
        </>
      )}
    </div>
  );
};

export default ApprovalQueueItemsList;
