import z from "zod";

export const PROMO_CODE_FORM_SCHEMA = z
  .object({
    promo_code: z.string().min(1, "Promo code is required"),
    description: z.string().optional(),
    usage_type: z.enum([
      "refund_only",
      "first_time_customer_discount",
      "general_discount_inquiry",
      "refund_and_new_customer_offer",
    ]),
    discount_type: z.enum(["percentage", "fixed_amount"]),
    discount_percentage: z.string().optional(),
    max_refund_value: z.string().optional(),
    discount_amount: z.string().optional(),
    valid_from: z.string().min(1, "Valid from date is required"),
    valid_until: z.string().min(1, "Valid until date is required"),
    // Eligibity Rules
    min_order_value: z.string().optional(),
    applies_to_subscription: z.boolean().optional(),
    is_active: z.boolean().optional(),
    // Customer Offering Rules
    enable_first_time_customer_discounts: z.boolean().optional(), // Automatically offer this discount to customers with no previous orders
    first_time_customer_message: z.string().optional(),
    enable_general_inquiry_discounts: z.boolean().optional(), // Offer this discount when customers ask about available promotions
    offer_frequency_days: z
      .number()
      .min(1, "Frequency Days are Required!")
      .max(365, "Frequency (Days) cannot be greater than 365."),
  })
  .superRefine((data, ctx) => {
    if (data.discount_type === "percentage" && !data.discount_percentage) {
      ctx.addIssue({
        path: ["discount_percentage"],
        message: "Discount percentage is required!",
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.discount_type === "fixed_amount" && !data.discount_amount) {
      ctx.addIssue({
        path: ["discount_amount"],
        message: "Discount amount is required!",
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.discount_type === "percentage" && data.max_refund_value?.trim()) {
      const n = parseFloat(data.max_refund_value);
      if (Number.isNaN(n) || n <= 0) {
        ctx.addIssue({
          path: ["max_refund_value"],
          message: "Maximum refund amount must be greater than 0",
          code: z.ZodIssueCode.custom,
        });
      }
    }
    if (data.discount_type === "fixed_amount" && data.discount_amount?.trim()) {
      const n = parseFloat(data.discount_amount);
      if (Number.isNaN(n) || n <= 0) {
        ctx.addIssue({
          path: ["discount_amount"],
          message: "Amount must be greater than 0",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });
