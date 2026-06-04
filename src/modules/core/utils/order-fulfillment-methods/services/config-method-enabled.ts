import {
  FULLFILLMENT_METHOD_CONFIG_SETTINGS_TYPES,
  FULLFILLMENT_METHODS_TYPES,
} from "../types";

const isConfigMethodEnabled = ({
  methodId,
  configSettings,
}: {
  methodId: FULLFILLMENT_METHODS_TYPES;
  configSettings: FULLFILLMENT_METHOD_CONFIG_SETTINGS_TYPES;
}) => {
  switch (methodId) {
    case "warehouse_email":
      return configSettings?.warehouseEmailEnabled ?? false;
    case "shipbob":
      return configSettings?.shipbobEnabled ?? false;
    case "self_fulfillment":
      return configSettings?.selfFulfillmentEnabled ?? false;
    case "shipstation":
      return configSettings?.shipstationEnabled ?? false;
    default:
      return false;
  }
};

export { isConfigMethodEnabled };
