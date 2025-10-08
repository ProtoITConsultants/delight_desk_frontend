import { FULLFILLMENT_METHODS, WORKFLOW_STATUS_TYPE } from "../index";

type WORKFLOW_TIMELINE_PROPS = {
  workflowId: string;
  fulfillmentMethod: FULLFILLMENT_METHODS;
  workflowStatus: WORKFLOW_STATUS_TYPE;
};

export type { WORKFLOW_TIMELINE_PROPS };
