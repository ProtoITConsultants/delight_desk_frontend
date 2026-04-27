import { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";
import type { ApprovalQueueActionProgress } from "@/services/approval-queue/utils/workflow-progress";

type WORKFLOW_STATUS_TYPE =
  | "processing"
  | "awaiting_warehouse"
  | "canceled"
  | "cannot_cancel"
  | "failed"
  | "escalated"
  | "completed";

// Fullfillment Method Steps Types
type BASE_STEPS =
  | "identify_order"
  | "check_eligibility"
  | "acknowledge_customer"
  | "complete";
type WAREHOUSE_EMAIL_STEPS =
  | BASE_STEPS
  | "email_warehouse"
  | "await_warehouse"
  | "process_result";
type SHIPBOB_STEPS = BASE_STEPS | "process_cancellation" | "process_result";
type SELF_FULFILLMENT_STEPS =
  | BASE_STEPS
  | "process_cancellation"
  | "process_result";
type SHIPSTATION_FULLFILLMENT_STEPS =
  | BASE_STEPS
  | "process_cancellation"
  | "process_result";

type AGENT_WORKFLOW_PROPS = (
  | {
      workflowId: string;
      workflowStatus: Exclude<WORKFLOW_STATUS_TYPE, "completed">;
      fulfillmentMethod: FULLFILLMENT_METHODS_TYPES;
      orderNumber: string;
      customerEmail: string;
      createdAt: string;
    }
  | ({
      workflowId: string;
      workflowStatus: "completed";
      fulfillmentMethod: FULLFILLMENT_METHODS_TYPES;
      orderNumber: string;
      customerEmail: string;
      createdAt: string;
    } & (
      | {
          workflowCancelled: true;
          refundProcessed: true;
          refundAmount: number;
        }
      | {
          workflowCancelled: true;
          refundProcessed: false;
        }
      | {
          workflowCancelled: false;
          failingReason: string;
        }
    ))
) & {
  actionProgress?: ApprovalQueueActionProgress | null;
  /** Hide refund / warehouse summary when the API does not return outcome details. */
  hideCompletionOutcome?: boolean;
};

export type {
  AGENT_WORKFLOW_PROPS,
  WORKFLOW_STATUS_TYPE,
  // Workflow Steps
  WAREHOUSE_EMAIL_STEPS,
  SHIPBOB_STEPS,
  SELF_FULFILLMENT_STEPS,
  SHIPSTATION_FULLFILLMENT_STEPS,
};
