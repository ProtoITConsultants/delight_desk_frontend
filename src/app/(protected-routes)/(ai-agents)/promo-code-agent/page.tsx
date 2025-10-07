"use client";
import { Button } from "@/components/ui/button";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import EmailResponseSamplePreview from "@/modules/core/components/ai-agents/components/email-response-preview";
import PromoCodeDialoge from "@/modules/protected-routes/ai-agents/promo-code-agent/components/add-promo-code-dialog";
import NoPromoCodeCard from "@/modules/protected-routes/ai-agents/promo-code-agent/components/no-promo-code-card";
import { Plus, Tag } from "lucide-react";
import { useState } from "react";

const PROMO_CODES_DATA = [];

const PromoCodeAgent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AiAgentRoot>
      {/* Header */}
      <AiAgentHeader
        Icon={
          <div className="p-2 bg-orange-400/10 rounded-lg">
            <Tag className="h-6 w-6 text-orange-400" />
          </div>
        }
        title="Promo Code Agent"
        description="Automatically handle promo code refunds AND offer first-time customer discounts. Configure when and how to provide discounts to new customers and general inquiries, plus process refunds for missed promo codes."
        hasRightSection={true}
        rightSection={
          <PromoCodeDialoge
            dialogType="add-promo-code"
            dialogeTitle="Create Promo Code Configuration"
            dialogDescription="Set up automatic refunds for customers who qualified for a promo code but didn't receive the discount on their order. Configure the discount amount, validity period, and eligibility requirements."
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            dialogTrigger={
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Promo Code
              </Button>
            }
          />
        }
      />
      {/* Body */}
      {PROMO_CODES_DATA.length === 0 ? (
        <NoPromoCodeCard setIsDialogOpen={setIsDialogOpen} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
  );
};

export default PromoCodeAgent;
