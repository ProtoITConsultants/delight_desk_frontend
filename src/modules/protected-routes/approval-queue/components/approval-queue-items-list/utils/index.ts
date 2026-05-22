import {
  APPROVAL_QUEUE_PENDING_APPROVAL_FILTER,
  ApprovalQueueAgentCategory,
  ApprovalQueueItemStatus,
  ApprovalQueueStatusFilter,
  ApprovalQueueWorkflowActionStatus,
} from "../../../utils/constants";
import {
  AgentMetadata,
  ApprovalQueueWorkflowAction,
} from "../../../utils/types";
import { APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS } from "./constants";
import {
  AlertTriangle,
  BellRing,
  Brain,
  CheckCircle2,
  Clock,
  CreditCard,
  LucideIcon,
  MapPin,
  Package,
  Tag,
  Truck,
  XCircle,
} from "lucide-react";

export const ApprovalQueueItemsFilterLabelMap = Object.fromEntries(
  APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS.map((option) => [
    option.value,
    option.label,
  ]),
);

/**
 * Single source of truth for the colors associated with each approval-queue
 * item status. The same palette is used for the colored dot inside the status
 * filter dropdown and for the status badge rendered on each queue item card,
 * so the two visual cues always stay in sync.
 */
/**
 * Single source of truth for the colors associated with each approval-queue
 * item status. The palette is intentionally low-saturation so the only loud
 * thing on a page of cards is the orange "Awaiting Approval" treatment.
 *
 * Each entry exposes a few variants used in different contexts:
 *  - `dot` powers the small colored circle in the status filter dropdown.
 *  - `softPill` is the calm, outlined-style pill used on the card header.
 *  - `solidPill` keeps the older filled-style pill for places that need
 *    higher contrast (kept around so any future legacy callers still work).
 *  - `accentBar` is the thin top accent used to call attention to an item
 *    without committing the whole card to a saturated background.
 */
export const APPROVAL_QUEUE_STATUS_STYLES: Record<
  ApprovalQueueStatusFilter,
  {
    dot: string;
    softPill: string;
    solidPill: string;
    accentBar: string;
    icon: LucideIcon;
  }
> = {
  [ApprovalQueueItemStatus.IN_PROGRESS]: {
    dot: "bg-sky-500",
    softPill: "bg-sky-50 text-sky-700 border-sky-200",
    solidPill: "bg-sky-100 text-sky-700",
    accentBar: "bg-sky-400",
    icon: Clock,
  },
  [ApprovalQueueItemStatus.CANCELLED]: {
    dot: "bg-rose-500",
    softPill: "bg-rose-50 text-rose-700 border-rose-200",
    solidPill: "bg-rose-100 text-rose-700",
    accentBar: "bg-rose-400",
    icon: XCircle,
  },
  [ApprovalQueueItemStatus.COMPLETED]: {
    dot: "bg-emerald-500",
    softPill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    solidPill: "bg-emerald-100 text-emerald-700",
    accentBar: "bg-emerald-400",
    icon: CheckCircle2,
  },
  [ApprovalQueueItemStatus.ESCALATED]: {
    dot: "bg-amber-500",
    softPill: "bg-amber-50 text-amber-800 border-amber-200",
    solidPill: "bg-amber-100 text-amber-700",
    accentBar: "bg-amber-400",
    icon: AlertTriangle,
  },
  // Filter-only entry: items aren't returned with this as their workflow
  // `status`, but the API accepts it as a value for the same query param.
  // The styles below are used by the filter dropdown and by the inline
  // "Pending Approval" treatment rendered on items that have a workflow
  // action awaiting human approve/reject. This is the one saturated color
  // we keep deliberately loud because it represents "you need to act now".
  [APPROVAL_QUEUE_PENDING_APPROVAL_FILTER]: {
    dot: "bg-orange-500",
    softPill: "bg-orange-50 text-orange-700 border-orange-200",
    solidPill: "bg-orange-500 text-white",
    accentBar: "bg-orange-500",
    icon: BellRing,
  },
};

/**
 * Returns true when an approval-queue item has at least one workflow action
 * waiting for human approve/reject. Use this for inline indicators on the
 * unfiltered list without applying the `pending_approval` filter.
 */
export const hasPendingApprovalAction = (
  workflowActions: ApprovalQueueWorkflowAction[],
): boolean =>
  workflowActions.some(
    (action) =>
      action.status === ApprovalQueueWorkflowActionStatus.PENDING_APPROVAL,
  );

export const AGENT_METADATA_MAP: Record<
  Exclude<ApprovalQueueAgentCategory, ApprovalQueueAgentCategory.ALL>,
  AgentMetadata
> = {
  [ApprovalQueueAgentCategory.WISMO]: {
    agentName: "Wismo Agent",
    icon: Truck,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  [ApprovalQueueAgentCategory.SUBSCRIPTION]: {
    agentName: "Subscription Agent",
    icon: CreditCard,
    bgColor: "bg-green-100",
    textColor: "text-green-600",
  },
  [ApprovalQueueAgentCategory.PRODUCT]: {
    agentName: "Product Agent",
    icon: Brain,
    bgColor: "bg-primary/10",
    textColor: "text-primary",
  },
  [ApprovalQueueAgentCategory.RETURNS]: {
    agentName: "Returns Agent",
    icon: Package,
    bgColor: "bg-orange-600/10",
    textColor: "text-orange-600",
  },
  [ApprovalQueueAgentCategory.PROMO_CODE]: {
    agentName: "Promo Code Agent",
    icon: Tag,
    bgColor: "bg-pink-100",
    textColor: "text-pink-600",
  },
  [ApprovalQueueAgentCategory.ADDRESS_CHANGE]: {
    agentName: "Address Change Agent",
    icon: MapPin,
    bgColor: "text-yellow-500/10",
    textColor: "text-yellow-600",
  },
  [ApprovalQueueAgentCategory.ORDER_CANCELLATION]: {
    agentName: "Order Cancellation Agent",
    icon: Package,
    bgColor: "bg-red-500/10",
    textColor: "text-red-600",
  },
};
