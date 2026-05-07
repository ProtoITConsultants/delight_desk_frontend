// import PendingItemsWarningTip from "./components/pending-items-warning";
import { useApprovalQueueContext } from "@/providers/approval-queue";
import { ApprovalQueueItemsSkeleton } from "./components/approval-queue-items-skeleton";
import { ApprovalQueueItem } from "./components/approval-queue-item";
import { ApprovalQueuePagination } from "./components/approval-queue-pagination";

const ApprovalQueueItemsList = () => {
  const { isLoading, approvalQueueItems } = useApprovalQueueContext();

  return (
    <div className="flex flex-col gap-4">
      {/* <PendingItemsWarningTip /> */}
      {isLoading ? (
        <ApprovalQueueItemsSkeleton />
      ) : approvalQueueItems?.length < 1 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-muted-foreground">
            <svg
              className="mx-auto h-12 w-12 mb-4 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-lg font-medium">No items found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your filters to see more results.
            </p>
          </div>
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
