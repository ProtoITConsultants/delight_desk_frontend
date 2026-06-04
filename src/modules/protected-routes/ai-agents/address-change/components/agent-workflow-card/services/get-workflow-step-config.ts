import { WORKFLOW_STATUS_TYPE } from "../../../utils/types";

const getWorkflowStepConfig = ({
  fulfillmentMethod,
  workflowStatus,
  isEligible,
  wasUpdated,
}: {
  fulfillmentMethod: string;
  workflowStatus: WORKFLOW_STATUS_TYPE;
  isEligible: boolean;
  wasUpdated: boolean;
}) => {
  if (fulfillmentMethod === "warehouse_email") {
    if (workflowStatus === "completed" || workflowStatus === "cannot_change") {
      // Show completed workflow with past-tense descriptions
      return {
        identify_order: {
          label: "Extract Order",
          order: 1,
          description: "AI analyzed email and extracted order details",
        },
        check_eligibility: {
          label: "Check Eligibility",
          order: 2,
          description: isEligible
            ? "Order was eligible for address change"
            : "Order was not eligible for address change",
        },
        acknowledge_customer: {
          label: "Notify Customer",
          order: 3,
          description: "Customer was notified about address change request",
        },
        email_warehouse: {
          label: "Email Warehouse",
          order: 4,
          description: isEligible
            ? "Warehouse team was notified of address change"
            : "No warehouse email sent - not eligible",
        },
        await_warehouse: {
          label: "Await Response",
          order: 5,
          description: isEligible
            ? wasUpdated
              ? "Warehouse confirmed address update"
              : "Warehouse unable to update address"
            : "Skipped - not eligible",
        },
        process_result: {
          label: "Process Result",
          order: 6,
          description: wasUpdated
            ? "Address successfully updated"
            : "Address could not be updated",
        },
      };
    } else {
      // Active workflow with future-tense descriptions
      return {
        identify_order: {
          label: "Extract Order",
          order: 1,
          description: "AI analyzes email to extract order details",
        },
        check_eligibility: {
          label: "Check Eligibility",
          order: 2,
          description: "Verify order can have address changed based on timing",
        },
        acknowledge_customer: {
          label: "Notify Customer",
          order: 3,
          description: "Send confirmation email to customer",
        },
        email_warehouse: {
          label: "Email Warehouse",
          order: 4,
          description: "Send address change request to warehouse team",
        },
        await_warehouse: {
          label: "Await Response",
          order: 5,
          description: "Wait for warehouse confirmation of address update",
        },
        process_result: {
          label: "Process Result",
          order: 6,
          description: "Process warehouse response and update customer",
        },
      };
    }
  } else {
    // Automated fulfillment methods (ShipBob, Self-fulfillment)
    if (workflowStatus === "completed" || workflowStatus === "cannot_change") {
      return {
        identify_order: {
          label: "Extract Order",
          order: 1,
          description: "AI analyzed email and extracted order details",
        },
        check_eligibility: {
          label: "Check Eligibility",
          order: 2,
          description: isEligible
            ? "Order was eligible for address change"
            : "Order was not eligible for address change",
        },
        acknowledge_customer: {
          label: "Notify Customer",
          order: 3,
          description: "Customer was notified about address change request",
        },
        update_address: {
          label: "Update Address",
          order: 4,
          description: isEligible
            ? wasUpdated
              ? "Address updated successfully via API"
              : "Address update failed"
            : "Skipped - not eligible",
        },
        complete: {
          label: "Complete",
          order: 5,
          description: wasUpdated
            ? "Address change completed successfully"
            : "Address change could not be completed",
        },
      };
    } else {
      return {
        identify_order: {
          label: "Extract Order",
          order: 1,
          description: "AI analyzes email to extract order details",
        },
        check_eligibility: {
          label: "Check Eligibility",
          order: 2,
          description: "Verify order can have address changed based on timing",
        },
        acknowledge_customer: {
          label: "Notify Customer",
          order: 3,
          description: "Send confirmation email to customer",
        },
        update_address: {
          label: "Update Address",
          order: 4,
          description: "Process address change via automated system",
        },
        complete: {
          label: "Complete",
          order: 5,
          description: "Finalize address change and notify customer",
        },
      };
    }
  }
};

export default getWorkflowStepConfig;
