type FULLFILLMENT_METHODS_TYPES =
  | "warehouse_email"
  | "shipbob"
  | "self_fulfillment"
  | "shipstation";

type FULLFILLMENT_METHOD_CONFIG_SETTINGS_TYPES = {
  warehouseEmailEnabled: boolean;
  shipbobEnabled: boolean;
  selfFulfillmentEnabled: boolean;
  shipstationEnabled: boolean;
};

export type {
  FULLFILLMENT_METHODS_TYPES,
  FULLFILLMENT_METHOD_CONFIG_SETTINGS_TYPES,
};
