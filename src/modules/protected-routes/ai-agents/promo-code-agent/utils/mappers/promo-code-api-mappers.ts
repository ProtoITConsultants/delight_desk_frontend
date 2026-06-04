import type {
  CreatePromoCodeConfigurationPayload,
  PromoCodeConfiguration,
} from "@/services/ai-agents/utils/promo-code";
import type { PROMO_CODE_TYPES } from "../types/promo-code-card";
import type { PROMO_CODE_FORM_TYPE } from "../types/promo-code-dialog";

function isoToDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate(),
  )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function parseOptionalNumber(s: string | undefined, round = true): number | null {
  if (s === undefined || s === null || s === "") return null;
  const n = round ? Math.round(parseFloat(s) * 100) / 100 : parseFloat(s);
  return Number.isNaN(n) ? null : n;
}

export function datetimeLocalToIsoOrNull(value: string): string | null {
  if (!value || !value.trim()) return null;
  const t = new Date(value).getTime();
  if (Number.isNaN(t)) return null;
  return new Date(value).toISOString();
}

/** Build create payload: only documented API fields, strict. */
export function formValuesToCreatePayload(
  data: PROMO_CODE_FORM_TYPE,
): CreatePromoCodeConfigurationPayload {
  const minOrder = parseOptionalNumber(data.min_order_value);
  const validFrom = datetimeLocalToIsoOrNull(data.valid_from);
  const validUntil = datetimeLocalToIsoOrNull(data.valid_until);

  const base: CreatePromoCodeConfigurationPayload = {
    promoCode: data.promo_code.trim(),
    description: data.description?.trim() || undefined,
    isActive: data.is_active,
    usageType: data.usage_type,
    discountType: data.discount_type,
    validFrom: validFrom ?? null,
    validUntil: validUntil ?? null,
    minimumOrderValue: minOrder,
    appliesToSubscriptions: data.applies_to_subscription ?? false,
  };

  if (data.discount_type === "percentage") {
    const pct = parseOptionalNumber(data.discount_percentage);
    return {
      ...base,
      discountPercentage: pct,
      maxRefundAmount: parseOptionalNumber(data.max_refund_value),
    };
  }

  const fixed = parseOptionalNumber(data.discount_amount);
  return {
    ...base,
    discountPercentage: null,
    maxRefundAmount: fixed,
  };
}

export function apiConfigurationToFormValues(
  c: PromoCodeConfiguration,
): PROMO_CODE_FORM_TYPE {
  return {
    promo_code: c.promoCode,
    description: c.description ?? "",
    usage_type: c.usageType,
    discount_type: c.discountType,
    discount_percentage: c.discountPercentage ?? "",
    max_refund_value: c.maxRefundAmount ?? "",
    discount_amount:
      c.discountType === "fixed_amount" ? c.maxRefundAmount ?? "" : "",
    valid_from: isoToDatetimeLocalValue(c.validFrom),
    valid_until: isoToDatetimeLocalValue(c.validUntil),
    min_order_value: c.minimumOrderValue ?? "",
    applies_to_subscription: c.appliesToSubscriptions,
    is_active: c.isActive,
    enable_first_time_customer_discounts: false,
    first_time_customer_message: "",
    enable_general_inquiry_discounts: false,
    offer_frequency_days: 90,
  };
}

export function apiConfigurationToCardProps(
  c: PromoCodeConfiguration,
): PROMO_CODE_TYPES {
  return {
    id: c.id,
    promo_code: c.promoCode,
    description: c.description ?? "",
    usage_type: c.usageType,
    discount_type: c.discountType,
    discount_percentage: c.discountPercentage ?? "",
    max_refund_value: c.maxRefundAmount ?? "",
    discount_amount:
      c.discountType === "fixed_amount" ? c.maxRefundAmount ?? "" : "",
    valid_from: c.validFrom ? isoToDatetimeLocalValue(c.validFrom) : "",
    valid_until: c.validUntil ? isoToDatetimeLocalValue(c.validUntil) : "",
    min_order_value: c.minimumOrderValue ?? "",
    applies_to_subscription: c.appliesToSubscriptions,
    is_active: c.isActive,
    last_used: (() => {
      const raw = c.lastSyncedAt;
      if (raw == null || String(raw).trim() === "") return "";
      const t = new Date(raw).getTime();
      return Number.isNaN(t) ? "" : String(raw).trim();
    })(),
    enable_first_time_customer_discounts: false,
    first_time_customer_message: "",
    enable_general_inquiry_discounts: false,
    offer_frequency_days: 90,
    last_sync_error: c.lastSyncError,
  };
}
