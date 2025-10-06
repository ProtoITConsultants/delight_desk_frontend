"use client";

import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import EmailResponseSamplePreview from "@/modules/core/components/ai-agents/components/email-response-preview";
import HowAgentWorks from "@/modules/core/components/ai-agents/components/how-agent-works";
import WhatAgentHandles from "@/modules/core/components/ai-agents/components/what-agent-handles";
import AGENT_WORKFLOW_STEPS from "@/modules/core/components/ai-agents/constants/how-agent-works";
import WHAT_AGENT_HANDLES from "@/modules/core/components/ai-agents/constants/what-agent-handles";
import { Bot, CreditCard } from "lucide-react";
import { useState } from "react";

const SubscriptionAgentPage = () => {
  const [isAgentEnabled, setIsAgentEnabled] = useState(false);
  const [isAgentModerated, setIsAgentModerated] = useState(false);
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
          isAgentEnabled={isAgentEnabled}
          onChangeAgentConfiguration={() => {
            if (isAgentEnabled) {
              setIsAgentEnabled(false);
              setIsAgentModerated(false);
            } else {
              setIsAgentEnabled(true);
            }
          }}
          agentNeedsModeration={isAgentModerated}
          onChangeAgentModeration={() => setIsAgentModerated(!isAgentModerated)}
          isChangingAgentSettings={false}
          settingsTip="Keep moderation enabled for billing-related requests to ensure accuracy and prevent unauthorized changes."
        />
        {/* Email Response Preview */}
        <EmailResponseSamplePreview
          {...{
            type: "default",
            fromEmail: "hello@humanfoodbar.com",
            subject: "Re: Subscription Management",
            content: `<p>Your subscription has been paused! Reply back "reactivate" anytime and we will turn it back on for you.<br/><br/>Need help with something else? I'm here to assist with any subscription questions you might have.</p>`,
            signature: {
              agentName: "Kai",
              agentTitle: "AI Customer Service Agent",
              companyName: "Human Food Bar",
            },
          }}
        />
      </div>

      {/* What Agent Handles */}
      <WhatAgentHandles agentFeatures={WHAT_AGENT_HANDLES.SUBSCRIPTION_AGENT} />
      {/* How Agent Works */}
      <HowAgentWorks
        agentWorkflowSteps={AGENT_WORKFLOW_STEPS.SUBSCRIPTION_AGENT}
        agentRequiresModeration={isAgentModerated}
      />
    </AiAgentRoot>
  );
};

export default SubscriptionAgentPage;
