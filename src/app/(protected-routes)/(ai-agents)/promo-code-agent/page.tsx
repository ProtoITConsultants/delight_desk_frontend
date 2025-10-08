"use client";
import { Button } from "@/components/ui/button";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import EmailResponseSamplePreview from "@/modules/core/components/ai-agents/components/email-response-preview";
import PromoCodeDialoge from "@/modules/protected-routes/ai-agents/promo-code-agent/components/add-promo-code-dialog";
import NoPromoCodeCard from "@/modules/protected-routes/ai-agents/promo-code-agent/components/no-promo-code-card";
import PromoCodeCard from "@/modules/protected-routes/ai-agents/promo-code-agent/components/promo-code-card";
import { PromoCodeDialogContextProvider } from "@/modules/protected-routes/ai-agents/promo-code-agent/utils/context";
import { PROMO_CODE_TYPES } from "@/modules/protected-routes/ai-agents/promo-code-agent/utils/types/promo-code-card";
import { Plus, Tag } from "lucide-react";
import { useState } from "react";

const PROMO_CODES_DATA: PROMO_CODE_TYPES[] = [
  {
    id: "1",
    promo_code: "SAVE20",
    description: "20% off all orders",
    discount_type: "percentage",
    usage_type: "refund_only",
    discount_percentage: "20",
    max_refund_value: "",
    discount_amount: "",
    valid_from: "2025-10-08T00:47",
    valid_until: "2025-10-16T00:47",
    min_order_value: "10",
    applies_to_subscription: false,
    requires_moderation: true,
    is_active: true,
    usage_count: 10,
    last_used: "2025-10-08T00:47",
    enable_first_time_customer_discounts: false,
    first_time_customer_message: "",
    enable_general_inquiry_discounts: false,
    max_offer_per_customer: 1,
    offer_frequency_days: 1,
  },
];

const PromoCodeAgent = () => {
  const [isCreatePromoCodeDialogOpen, setIsCreatePromoCodeDialogOpen] =
    useState(false);

  return (
    <PromoCodeDialogContextProvider>
      <AiAgentRoot className="max-w-7xl">
        {/* Create Promo Code Dialog */}
        <PromoCodeDialoge
          dialogType="add-promo-code"
          dialogeTitle="Create Promo Code Configuration"
          dialogDescription="Set up automatic refunds for customers who qualified for a promo code but didn't receive the discount on their order. Configure the discount amount, validity period, and eligibility requirements."
          isDialogOpen={isCreatePromoCodeDialogOpen}
          onOpenChange={(value) => {
            setIsCreatePromoCodeDialogOpen(value);
          }}
        />

        {/* Header */}
        <AiAgentHeader
          className="lg:flex-row flex-col"
          rightSectionClassName="w-full lg:w-fit"
          Icon={
            <div className="p-2 bg-orange-400/10 rounded-lg">
              <Tag className="h-6 w-6 text-orange-400" />
            </div>
          }
          title="Promo Code Agent"
          description="Automatically handle promo code refunds AND offer first-time customer discounts. Configure when and how to provide discounts to new customers and general inquiries, plus process refunds for missed promo codes."
          hasRightSection={true}
          rightSection={
            <Button
              className="flex items-center gap-2"
              onClick={() => {
                setIsCreatePromoCodeDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Add Promo Code
            </Button>
          }
        />
        {/* Body */}
        {PROMO_CODES_DATA.length === 0 ? (
          <NoPromoCodeCard
            setIsDialogOpen={() => {
              setIsCreatePromoCodeDialogOpen(true);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 max-h-[500px] overflow-auto">
              {PROMO_CODES_DATA.map((promoCode) => (
                <PromoCodeCard key={promoCode.id} {...promoCode} />
              ))}
            </div>

            {/* Email Response Preview */}
            <EmailResponseSamplePreview
              {...{
                type: "default",
                fromEmail: "hello@humanfoodbar.com",
                subject: "Re: Promo Code Applied",
                content: `<p>Great news! I found a promo code that applies to your order: SAVE20.<br/><br/>This will give you 20% off your purchase. The discount has been applied and you should see the savings reflected in your order total.<br/><br/>Is there anything else I can help you with regarding your order or our current promotions?</p>`,
                signature: {
                  agentName: "Kai",
                  agentTitle: "AI Customer Service Agent",
                  companyName: "Human Food Bar",
                },
              }}
            />
          </div>
        )}
      </AiAgentRoot>
    </PromoCodeDialogContextProvider>
  );
};

export default PromoCodeAgent;
