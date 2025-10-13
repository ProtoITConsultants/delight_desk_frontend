// Data Structure for Pending Action Items (Fetched From Backend)
type PLANNED_ACTION_TYPE = {
  actionName: string;
  actionDetails: string;
};

type PENDING_ACTION_ITEM_TYPE = {
  id: string;
  emailSubject: string;
  emailBody: string;
  customerEmail: string;
  emailReceivedAt: string;
  requestType: string;
  proposedAIResponse: string;
  plannedActions: PLANNED_ACTION_TYPE[];
  // Extra Details related to the pending action
  pending_action_details: string;
};

// Types of Filter Tabs Shown In Pending Actions Tab
type PENDING_ACTIONS_FILTERS_TYPES =
  | "all"
  | "returns-agent"
  | "subscriptions-agent"
  | "wismo-agent"
  | "gerneral"
  | "order-cancellations-agent"
  | "address-change-agent"
  | "product-agent"
  | "promo-code-agent";

// Structure of Each Filter Tab Item
interface PENDING_ACTION_FILTER_TAB_ITEM {
  id: string;
  type: PENDING_ACTIONS_FILTERS_TYPES;
  label: string;
  items: PENDING_ACTION_ITEM_TYPE[];
}

// Structure of Filter Tabs Array
type PENDING_ACTION_FILTER_TABS = PENDING_ACTION_FILTER_TAB_ITEM[];

export type {
  PENDING_ACTIONS_FILTERS_TYPES,
  PENDING_ACTION_FILTER_TAB_ITEM,
  PENDING_ACTION_FILTER_TABS,
};
