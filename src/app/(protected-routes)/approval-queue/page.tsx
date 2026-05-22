"use client";
import { Button } from "@/components/ui/button";
import ApprovalQueueHeader from "@/modules/protected-routes/approval-queue/components/approval-queue-header";
import ApprovalQueueRoot from "@/modules/protected-routes/approval-queue/components/approval-queue-root";
import ApprovalQueueItemsList from "@/modules/protected-routes/approval-queue/components/approval-queue-items-list";
import { ApprovalQueueItemsFilter } from "@/modules/protected-routes/approval-queue/components/approval-queue-items-list/components/approval-queue-items-filter";
import { ActiveAgentsStrip } from "@/modules/protected-routes/approval-queue/components/active-agents-strip";
import {
  ApprovalQueueProvider,
  useApprovalQueueContext,
} from "@/providers/approval-queue";
import { RefreshCw } from "lucide-react";

const ApprovalQueuePageContent = () => {
  const { refetch, isRefetching } = useApprovalQueueContext();
  return (
    <ApprovalQueueRoot>
      <ApprovalQueueHeader
        title="Approval Queue"
        description="Review and approve AI Agent actions, such as sending responses, processing refunds, or changing subscriptions."
        hasRightSection={true}
        rightSection={
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={refetch}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        }
      />

      <ActiveAgentsStrip />

      <div className="flex flex-col gap-4">
        <ApprovalQueueItemsFilter />
        <ApprovalQueueItemsList />
      </div>
    </ApprovalQueueRoot>
  );
};

const ApprovalQueuePage = () => {
  return (
    <ApprovalQueueProvider>
      <ApprovalQueuePageContent />
    </ApprovalQueueProvider>
  );
};

export default ApprovalQueuePage;
