export enum ApprovalQueueItemCategory {
  PENDING = "pending",
  COMPLETED = "completed",
}

export enum ApprovalQueueItemStatus {
  IN_PROGRESS = "in_progress",
  CANCELLED = "cancelled",
  ESCALATED = "escalated",
  COMPLETED = "completed",
}

/**
 * Special filter value backed by the `workflowActions[].status` field rather
 * than the workflow-level `status`. The API accepts this as a value for the
 * same `status` query param, returning items that have at least one action in
 * the `pending_approval` state.
 */
export const APPROVAL_QUEUE_PENDING_APPROVAL_FILTER = "pending_approval" as const;

export type ApprovalQueueStatusFilter =
  | ApprovalQueueItemStatus
  | typeof APPROVAL_QUEUE_PENDING_APPROVAL_FILTER;

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
  AWAITING_CUSTOMER_REPLY = "awaiting_customer_reply",
  CANCELLED = "cancelled",
}
