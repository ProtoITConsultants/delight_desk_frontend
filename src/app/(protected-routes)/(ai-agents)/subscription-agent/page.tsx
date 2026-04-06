"use client";

import { useUpdateSpecificAIAgentSettings } from "@/hooks/services/ai-agents/use-update-specific-ai-agent-settings";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import EmailResponseSamplePreview from "@/modules/core/components/ai-agents/components/email-response-preview";
import HowAgentWorks from "@/modules/core/components/ai-agents/components/how-agent-works";
import WhatAgentHandles from "@/modules/core/components/ai-agents/components/what-agent-handles";
import AGENT_WORKFLOW_STEPS from "@/modules/core/components/ai-agents/constants/how-agent-works";
import WHAT_AGENT_HANDLES from "@/modules/core/components/ai-agents/constants/what-agent-handles";
import { useAiAgents } from "@/providers/ai-agents";
import { Bot, CreditCard } from "lucide-react";

const SubscriptionAgentPage = () => {
  const {
    aiAgentsSettings: { subscription },
  } = useAiAgents();
  const { updateAIAgentSettings, isUpdating } =
    useUpdateSpecificAIAgentSettings();
  return (
    <AiAgentRoot>
      {/* Header */}
      <AiAgentHeader
        Icon={
          <div className="p-2 bg-green-100 rounded-lg">
            <CreditCard className="h-6 w-6 text-green-600" />
          </div>
        }
        title="Subscription Agent"
        description="Automate billing, plan changes, and subscription inquiries"
      />
      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Settings */}
        <AgentSettings
          agentName="Subscription Agent"
          agentIcon={<Bot className="h-5 w-5" />}
          agentDescription="Configure how the Subscription Agent handles billing and plan inquiries."
          enableAgentButtonDescription="Automatically respond to billing and subscription change requests."
          isAgentEnabled={subscription.isEnabled}
          onChangeAgentConfiguration={() => {
            if (subscription?.isEnabled) {
              updateAIAgentSettings({
                params: {
                  agentId: subscription.id,
                  isEnabled: false,
                  requiresModeration: false,
                },
              });
            } else {
              updateAIAgentSettings({
                params: {
                  agentId: subscription.id,
                  isEnabled: true,
                },
              });
            }
          }}
          agentNeedsModeration={subscription.requiresModeration}
          onChangeAgentModeration={() =>
            updateAIAgentSettings({
              params: {
                agentId: subscription.id,
                requiresModeration: !subscription.requiresModeration,
              },
            })
          }
          disableAgentSettings={isUpdating}
          settingsTip="Keep moderation enabled for billing-related requests to ensure accuracy and prevent unauthorized changes."
        />
        {/* Email Response Preview */}
        <EmailResponseSamplePreview
          responsePreviewType="default"
          from="hello@humanfoodbar.com"
          to="hello@humanfoodbar.com"
          {...{
            type: "default",
            fromEmail: "hello@humanfoodbar.com",
            subject: "Re: Subscription Management",
            body: `<p>Your subscription has been paused! Reply back "reactivate" anytime and we will turn it back on for you.<br/><br/>Need help with something else? I'm here to assist with any subscription questions you might have.</p>`,
            signature: `Kai<br/>AI Customer Service Agent<br/>Human Food Bar`,
          }}
          hasTracking={false}
        />
      </div>

      {/* What Agent Handles */}
      <WhatAgentHandles agentFeatures={WHAT_AGENT_HANDLES.SUBSCRIPTION_AGENT} />
      {/* How Agent Works */}
      <HowAgentWorks
        agentWorkflowSteps={AGENT_WORKFLOW_STEPS.SUBSCRIPTION_AGENT}
        agentRequiresModeration={subscription.requiresModeration}
      />
    </AiAgentRoot>
  );
};

export default SubscriptionAgentPage;
