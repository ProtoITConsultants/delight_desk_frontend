import { ApprovalQueueAgentCategory } from "../../../../utils/constants";

export const APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "In Progress",
    value: "in_progress",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Escalated",
    value: "escalated",
  },
] as const;

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
