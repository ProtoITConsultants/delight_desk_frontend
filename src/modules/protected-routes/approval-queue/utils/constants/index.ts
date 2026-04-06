export enum ApprovalQueueItemCategory {
  PENDING = "pending",
  COMPLETED = "completed",
}

export enum ApprovalQueueItemStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  CANCELLED = "cancelled",
  ESCALATED = "escalated",
  COMPLETED = "completed",
}

export enum ApprovalQueueAgentCategory {
  ALL = "all",
  WISMO = "wismo",
  SUBSCRIPTION = "subscription",
  PRODUCT = "product",
  RETURNS = "returns",
  PROMO_CODE = "promo_code",
  ADDRESS_CHANGE = "address_change",
  ORDER_CANCELLATION = "order_cancellation",
}

export enum ApprovalQueuePriority {
  ALL = "all",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum ApprovalQueueWorkflowActionStatus {
  PENDING_APPROVAL = "pending_approval",
  APPROVED = "approved",
  EXECUTING = "executing",
  EXECUTED = "executed",
  FAILED = "failed",
  ESCALATED = "escalated",
  REJECTED = "rejected",
}