"use client";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import HowAgentWorks from "@/modules/core/components/ai-agents/components/how-agent-works";
import WhatAgentHandles from "@/modules/core/components/ai-agents/components/what-agent-handles";
import AGENT_WORKFLOW_STEPS from "@/modules/core/components/ai-agents/constants/how-agent-works";
import WHAT_AGENT_HANDLES from "@/modules/core/components/ai-agents/constants/what-agent-handles";
import { Bot, Truck } from "lucide-react";
import { useState } from "react";

const WismoAgentPage = () => {
  const [isAgentEnabled, setIsAgentEnabled] = useState(false);
  const [isAgentModerated, setIsAgentModerated] = useState(false);

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
