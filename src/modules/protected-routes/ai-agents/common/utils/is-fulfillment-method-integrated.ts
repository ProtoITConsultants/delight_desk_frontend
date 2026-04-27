import { isConfigMethodEnabled } from "@/modules/core/utils/order-fulfillment-methods/services/config-method-enabled";
import { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";
import { FulfillmentMethodType } from "@/services/ai-agents/utils/fulfillment-method";
import type { FulfillmentMethodSettings } from "@/services/ai-agents/utils/fulfillment-method";

const mapMethodToCardId = (
  method: FulfillmentMethodType | undefined,
): FULLFILLMENT_METHODS_TYPES | null => {
  switch (method) {
    case FulfillmentMethodType.CUSTOM_WAREHOUSE:
      return "warehouse_email";
    case FulfillmentMethodType.SHIPBOB:
      return "shipbob";
    case FulfillmentMethodType.SELF:
      return "self_fulfillment";
    case FulfillmentMethodType.SHIPSTATION:
      return "shipstation";
    default:
      return null;
  }
};

/**
 * True when a fulfillment method is selected and the required fields for that method are set.
 * Matches the rules used on order cancellation and address change config pages.
 */
export const isFulfillmentMethodIntegrated = (
  settings: FulfillmentMethodSettings | undefined,
): boolean => {
  if (!settings) return false;
  const methodId = mapMethodToCardId(settings.method);
  if (!methodId) return false;
  const configSettings = {
    warehouseEmailEnabled: Boolean(settings.warehouseEmail),
    shipbobEnabled: Boolean(settings.shipbobPersonalAccessToken),
    selfFulfillmentEnabled: true,
    shipstationEnabled: Boolean(settings.shipstationApiKey),
  };
  return isConfigMethodEnabled({ methodId, configSettings });
};
