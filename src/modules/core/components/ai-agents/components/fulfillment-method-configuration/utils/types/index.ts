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
type FULFILLMENT_METHOD_DIALOG_PROPS = {
  dialogType: FULLFILLMENT_METHODS_TYPES;
  isDialogOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

export type { FULFILLMENT_METHOD_CARD_PROPS, FULFILLMENT_METHOD_DIALOG_PROPS };
