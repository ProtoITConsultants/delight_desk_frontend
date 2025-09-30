type SUBSCRIPTION_CARD_TYPES = {
  isCurrentPlan: boolean;
  planName: string;
  planPrice: string;
  planFeatures: string[];
  isTrialPlan: boolean;
  userHasPaymentMethod: boolean;
  isPlanCancelled: boolean;
  isPlanActive: boolean;
};

export type { SUBSCRIPTION_CARD_TYPES };
