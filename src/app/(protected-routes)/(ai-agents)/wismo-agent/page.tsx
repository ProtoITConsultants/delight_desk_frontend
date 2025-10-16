"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import HowAgentWorks from "@/modules/core/components/ai-agents/components/how-agent-works";
import TestAiAgent from "@/modules/core/components/ai-agents/components/test-ai-agent";
import WhatAgentHandles from "@/modules/core/components/ai-agents/components/what-agent-handles";
import AGENT_WORKFLOW_STEPS from "@/modules/core/components/ai-agents/constants/how-agent-works";
import WHAT_AGENT_HANDLES from "@/modules/core/components/ai-agents/constants/what-agent-handles";
import { Bot, Truck } from "lucide-react";
import { useState } from "react";

const WismoAgentPage = () => {
  const [isAgentEnabled, setIsAgentEnabled] = useState(false);
  const [isAgentModerated, setIsAgentModerated] = useState(false);
  const [aiAgentTestQuery, setAiAgentTestQuery] = useState<string>("");

  return (
    <AiAgentRoot>
      {/* Header */}
      <AiAgentHeader
        Icon={
          <div className="p-2 bg-blue-100 rounded-lg">
            <Truck className="h-6 w-6 text-blue-600" />
          </div>
        }
        title="WISMO Agent"
        description="Where Is My Order - Automate order status and shipping inquiries"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgentSettings
          agentName="WISMO Agent"
          agentIcon={<Bot className="h-5 w-5" />}
          agentDescription="Configure how the WISMO Agent handles order status inquiries"
          enableAgentButtonDescription="Automatically respond to order status and shipping inquiries"
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
        />
        {/* Test AI Agent - Interactive Agent Preview */}
        <TestAiAgent
          instructions="Enter a real order number or email address to see how your WISMO Agent responds with actual order data"
          InputField={
            <div className="flex flex-col gap-2">
              <Label>Order Number or Email Address</Label>
              <Input
                value={aiAgentTestQuery}
                onChange={(e) => setAiAgentTestQuery(e.target.value)}
                placeholder="Enter order number (e.g., 12345) or email address (e.g., customer@email.com)"
              />
              <p className="text-xs text-muted-foreground">
                ⚠️ This demo requires a real order from your WooCommerce store
                to function properly
              </p>
            </div>
          }
          onActionButtonClick={() => {}}
          isActionButtonDisabled={!aiAgentTestQuery.trim()}
          isGeneratingResponse={false}
          emailResponse={{
            type: "ai-agent-test",
            fromEmail: "hello@humanfoodbar.com",
            subject: "Re: Order Status",
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
      <WhatAgentHandles agentFeatures={WHAT_AGENT_HANDLES.WISMO_AGENT} />
      {/* How Agent Works */}
      <HowAgentWorks
        agentWorkflowSteps={AGENT_WORKFLOW_STEPS.WISMO_AGENT}
        agentRequiresModeration={isAgentModerated}
      />
    </AiAgentRoot>
  );
};

export default WismoAgentPage;
