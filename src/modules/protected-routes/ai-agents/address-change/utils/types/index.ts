import { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";

type WORKFLOW_STATUS_TYPE =
  | "processing"
  | "awaiting_warehouse"
  | "canceled"
  | "cannot_change"
  | "failed"
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

type SHIPBOB_STEPS = BASE_STEPS | "process_address_change" | "update_address";
type SELF_FULFILLMENT_STEPS =
  | BASE_STEPS
  | "process_address_change"
  | "update_address";
type SHIPSTATION_FULLFILLMENT_STEPS =
  | BASE_STEPS
  | "process_address_change"
  | "update_address";

type ADDRESS_CHANGE_WORKFLOW_CARD_PROPS =
  | {
      workflowId: string;
      workflowStatus: Exclude<WORKFLOW_STATUS_TYPE, "completed">;
      fulfillmentMethod: FULLFILLMENT_METHODS_TYPES;
      orderNumber: string;
      customerEmail: string;
      createdAt: string;
    }
  | (
      | {
          workflowId: string;
          workflowStatus: Extract<WORKFLOW_STATUS_TYPE, "completed">;
          fulfillmentMethod: FULLFILLMENT_METHODS_TYPES;
          orderNumber: string;
          customerEmail: string;
          createdAt: string;
          addressChanged: false;
          failingReason: string;
        }
      | {
          workflowId: string;
          workflowStatus: Extract<WORKFLOW_STATUS_TYPE, "completed">;
          fulfillmentMethod: FULLFILLMENT_METHODS_TYPES;
          orderNumber: string;
          customerEmail: string;
          createdAt: string;
          addressChanged: true;
          newAddress: string;
        }
    );

export type {
  ADDRESS_CHANGE_WORKFLOW_CARD_PROPS,
  WORKFLOW_STATUS_TYPE,
  // Workflow Steps
  WAREHOUSE_EMAIL_STEPS,
  SHIPBOB_STEPS,
  SELF_FULFILLMENT_STEPS,
  SHIPSTATION_FULLFILLMENT_STEPS,
};
