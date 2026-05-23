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
    label: "Awaiting Approval",
    value: APPROVAL_QUEUE_PENDING_APPROVAL_FILTER,
  },
  {
    label: "In Progress",
    value: ApprovalQueueItemStatus.IN_PROGRESS,
  },
  {
    label: "Escalated",
    value: ApprovalQueueItemStatus.ESCALATED,
  },
  {
    label: "Completed",
    value: ApprovalQueueItemStatus.COMPLETED,
  },
  {
    label: "Cancelled",
    value: ApprovalQueueItemStatus.CANCELLED,
  },
];

type ApprovalQueueAgentFilterOption = {
  label: string;
  value: ApprovalQueueAgentCategory;
  /** Marks an agent as not yet implemented on the backend. The UI keeps the
   *  row visible (so users know it's on the roadmap) but disables both
   *  filtering and the enable/moderation switches. */
  isUnavailable?: boolean;
};

export const APPROVAL_QUEUE_AGENT_FILTER_OPTIONS: ReadonlyArray<ApprovalQueueAgentFilterOption> =
  [
    {
      label: "All agents",
      value: ApprovalQueueAgentCategory.ALL,
    },
    {
      label: "Wismo Agent",
      value: ApprovalQueueAgentCategory.WISMO,
    },
    // Subscription Agent and Returns Agent are intentionally omitted: they're
    // not part of the shipping product yet. Their enum values and metadata
    // are kept so any historical queue items returning their `category` still
    // render correctly inside individual cards, and so the `isUnavailable`
    // flag is available if another agent ever needs the "Coming soon"
    // treatment in the filter without re-introducing a row here.
    {
      label: "Product Agent",
      value: ApprovalQueueAgentCategory.PRODUCT,
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
