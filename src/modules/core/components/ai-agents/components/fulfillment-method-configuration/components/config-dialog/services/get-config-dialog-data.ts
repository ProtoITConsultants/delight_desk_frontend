import { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";
import ORDER_CANCELLATION_DIALOG_CONFIG from "../constants/order-cancellation";
import ADDRESS_CHANGE_DIALOG_CONFIG from "../constants/address-change";

type GetFulfillmentConfigParams =
  | { methodType: FULLFILLMENT_METHODS_TYPES; agentType: "order_cancellation" }
  | {
      methodType: Exclude<FULLFILLMENT_METHODS_TYPES, "shipstation">;
      agentType: "address_change";
    };

const getFulfillmentMethodConfigDialogData = ({
  methodType,
  agentType,
}: GetFulfillmentConfigParams) => {
  const methodConfig =
    agentType === "order_cancellation"
      ? ORDER_CANCELLATION_DIALOG_CONFIG[methodType]
      : ADDRESS_CHANGE_DIALOG_CONFIG[methodType];
  return {
    title: methodConfig.title,
    description: methodConfig.description,
    howItWorksSteps: methodConfig.howItWorksSteps,
    faqs: methodConfig.faqs,
  };
};

export default getFulfillmentMethodConfigDialogData;
