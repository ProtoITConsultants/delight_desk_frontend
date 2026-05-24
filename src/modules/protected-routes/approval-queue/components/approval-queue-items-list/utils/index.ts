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
import { SUBSCRIPTION_AGENT_ICON } from "@/constants/product-icons";
import {
  AlertTriangle,
  BellRing,
  Brain,
  CheckCircle2,
  Clock,
  Hourglass,
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

/* ------------------------------------------------------------------------- *
 *  Canonical status color palette
 *
 *  Every place in the approval-queue UI that needs to color a status —
 *  the stats tiles, the status filter dots and pills, the card status
 *  badges, the card accent bar, the workflow-action stepper, the action
 *  status labels — derives its color from the single map below. That way
 *  "Cancelled" looks the same hue family whether it appears in a stats
 *  tile, a filter chip, a card pill, or a stepper step.
 *
 *  The palette uses Tailwind's 100/600/700 rung as the working range, with
 *  two deliberate per-family tweaks:
 *    - `amber.softPill` uses text-amber-800 (vs 700) for AAA contrast on
 *      its very light amber-50 background.
 *    - `orange.accentBar` uses 500 (vs 400) so the "Awaiting Approval"
 *      hero accent stays louder than the calm accent on other statuses.
 *
 *  The `mantine` field maps each family to the closest Mantine palette
 *  name so the Mantine `<Stepper />` component renders in the same hue
 *  family the rest of the page is using.
 * ------------------------------------------------------------------------- */

export type StatusColorFamily =
  | "slate"
  | "sky"
  | "amber"
  | "rose"
  | "emerald"
  | "orange";

export type StatusColorVariants = {
  /** Closest Mantine palette name (used by @mantine/core's `<Stepper />`). */
  mantine: "gray" | "blue" | "yellow" | "red" | "green" | "orange";
  /** Saturated dot for status filter dropdown entries. */
  dot: string;
  /** Outlined-soft pill background+text+border, used on card status badges. */
  softPill: string;
  /** Thin accent bar painted across the top of a card (or anywhere else
   *  we want a one-line color signal). */
  accentBar: string;
  /** Tinted icon container background, used in stats tiles. */
  iconBg: string;
  /** Icon foreground color inside the tinted container. */
  iconColor: string;
  /** Numeric value text color in stats tiles. */
  valueColor: string;
  /** Standalone label text color used by the action-status labels in the
   *  card stepper. */
  labelText: string;
};

export const STATUS_COLOR_PALETTE: Record<
  StatusColorFamily,
  StatusColorVariants
> = {
  slate: {
    mantine: "gray",
    dot: "bg-slate-400",
    softPill: "bg-slate-50 text-slate-700 border-slate-200",
    accentBar: "bg-slate-400",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    valueColor: "text-slate-700",
    labelText: "text-slate-700",
  },
  sky: {
    mantine: "blue",
    dot: "bg-sky-500",
    softPill: "bg-sky-50 text-sky-700 border-sky-200",
    accentBar: "bg-sky-400",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    valueColor: "text-sky-700",
    labelText: "text-sky-700",
  },
  amber: {
    mantine: "yellow",
    dot: "bg-amber-500",
    softPill: "bg-amber-50 text-amber-800 border-amber-200",
    accentBar: "bg-amber-400",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    valueColor: "text-amber-700",
    labelText: "text-amber-700",
  },
  rose: {
    mantine: "red",
    dot: "bg-rose-500",
    softPill: "bg-rose-50 text-rose-700 border-rose-200",
    accentBar: "bg-rose-400",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    valueColor: "text-rose-700",
    labelText: "text-rose-700",
  },
  emerald: {
    mantine: "green",
    dot: "bg-emerald-500",
    softPill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentBar: "bg-emerald-400",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    valueColor: "text-emerald-700",
    labelText: "text-emerald-700",
  },
  orange: {
    mantine: "orange",
    dot: "bg-orange-500",
    softPill: "bg-orange-50 text-orange-700 border-orange-200",
    // 500 rather than 400 — the orange accent is the page's one loud color.
    accentBar: "bg-orange-500",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    valueColor: "text-orange-700",
    labelText: "text-orange-700",
  },
};

/**
 * Maps each workflow-level status (plus the action-derived "pending_approval"
 * filter value) to its canonical color family. Adding or renaming a status
 * starts here — every downstream consumer reads through this map.
 */
export const WORKFLOW_STATUS_COLOR_FAMILY: Record<
  ApprovalQueueStatusFilter,
  StatusColorFamily
> = {
  [ApprovalQueueItemStatus.IN_PROGRESS]: "sky",
  [ApprovalQueueItemStatus.ESCALATED]: "amber",
  [ApprovalQueueItemStatus.CANCELLED]: "rose",
  [ApprovalQueueItemStatus.COMPLETED]: "emerald",
  [APPROVAL_QUEUE_PENDING_APPROVAL_FILTER]: "orange",
};

/**
 * Maps each workflow-action status to a color family. The action statuses
 * cover finer-grained lifecycle steps but they slot into the same six
 * families so the stepper inside a card looks like a zoomed-in version of
 * the stats tiles above:
 *
 *  - Approved / Executing / Awaiting customer reply → sky (in flight,
 *    same family as In Progress)
 *  - Executed → emerald (success, same family as Completed)
 *  - Pending Approval → orange (matches the Awaiting Approval tile / hero)
 *  - Escalated → amber (matches Escalated)
 *  - Cancelled / Failed / Rejected → rose (terminated, same family as
 *    Cancelled)
 */
export const ACTION_STATUS_COLOR_FAMILY: Record<
  ApprovalQueueWorkflowActionStatus,
  StatusColorFamily
> = {
  [ApprovalQueueWorkflowActionStatus.PENDING_APPROVAL]: "orange",
  [ApprovalQueueWorkflowActionStatus.APPROVED]: "sky",
  [ApprovalQueueWorkflowActionStatus.EXECUTING]: "sky",
  [ApprovalQueueWorkflowActionStatus.EXECUTED]: "emerald",
  [ApprovalQueueWorkflowActionStatus.FAILED]: "rose",
  [ApprovalQueueWorkflowActionStatus.ESCALATED]: "amber",
  [ApprovalQueueWorkflowActionStatus.REJECTED]: "rose",
  [ApprovalQueueWorkflowActionStatus.AWAITING_CUSTOMER_REPLY]: "sky",
  [ApprovalQueueWorkflowActionStatus.CANCELLED]: "rose",
};

// Each status has a unique icon; the color family is shared but the glyph
// is one-to-one.
const WORKFLOW_STATUS_ICONS: Record<ApprovalQueueStatusFilter, LucideIcon> = {
  [ApprovalQueueItemStatus.IN_PROGRESS]: Clock,
  [ApprovalQueueItemStatus.ESCALATED]: AlertTriangle,
  [ApprovalQueueItemStatus.CANCELLED]: XCircle,
  [ApprovalQueueItemStatus.COMPLETED]: CheckCircle2,
  [APPROVAL_QUEUE_PENDING_APPROVAL_FILTER]: BellRing,
};

/**
 * Status pill / dot / accent-bar visuals used by the status filter dropdown
 * and the card status badge. Derived entirely from `STATUS_COLOR_PALETTE`
 * + `WORKFLOW_STATUS_COLOR_FAMILY` so the dropdown dot, the card pill, and
 * the stats tile that filters for the same status always share the same
 * hue family.
 */
const buildWorkflowStatusStyles = (
  family: StatusColorFamily,
  icon: LucideIcon,
) => ({
  dot: STATUS_COLOR_PALETTE[family].dot,
  softPill: STATUS_COLOR_PALETTE[family].softPill,
  accentBar: STATUS_COLOR_PALETTE[family].accentBar,
  icon,
});

export const APPROVAL_QUEUE_STATUS_STYLES: Record<
  ApprovalQueueStatusFilter,
  {
    dot: string;
    softPill: string;
    accentBar: string;
    icon: LucideIcon;
  }
> = {
  [ApprovalQueueItemStatus.IN_PROGRESS]: buildWorkflowStatusStyles(
    WORKFLOW_STATUS_COLOR_FAMILY[ApprovalQueueItemStatus.IN_PROGRESS],
    WORKFLOW_STATUS_ICONS[ApprovalQueueItemStatus.IN_PROGRESS],
  ),
  [ApprovalQueueItemStatus.CANCELLED]: buildWorkflowStatusStyles(
    WORKFLOW_STATUS_COLOR_FAMILY[ApprovalQueueItemStatus.CANCELLED],
    WORKFLOW_STATUS_ICONS[ApprovalQueueItemStatus.CANCELLED],
  ),
  [ApprovalQueueItemStatus.COMPLETED]: buildWorkflowStatusStyles(
    WORKFLOW_STATUS_COLOR_FAMILY[ApprovalQueueItemStatus.COMPLETED],
    WORKFLOW_STATUS_ICONS[ApprovalQueueItemStatus.COMPLETED],
  ),
  [ApprovalQueueItemStatus.ESCALATED]: buildWorkflowStatusStyles(
    WORKFLOW_STATUS_COLOR_FAMILY[ApprovalQueueItemStatus.ESCALATED],
    WORKFLOW_STATUS_ICONS[ApprovalQueueItemStatus.ESCALATED],
  ),
  [APPROVAL_QUEUE_PENDING_APPROVAL_FILTER]: buildWorkflowStatusStyles(
    WORKFLOW_STATUS_COLOR_FAMILY[APPROVAL_QUEUE_PENDING_APPROVAL_FILTER],
    WORKFLOW_STATUS_ICONS[APPROVAL_QUEUE_PENDING_APPROVAL_FILTER],
  ),
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
    icon: SUBSCRIPTION_AGENT_ICON,
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
    // Originally `text-yellow-500/10` — typo that painted text instead of
    // the badge background. Fixed to a `bg-` utility matching the sibling
    // alpha-mixed pattern (RETURNS / ORDER_CANCELLATION). The map is now
    // shared with the dashboard activity log, so a drift here would show
    // up in two places at once.
    bgColor: "bg-yellow-500/10",
    textColor: "text-yellow-600",
  },
  [ApprovalQueueAgentCategory.ORDER_CANCELLATION]: {
    agentName: "Order Cancellation Agent",
    icon: Package,
    bgColor: "bg-red-500/10",
    textColor: "text-red-600",
  },
};
