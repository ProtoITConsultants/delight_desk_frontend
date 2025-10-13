import { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";

// Fulfillment Method Card
type FULFILLMENT_METHOD_CARD_PROPS = {
  methodId: string;
  methodTitle: string;
  methodDescription: string;
  methodFeatures: string[];
  cardColorClassName: string;
  isCurrentConfiguredMethod: boolean;
  MethodIcon: React.ElementType;
  configuredWarehouseEmail?: string; // Only passed for the warehouse fulfillment method
  areActionButtonsDisabled: boolean;
  isConfigMethodEnabled: boolean;
  methodConfigStatus: string;
  onActivateConfigMethod: () => void;
  onClickConfigMethod: () => void;
};

// Fulfillment Method Dialog
type FULFILLMENT_METHOD_AGENT_TYPE = "order_cancellation" | "address_change";

type FULFILLMENT_METHOD_DIALOG_PROPS = {
  agentType: FULFILLMENT_METHOD_AGENT_TYPE;
  dialogType: FULLFILLMENT_METHODS_TYPES;
  isDialogOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

// How It Works Section Props
type HOW_FULFILLMENT_METHOD_WORKS_STEP = {
  heading: string;
  description: string;
};

type HOW_FULFILLMENT_METHOD_WORKS_PROPS = {
  fulfillmentMethodTitle: FULLFILLMENT_METHODS_TYPES;
  howItWorksSteps: HOW_FULFILLMENT_METHOD_WORKS_STEP[];
};

// FAQs Section Props
type FAQ_TYPE = {
  question: string;
  answer: string;
};

type FULFILLMENT_METHOD_CONFIG_FAQS_PROPS = {
  faqs: FAQ_TYPE[];
};

export type {
  FULFILLMENT_METHOD_CARD_PROPS,
  FULFILLMENT_METHOD_AGENT_TYPE,
  FULFILLMENT_METHOD_DIALOG_PROPS,
  HOW_FULFILLMENT_METHOD_WORKS_STEP,
  HOW_FULFILLMENT_METHOD_WORKS_PROPS,
  FULFILLMENT_METHOD_CONFIG_FAQS_PROPS,
};
