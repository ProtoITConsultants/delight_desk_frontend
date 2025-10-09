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

export type { FULFILLMENT_METHOD_CARD_PROPS };
