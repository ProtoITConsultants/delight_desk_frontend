import { ApprovalQueueWorkflowActionStatus } from "@/modules/protected-routes/approval-queue/utils/constants";

export type ActivityLogItemStatus = "completed" | "pending" | "failed";

export type ActivityLogItem = {
  id: string;
  status: ActivityLogItemStatus;
  rawStatus: ApprovalQueueWorkflowActionStatus;
  message: string;
  actionName: string;
  customerEmail: string;
  agentName: string;
  timestamp: string;
};

export type GET_ACTIVITY_LOG_PARAMS = {
  page: number;
  limit: number;
};

export type GET_ACTIVITY_LOG_RESPONSE = {
  data: ActivityLogItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
