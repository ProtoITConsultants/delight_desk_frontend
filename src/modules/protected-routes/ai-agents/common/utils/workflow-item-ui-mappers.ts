import type {
  ApprovalQueueFulfillmentMethod,
  WorkflowProgressItem,
} from "@/services/approval-queue/utils/workflow-progress";
import type { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";

/** Subset of card workflow statuses produced from `WorkflowProgressItem.status`. */
export type WorkflowItemMappedCardStatus =
  | "processing"
  | "awaiting_warehouse"
  | "canceled"
  | "failed"
  | "escalated"
  | "completed";

export const mapApiFulfillmentToUi = (
  method: ApprovalQueueFulfillmentMethod | null | undefined,
): FULLFILLMENT_METHODS_TYPES => {
  switch (method) {
    case "self":
      return "self_fulfillment";
    case "custom_warehouse":
      return "warehouse_email";
    case "shipbob":
      return "shipbob";
    case "shipstation":
      return "shipstation";
    default:
      return "self_fulfillment";
  }
};

/** Uses `actionProgress` when present (e.g. order cancellation); otherwise defaults for list display. */
export const getItemFulfillmentMethod = (
  item: WorkflowProgressItem,
): FULLFILLMENT_METHODS_TYPES =>
  item.actionProgress?.fulfillmentMethod
    ? mapApiFulfillmentToUi(item.actionProgress.fulfillmentMethod)
    : "self_fulfillment";

/**
 * Map server workflow item status to card timeline / badge semantics.
 * Active list mixes pending, in_progress, and escalated.
 */
export const mapItemStatusToCardWorkflowStatus = (
  item: WorkflowProgressItem,
  section: "active" | "completed",
): WorkflowItemMappedCardStatus => {
  if (section === "completed" || item.status === "completed") {
    if (item.status === "cancelled") {
      return "canceled";
    }
    return "completed";
  }
  if (item.status === "escalated") {
    return "escalated";
  }
  if (item.status === "cancelled") {
    return "canceled";
  }
  if (item.status === "pending" || item.status === "in_progress") {
    return "processing";
  }
  return "processing";
};
