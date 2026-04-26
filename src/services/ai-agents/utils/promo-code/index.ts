export type PromoCodeUsageType =
  | "refund_only"
  | "first_time_customer_discount"
  | "general_discount_inquiry"
  | "refund_and_new_customer_offer";

export type PromoCodeDiscountType = "percentage" | "fixed_amount";

export type PromoCodeConfiguration = {
  id: string;
  userId: string;
  promoCode: string;
  description: string | null;
  isActive: boolean;
  usageType: PromoCodeUsageType;
  discountType: PromoCodeDiscountType;
  discountPercentage: string | null;
  maxRefundAmount: string | null;
  minimumOrderValue: string | null;
  validFrom: string | null;
  validUntil: string | null;
  maxUsageCount: number | null;
  appliesToSubscriptions: boolean;
  wooCommerceCouponId: number | null;
  lastSyncedAt: string | null;
  lastSyncError: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreatePromoCodeConfigurationPayload = {
  promoCode: string;
  description?: string;
  isActive?: boolean;
  usageType?: PromoCodeUsageType;
  discountType?: PromoCodeDiscountType;
  discountPercentage?: number | null;
  maxRefundAmount?: number | null;
  validFrom?: string | null;
  validUntil?: string | null;
  minimumOrderValue?: number | null;
  appliesToSubscriptions?: boolean;
};

export type UpdatePromoCodeConfigurationPayload =
  Partial<CreatePromoCodeConfigurationPayload>;

export type DeletePromoCodeConfigurationResponse = {
  message: string;
};

export type SyncPromoCodeConfigurationsResponse = {
  synced: number;
  failed: number;
};
