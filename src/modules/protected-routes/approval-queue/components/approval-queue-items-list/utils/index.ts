import {
  ApprovalQueueAgentCategory,
  ApprovalQueueItemStatus,
} from "../../../utils/constants";
import { AgentMetadata } from "../../../utils/types";
import { APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS } from "./constants";
import { Brain, CreditCard, MapPin, Package, Tag, Truck } from "lucide-react";

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
export const APPROVAL_QUEUE_STATUS_STYLES: Record<
  ApprovalQueueItemStatus,
  { dot: string; badge: string }
> = {
  [ApprovalQueueItemStatus.IN_PROGRESS]: {
    dot: "bg-sky-500",
    badge: "border-sky-200 bg-sky-50 text-sky-700",
  },
  [ApprovalQueueItemStatus.CANCELLED]: {
    dot: "bg-rose-500",
    badge: "border-rose-200 bg-rose-50 text-rose-700",
  },
  [ApprovalQueueItemStatus.COMPLETED]: {
    dot: "bg-emerald-500",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  [ApprovalQueueItemStatus.ESCALATED]: {
    dot: "bg-amber-500",
    badge: "border-amber-200 bg-amber-50 text-amber-800",
  },
};

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
