import { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";
import { WORKFLOW_STATUS_TYPE } from "../index";

type WORKFLOW_TIMELINE_PROPS = {
  workflowId: string;
  fulfillmentMethod: FULLFILLMENT_METHODS_TYPES;
  workflowStatus: WORKFLOW_STATUS_TYPE;
};

export type { WORKFLOW_TIMELINE_PROPS };
