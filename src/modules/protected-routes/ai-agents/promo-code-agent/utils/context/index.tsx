"use client";
import React, { createContext, useContext, useState } from "react";
import { PROMO_CODE_CONTEXT_TYPE } from "../types/promo-code-context";
import { PROMO_CODE_FORM_TYPE } from "../types/promo-code-dialog";
import { PROMO_CODE_FORM_SCHEMA } from "../schema/promo-code-agent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const PromoCodeDialogContext = createContext<PROMO_CODE_CONTEXT_TYPE | null>(
  null
);

export const PromoCodeDialogContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    "add-promo-code" | "edit-promo-code"
  >("add-promo-code");

  const form = useForm<PROMO_CODE_FORM_TYPE>({
    resolver: zodResolver(PROMO_CODE_FORM_SCHEMA),
    defaultValues: {
      promo_code: "",
      description: "",
      usage_type: "refund_only",
      discount_type: "percentage",
      discount_percentage: "",
      max_refund_value: "",
      valid_from: "",
      valid_until: "",
      min_order_value: "",
      applies_to_subscription: false,
      is_active: false,
      requires_moderation: false,
      enable_first_time_customer_discounts: false,
      first_time_customer_message: "",
      enable_general_inquiry_discounts: false,
      max_offer_per_customer: 1,
      offer_frequency_days: 90,
    },
  });

  return (
    <PromoCodeDialogContext.Provider
      value={{ form, isDialogOpen, setIsDialogOpen, dialogType, setDialogType }}
    >
      {children}
    </PromoCodeDialogContext.Provider>
  );
};

export const usePromoCodeDialog = () => {
  const ctx = useContext(PromoCodeDialogContext);
  if (!ctx)
    throw new Error(
      "usePromoCodeDialog must be used inside PromoCodeDialogContextProvider"
    );
  return ctx;
};
