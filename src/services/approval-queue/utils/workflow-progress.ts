export type WorkflowProgressWorkflowStatus =
  | "pending"
  | "in_progress"
  | "cancelled"
  | "escalated"
  | "completed";

export type ApprovalProgressStageStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "blocked"
  | "cancelled";

export type ApprovalQueueFulfillmentMethod =
  | "self"
  | "custom_warehouse"
  | "shipstation"
  | "shipbob"
  | "unknown";

export type ApprovalProgressStage = {
  key: string;
  label: string;
  order: number;
  status: ApprovalProgressStageStatus;
};

export type ApprovalQueueActionProgress = {
  fulfillmentMethod: ApprovalQueueFulfillmentMethod;
  currentStep: ApprovalProgressStage | null;
  timeline: ApprovalProgressStage[];
};

export type WorkflowProgressItem = {
  id: string;
  status: WorkflowProgressWorkflowStatus;
  category: string | null;
  customerEmail: string;
  customerName: string | null;
  orderNumber: string | null;
  createdAt: string;
  actionProgress: ApprovalQueueActionProgress | null;
};

export type GetWorkflowProgressParams = {
  category?: "order_cancellation" | "address_change" | string;
  status?: WorkflowProgressWorkflowStatus;
  page?: number;
  limit?: number;
};

export type GetWorkflowProgressResponse = {
  data: WorkflowProgressItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
