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

interface PENDING_ACTION_FILTER_TAB_ITEM {
  id: string;
  type: PENDING_ACTIONS_FILTERS_TYPES;
  label: string;
  items: [];
}

type PENDING_ACTION_FILTER_TABS = PENDING_ACTION_FILTER_TAB_ITEM[];

export type {
  PENDING_ACTIONS_FILTERS_TYPES,
  PENDING_ACTION_FILTER_TAB_ITEM,
  PENDING_ACTION_FILTER_TABS,
};
