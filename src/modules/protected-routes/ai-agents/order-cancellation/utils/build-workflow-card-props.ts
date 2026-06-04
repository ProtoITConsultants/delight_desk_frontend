import type { WorkflowProgressItem } from "@/services/approval-queue/utils/workflow-progress";
import {
  getItemFulfillmentMethod,
  mapItemStatusToCardWorkflowStatus,
} from "./map-workflow-item-to-ui";
import type { AGENT_WORKFLOW_PROPS } from "../components/agent-workflow-card/types";

export const buildOrderCancellationActiveCardProps = (
  item: WorkflowProgressItem,
): AGENT_WORKFLOW_PROPS => {
  const status = mapItemStatusToCardWorkflowStatus(item, "active");
  const fulfillmentMethod = getItemFulfillmentMethod(item);
  return {
    workflowId: item.id,
    workflowStatus: status,
    fulfillmentMethod,
    orderNumber: item.orderNumber ?? "—",
    customerEmail: item.customerEmail,
    createdAt: item.createdAt,
    actionProgress: item.actionProgress,
  } as AGENT_WORKFLOW_PROPS;
};

export const buildOrderCancellationCompletedCardProps = (
  item: WorkflowProgressItem,
): AGENT_WORKFLOW_PROPS => {
  const fulfillmentMethod = getItemFulfillmentMethod(item);
  return {
    workflowId: item.id,
    workflowStatus: "completed",
    fulfillmentMethod,
    orderNumber: item.orderNumber ?? "—",
    customerEmail: item.customerEmail,
    createdAt: item.createdAt,
    actionProgress: item.actionProgress,
    hideCompletionOutcome: true,
    workflowCancelled: true,
    refundProcessed: false,
  };
};
