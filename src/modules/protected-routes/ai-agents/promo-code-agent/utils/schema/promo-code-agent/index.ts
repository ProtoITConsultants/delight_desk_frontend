import z from "zod";

export const PROMO_CODE_FORM_SCHEMA = z
  .object({
    promo_code: z.string().min(1, "Promo code is required"),
    description: z.string().optional(),
    usage_type: z.enum([
      "refund_only",
      "first_time_customer_discount",
      "general_discount_inquiries",
      "both_refund_and_new_customer_offers",
    ]),
    discount_type: z.enum(["percentage", "fixed_cash"]),
    discount_percentage: z.string().optional(),
    max_refund_value: z.string().optional(),
    discount_amount: z.string().optional(),
    valid_from: z.string().min(1, "Valid from date is required"),
    valid_until: z.string().min(1, "Valid until date is required"),
    // Eligibity Rules
    min_order_value: z.string().optional(),
    applies_to_subscription: z.boolean().optional(),
    is_active: z.boolean().optional(),
    requires_moderation: z.boolean().optional(),
    // Customer Offering Rules
    enable_first_time_customer_discounts: z.boolean().optional(), // Automatically offer this discount to customers with no previous orders
    first_time_customer_message: z.string().optional(),
    enable_general_inquiry_discounts: z.boolean().optional(), // Offer this discount when customers ask about available promotions
    max_offer_per_customer: z
      .number()
      .min(1, "Min offers per customer should be 1.")
      .max(10, "Max Offers per customer can be 10."),
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
    if (data.discount_type === "fixed_cash" && !data.discount_amount) {
      ctx.addIssue({
        path: ["discount_amount"],
        message: "Discount amount is required!",
        code: z.ZodIssueCode.custom,
      });
    }
  });
