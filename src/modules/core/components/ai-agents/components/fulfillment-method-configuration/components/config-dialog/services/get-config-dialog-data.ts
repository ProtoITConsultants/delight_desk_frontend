import { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";
import ORDER_CANCELLATION_DIALOG_CONFIG from "../constants/order-cancellation";
import { FULFILLMENT_METHOD_AGENT_TYPE } from "../../../utils/types";

const getFulfillmentMethodConfigDialogData = ({
  methodType,
  agentType,
}: {
  methodType: FULLFILLMENT_METHODS_TYPES;
  agentType: FULFILLMENT_METHOD_AGENT_TYPE;
}) => {
  const methodConfig =
    agentType === "order_cancellation"
      ? ORDER_CANCELLATION_DIALOG_CONFIG[methodType]
      : ORDER_CANCELLATION_DIALOG_CONFIG[methodType];
  return {
    title: methodConfig.title,
    description: methodConfig.description,
    howItWorksSteps: methodConfig.howItWorksSteps,
    faqs: methodConfig.faqs,
  };
};

export default getFulfillmentMethodConfigDialogData;
