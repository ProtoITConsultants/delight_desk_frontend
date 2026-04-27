import type { WorkflowProgressItem } from "@/services/approval-queue/utils/workflow-progress";
import {
  getItemFulfillmentMethod,
  mapItemStatusToCardWorkflowStatus,
} from "@/modules/protected-routes/ai-agents/common/utils/workflow-item-ui-mappers";
import type { ADDRESS_CHANGE_WORKFLOW_CARD_PROPS } from "./types";

export const buildAddressChangeActiveCardProps = (
  item: WorkflowProgressItem,
): ADDRESS_CHANGE_WORKFLOW_CARD_PROPS => {
  const status = mapItemStatusToCardWorkflowStatus(item, "active");
  const fulfillmentMethod = getItemFulfillmentMethod(item);
  return {
    workflowId: item.id,
    workflowStatus: status,
    fulfillmentMethod,
    orderNumber: item.orderNumber ?? "—",
    customerEmail: item.customerEmail,
    createdAt: item.createdAt,
  } as ADDRESS_CHANGE_WORKFLOW_CARD_PROPS;
};

export const buildAddressChangeCompletedCardProps = (
  item: WorkflowProgressItem,
): ADDRESS_CHANGE_WORKFLOW_CARD_PROPS => {
  const fulfillmentMethod = getItemFulfillmentMethod(item);
  return {
    workflowId: item.id,
    workflowStatus: "completed",
    fulfillmentMethod,
    orderNumber: item.orderNumber ?? "—",
    customerEmail: item.customerEmail,
    createdAt: item.createdAt,
    hideCompletionOutcome: true,
    addressChanged: false,
    failingReason: "",
  } as ADDRESS_CHANGE_WORKFLOW_CARD_PROPS;
};
