"use client";
import { Button } from "@/components/ui/button";
import ApprovalQueueHeader from "@/modules/protected-routes/approval-queue/components/approval-queue-header";
import ApprovalQueueRoot from "@/modules/protected-routes/approval-queue/components/approval-queue-root";
import { RefreshCw } from "lucide-react";

const ApprovalQueuePage = () => {
  return (
    <ApprovalQueueRoot>
      {/* Header */}
      <ApprovalQueueHeader
        title="Approval Queue"
        description="Review and approve AI Agent actions, such as sending responses, processing refunds, or changing subscriptions."
        hasRightSection={true}
        rightSection={
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {}}
          >
            <RefreshCw
              className={`h-4 w-4`}
              //   className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        }
      />
    </ApprovalQueueRoot>
  );
};

export default ApprovalQueuePage;
