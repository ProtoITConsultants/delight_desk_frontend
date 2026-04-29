"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePromoCodeConfigurations } from "@/hooks/services/ai-agents/promo-code/use-promo-code-configurations";
import { useUpdateSpecificAIAgentSettings } from "@/hooks/services/ai-agents/use-update-specific-ai-agent-settings";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import EmailResponseSamplePreview from "@/modules/core/components/ai-agents/components/email-response-preview";
import PromoCodeDialoge from "@/modules/protected-routes/ai-agents/promo-code-agent/components/add-promo-code-dialog";
import NoPromoCodeCard from "@/modules/protected-routes/ai-agents/promo-code-agent/components/no-promo-code-card";
import PromoCodeCard from "@/modules/protected-routes/ai-agents/promo-code-agent/components/promo-code-card";
import {
  PromoCodeDialogContextProvider,
  usePromoCodeDialog,
} from "@/modules/protected-routes/ai-agents/promo-code-agent/utils/context";
import { apiConfigurationToCardProps } from "@/modules/protected-routes/ai-agents/promo-code-agent/utils/mappers/promo-code-api-mappers";
import { useAiAgents } from "@/providers/ai-agents";
import { Bot, Plus, Tag } from "lucide-react";
import { useState } from "react";

const PromoCodeAgentContent = () => {
  const { form } = usePromoCodeDialog();
  const [isCreatePromoCodeDialogOpen, setIsCreatePromoCodeDialogOpen] =
    useState(false);
  const {
    aiAgentsSettings: { promo_code },
  } = useAiAgents();
  const { updateAIAgentSettings, isUpdating } =
    useUpdateSpecificAIAgentSettings();
  const { configurations, isConfigurationsPending } =
    usePromoCodeConfigurations();

  return (
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
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <Button
              className="flex items-center gap-2"
              onClick={() => {
                form.reset();
                setIsCreatePromoCodeDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Add Promo Code
            </Button>
          </div>
        }
      />

      {/* Body */}
      {/* Agent Settings */}
      <AgentSettings
        agentName="Promo Code Agent"
        agentIcon={<Bot className="h-5 w-5" />}
        agentDescription="Configure how the Promo Code Agent handles promo code related inquiries."
        enableAgentButtonDescription="Automatically respond to promo code and discount related inquiries."
        isAgentEnabled={promo_code.isEnabled}
        onChangeAgentConfiguration={() => {
          if (promo_code?.isEnabled) {
            updateAIAgentSettings({
              params: {
                agentId: promo_code.id,
                isEnabled: false,
                requiresModeration: false,
              },
            });
          } else {
            updateAIAgentSettings({
              params: {
                agentId: promo_code.id,
                isEnabled: true,
              },
            });
          }
        }}
        agentNeedsModeration={promo_code.requiresModeration}
        onChangeAgentModeration={() =>
          updateAIAgentSettings({
            params: {
              agentId: promo_code.id,
              requiresModeration: !promo_code.requiresModeration,
            },
          })
        }
        disableAgentSettings={isUpdating}
      />

      {isConfigurationsPending ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
          <Skeleton className="min-h-[320px] w-full rounded-lg" />
        </div>
      ) : !configurations?.length ? (
        <NoPromoCodeCard
          setIsDialogOpen={() => {
            setIsCreatePromoCodeDialogOpen(true);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 max-h-[500px] overflow-auto">
            {configurations.map((config) => (
              <PromoCodeCard
                key={config.id}
                {...apiConfigurationToCardProps(config)}
              />
            ))}
          </div>

          {/* Email Response Preview */}
          <EmailResponseSamplePreview
            responsePreviewType="default"
            from="hello@humanfoodbar.com"
            to="hello@humanfoodbar.com"
            {...{
              type: "default",
              fromEmail: "hello@humanfoodbar.com",
              subject: "Re: Promo Code Applied",
              body: `<p>Great news! I found a promo code that applies to your order: SAVE20.<br/><br/>This will give you 20% off your purchase. The discount has been applied and you should see the savings reflected in your order total.<br/><br/>Is there anything else I can help you with regarding your order or our current promotions?</p>`,
              signature: `Kai<br/>AI Customer Service Agent<br/>Human Food Bar`,
            }}
            hasTracking={false}
          />
        </div>
      )}
    </AiAgentRoot>
  );
};

const PromoCodeAgentPage = () => {
  return (
    <PromoCodeDialogContextProvider>
      <PromoCodeAgentContent />
    </PromoCodeDialogContextProvider>
  );
};

export default PromoCodeAgentPage;
