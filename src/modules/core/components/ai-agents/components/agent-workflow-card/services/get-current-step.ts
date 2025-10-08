import {
  SELF_FULFILLMENT_STEPS,
  SHIPBOB_STEPS,
  SHIPSTATION_FULLFILLMENT_STEPS,
  WAREHOUSE_EMAIL_STEPS,
  WORKFLOW_STATUS_TYPE,
} from "../types";

const getCurrentWorkflowStep = ({
  fulfillmentMethod,
  workflowStatus,
  customerAcknowledgmentSent,
  warehouseReplyReceived,
  workflowStep,
}: {
  fulfillmentMethod: string;
  workflowStatus: WORKFLOW_STATUS_TYPE;
  customerAcknowledgmentSent?: boolean;
  warehouseReplyReceived?: boolean;
  workflowStep:
    | WAREHOUSE_EMAIL_STEPS
    | SHIPBOB_STEPS
    | SELF_FULFILLMENT_STEPS
    | SHIPSTATION_FULLFILLMENT_STEPS;
}) => {
  if (fulfillmentMethod === "warehouse_email") {
    // 7-step warehouse workflow - map actual backend steps to display steps
    if (workflowStatus === "completed" || workflowStatus === "canceled")
      return 7;
    if (workflowStatus === "failed") return customerAcknowledgmentSent ? 3 : 1;

    // Map backend workflow step to frontend display step
    switch (workflowStep) {
      case "identify_order":
        return 1;
      case "check_eligibility":
        return 2;
      case "acknowledge_customer":
        return 3;
      case "email_warehouse":
        return 4;
      case "await_warehouse":
        // In await_warehouse step, check if warehouse replied to show step 6
        return warehouseReplyReceived ? 6 : 5;
      case "process_result":
        return 7;
      default:
        return 1;
    }
  } else {
    // 6-step automated workflow
    if (workflowStatus === "completed" || workflowStatus === "canceled")
      return 6;
    if (workflowStatus === "failed") return 1;

    // Map backend workflow step to frontend display step
    switch (workflowStep) {
      case "identify_order":
        return 1;
      case "check_eligibility":
        return 2;
      case "acknowledge_customer":
        return 3;
      case "process_cancellation":
        return 4;
      case "process_result":
        return 5;
      case "complete":
        return 6;
      default:
        return 1;
    }
  }
};

export default getCurrentWorkflowStep;
