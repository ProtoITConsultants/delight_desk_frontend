import { ApprovalQueueAgentCategory } from "../../../utils/constants";
import { AgentMetadata } from "../../../utils/types";
import { APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS } from "./constants";
import { Brain, CreditCard, MapPin, Package, Tag, Truck } from "lucide-react";

export const ApprovalQueueItemsFilterLabelMap = Object.fromEntries(
  APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS.map((option) => [
    option.value,
    option.label,
  ]),
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
