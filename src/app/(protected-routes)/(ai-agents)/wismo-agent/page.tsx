"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateSpecificAIAgentSettings } from "@/hooks/services/ai-agents/use-update-specific-ai-agent-settings";
import { useWismoAgentTrackingBanner } from "@/hooks/services/ai-agents/wismo-agent/use-wismo-agent-tracking-banner";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import HowAgentWorks from "@/modules/core/components/ai-agents/components/how-agent-works";
import TestAiAgent from "@/modules/core/components/ai-agents/components/test-ai-agent";
import WhatAgentHandles from "@/modules/core/components/ai-agents/components/what-agent-handles";
import AGENT_WORKFLOW_STEPS from "@/modules/core/components/ai-agents/constants/how-agent-works";
import WHAT_AGENT_HANDLES from "@/modules/core/components/ai-agents/constants/what-agent-handles";
import WoocommerceTrackingConfig from "@/modules/protected-routes/ai-agents/wismo-agent/components/woocommerce-tracking-config";
import { useAiAgents } from "@/providers/ai-agents";
import { Bot, Truck } from "lucide-react";
import { useState } from "react";

const WismoAgentPage = () => {
  const [aiAgentTestQuery, setAiAgentTestQuery] = useState<string>("");
  const {
    aiAgentsSettings: { wismo },
  } = useAiAgents();

  const { updateAIAgentSettings, isUpdating } =
    useUpdateSpecificAIAgentSettings();
  const {
    shouldShowTrackingBanner,
    updateHasTrackingPlugin,
    hasTrackingPlugin,
    setHasTrackingPlugin,
  } = useWismoAgentTrackingBanner();

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
      {shouldShowTrackingBanner && (
        <WoocommerceTrackingConfig
          hasTrackingPlugin={hasTrackingPlugin}
          setHasTrackingPlugin={setHasTrackingPlugin}
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgentSettings
          agentName="WISMO Agent"
          agentIcon={<Bot className="h-5 w-5" />}
          agentDescription="Configure how the WISMO Agent handles order status inquiries"
          enableAgentButtonDescription="Automatically respond to order status and shipping inquiries"
          isAgentEnabled={wismo.isEnabled}
          onChangeAgentConfiguration={() => {
            if (wismo?.isEnabled) {
              updateAIAgentSettings({
                params: {
                  agentId: wismo.id,
                  isEnabled: false,
                  requiresModeration: false,
                },
                onSuccessCallback: () => {
                  updateHasTrackingPlugin(false);
                },
              });
            } else {
              updateAIAgentSettings({
                params: {
                  agentId: wismo.id,
                  isEnabled: true,
                },
                onSuccessCallback: () => {
                  updateHasTrackingPlugin(true);
                },
              });
            }
          }}
          agentNeedsModeration={wismo.requiresModeration}
          onChangeAgentModeration={() =>
            updateAIAgentSettings({
              params: {
                agentId: wismo.id,
                requiresModeration: !wismo.requiresModeration,
              },
            })
          }
          disableAgentSettings={isUpdating || !hasTrackingPlugin}
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
          isActionButtonDisabled={!aiAgentTestQuery.trim()}
          query={aiAgentTestQuery}
          responsePreviewType="ai-agent-test"
        />
      </div>
      {/* What Agent Handles */}
      <WhatAgentHandles agentFeatures={WHAT_AGENT_HANDLES.WISMO_AGENT} />
      {/* How Agent Works */}
      <HowAgentWorks
        agentWorkflowSteps={AGENT_WORKFLOW_STEPS.WISMO_AGENT}
        agentRequiresModeration={wismo.requiresModeration}
      />
    </AiAgentRoot>
  );
};

export default WismoAgentPage;
