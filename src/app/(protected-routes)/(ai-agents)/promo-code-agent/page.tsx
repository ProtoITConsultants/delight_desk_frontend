"use client";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import PromoCodeDialoge from "@/modules/protected-routes/ai-agents/promo-code-agent/components/add-promo-code-dialog";
import { Tag } from "lucide-react";

const PromoCodeAgent = () => {
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
        description="Configure sophisticated promo code refund automation with advanced eligibility rules and validation"
        hasRightSection={true}
        rightSection={
          <PromoCodeDialoge
            dialogType="add-promo-code"
            dialogeTitle="Create Promo Code Configuration"
            dialogDescription="Set up automatic refunds for customers who qualified for a promo code but didn't receive the discount on their order. Configure the discount amount, validity period, and eligibility requirements."
          />
        }
      />
    </AiAgentRoot>
  );
};

export default PromoCodeAgent;
