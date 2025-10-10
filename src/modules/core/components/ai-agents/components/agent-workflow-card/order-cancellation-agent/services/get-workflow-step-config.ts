import { WORKFLOW_STATUS_TYPE } from "../types";

const getWorkflowStepConfig = ({
  fulfillmentMethod,
  worflowStatus,
  workflowCancelled,
}: {
  fulfillmentMethod: string;
  worflowStatus: WORKFLOW_STATUS_TYPE;
  workflowCancelled: boolean;
}) => {
  if (fulfillmentMethod === "warehouse_email") {
    // For completed workflows, show dynamic history based on actual outcome
    if (
      worflowStatus &&
      (worflowStatus === "completed" || worflowStatus === "canceled")
    ) {
      const wasSuccessful = workflowCancelled;

      return {
        identify_order: {
          label: "Order Identified",
          order: 1,
          description: "AI extracted order details from customer email",
        },
        check_eligibility: {
          label: "Eligibility Verified",
          order: 2,
          description: "Order was eligible for cancellation",
        },
        acknowledge_customer: {
          label: "Customer Acknowledged",
          order: 3,
          description: "Confirmation email sent to customer",
        },
        email_warehouse: {
          label: "Warehouse Contacted",
          order: 4,
          description: "Cancellation request sent to warehouse team",
        },
        await_warehouse: {
          label: wasSuccessful ? "Request Accepted" : "Request Declined",
          order: 5,
          description: wasSuccessful
            ? "Warehouse accepted cancellation request"
            : "Warehouse declined cancellation request",
        },
        warehouse_received: {
          label: wasSuccessful ? "Cancellation Confirmed" : "Decline Confirmed",
          order: 6,
          description: wasSuccessful
            ? "Warehouse confirmed order cancellation"
            : "Warehouse confirmed order cannot be cancelled",
        },
        process_result: {
          label: wasSuccessful ? "Refund Processed" : "Customer Notified",
          order: 7,
          description: wasSuccessful
            ? "Cancellation completed and refund processed"
            : "Customer notified that order cannot be cancelled",
        },
      };
    } else {
      // For active workflows, show generic future-tense steps
      return {
        identify_order: {
          label: "Identify Order",
          order: 1,
          description: "AI analyzes email to extract order details",
        },
        check_eligibility: {
          label: "Check Eligibility",
          order: 2,
          description: "Verify order can be cancelled based on timing",
        },
        acknowledge_customer: {
          label: "Acknowledge Customer",
          order: 3,
          description: "Send confirmation email to customer",
        },
        email_warehouse: {
          label: "Email Warehouse",
          order: 4,
          description: "Send cancellation request to warehouse team",
        },
        await_warehouse: {
          label: "Awaiting Warehouse Response",
          order: 5,
          description: "Will accept or reject cancellation request",
        },
        warehouse_received: {
          label: "Warehouse Received",
          order: 6,
          description: "Warehouse team has acknowledged the request",
        },
        process_result: {
          label: "Process Result",
          order: 7,
          description: "Finalize cancellation and process refund",
        },
      };
    }
  } else {
    // For automated methods (ShipBob, self-fulfillment, ShipStation)
    return {
      identify_order: {
        label: "Identify Order",
        order: 1,
        description: "AI analyzes email to extract order details",
      },
      check_eligibility: {
        label: "Check Eligibility",
        order: 2,
        description: "Verify order can be cancelled based on timing",
      },
      acknowledge_customer: {
        label: "Acknowledge Customer",
        order: 3,
        description: "Send confirmation email to customer",
      },
      process_cancellation: {
        label: "Process Cancellation",
        order: 4,
        description: "Automatically cancel order via API",
      },
      process_result: {
        label: "Process Result",
        order: 5,
        description: "Process refund and finalize",
      },
      completed: {
        label: "Complete",
        order: 6,
        description: "Workflow completed successfully",
      },
    };
  }
};

export default getWorkflowStepConfig;
