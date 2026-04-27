import { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";
import type { ApprovalQueueActionProgress } from "@/services/approval-queue/utils/workflow-progress";
import { WORKFLOW_STATUS_TYPE } from "../index";

type WORKFLOW_TIMELINE_PROPS = {
  workflowId: string;
  fulfillmentMethod: FULLFILLMENT_METHODS_TYPES;
  workflowStatus: WORKFLOW_STATUS_TYPE;
  /** When set (order_cancellation from API), renders server-driven timeline. */
  actionProgress?: ApprovalQueueActionProgress | null;
};

export type { WORKFLOW_TIMELINE_PROPS };
