import { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";
import DIALOG_CONFIG from "../constants";

const getDialogHeader = (methodType: FULLFILLMENT_METHODS_TYPES) => {
  const methodConfig = DIALOG_CONFIG[methodType];
  return {
    title: methodConfig.title,
    description: methodConfig.description,
  };
};

export default getDialogHeader;
