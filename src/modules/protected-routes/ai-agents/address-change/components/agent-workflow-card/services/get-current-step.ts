import {
  SELF_FULFILLMENT_STEPS,
  SHIPBOB_STEPS,
  SHIPSTATION_FULLFILLMENT_STEPS,
  WAREHOUSE_EMAIL_STEPS,
  WORKFLOW_STATUS_TYPE,
} from "../../../utils/types";

const getCurrentWorkflowStep = ({
  fulfillmentMethod,
  workflowStatus,
  workflowStep,
}: {
  fulfillmentMethod: string;
  workflowStatus: WORKFLOW_STATUS_TYPE;
  workflowStep:
    | WAREHOUSE_EMAIL_STEPS
    | SHIPBOB_STEPS
    | SELF_FULFILLMENT_STEPS
    | SHIPSTATION_FULLFILLMENT_STEPS;
}) => {
  if (fulfillmentMethod === "warehouse_email") {
    if (workflowStatus === "completed" || workflowStatus === "cannot_change")
      return 6;
    if (workflowStatus === "failed" || workflowStatus === "escalated") return 3;

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
        return 5;
      case "process_result":
        return 6;
      default:
        return 1;
    }
  } else {
    if (workflowStatus === "completed" || workflowStatus === "cannot_change")
      return 5;
    if (workflowStatus === "failed" || workflowStatus === "escalated") return 1;

    switch (workflowStep) {
      case "identify_order":
        return 1;
      case "check_eligibility":
        return 2;
      case "acknowledge_customer":
        return 3;
      case "update_address":
        return 4;
      case "complete":
        return 5;
      default:
        return 1;
    }
  }
};

export default getCurrentWorkflowStep;
