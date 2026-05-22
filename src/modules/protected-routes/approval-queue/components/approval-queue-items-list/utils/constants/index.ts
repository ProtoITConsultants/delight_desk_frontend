import {
  APPROVAL_QUEUE_PENDING_APPROVAL_FILTER,
  ApprovalQueueAgentCategory,
  ApprovalQueueItemStatus,
  ApprovalQueueStatusFilter,
} from "../../../../utils/constants";

export const APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS: ReadonlyArray<{
  label: string;
  value: ApprovalQueueStatusFilter;
}> = [
  {
    label: "Pending Approval",
    value: APPROVAL_QUEUE_PENDING_APPROVAL_FILTER,
  },
  {
    label: "In Progress",
    value: ApprovalQueueItemStatus.IN_PROGRESS,
  },
  {
    label: "Cancelled",
    value: ApprovalQueueItemStatus.CANCELLED,
  },
  {
    label: "Completed",
    value: ApprovalQueueItemStatus.COMPLETED,
  },
  {
    label: "Escalated",
    value: ApprovalQueueItemStatus.ESCALATED,
  },
];

export const APPROVAL_QUEUE_AGENT_FILTER_OPTIONS = [
  {
    label: "All Items",
    value: ApprovalQueueAgentCategory.ALL,
  },
  {
    label: "Wismo Agent",
    value: ApprovalQueueAgentCategory.WISMO,
  },
  {
    label: "Subscription Agent",
    value: ApprovalQueueAgentCategory.SUBSCRIPTION,
  },
  {
    label: "Product Agent",
    value: ApprovalQueueAgentCategory.PRODUCT,
  },
  {
    label: "Returns Agent",
    value: ApprovalQueueAgentCategory.RETURNS,
  },
  {
    label: "Promo Code Agent",
    value: ApprovalQueueAgentCategory.PROMO_CODE,
  },
  {
    label: "Address Change Agent",
    value: ApprovalQueueAgentCategory.ADDRESS_CHANGE,
  },
  {
    label: "Order Cancellation Agent",
    value: ApprovalQueueAgentCategory.ORDER_CANCELLATION,
  },
];
