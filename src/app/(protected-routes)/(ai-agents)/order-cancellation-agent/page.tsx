"use client";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import { Bot, Package, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const OrderCancellationAgent = () => {
  const [isAgentEnabled, setIsAgentEnabled] = useState(false);
  const [isAgentModerated, setIsAgentModerated] = useState(false);
  return (
    <AiAgentRoot>
      {/* Header */}
      <AiAgentHeader
        Icon={
          <div className="p-2 bg-red-500/10 rounded-lg">
            <Package className="h-6 w-6 text-red-500" />
          </div>
        }
        title="Order Cancellation Agent"
        description="Automate and monitor order cancellation workflows."
        hasRightSection={true}
        rightSection={
          <Link href="/order-cancellation-agent/config" className="ui-button">
            <Settings className="h-4 w-4 mr-2" />
            Configuration
          </Link>
        }
      />
      {/* Agent Settings */}
      <AgentSettings
        agentName="Product Agent"
        agentIcon={<Bot className="h-5 w-5" />}
        agentDescription="Enable automatic order cancellation handling for incoming customer emails. The agent will process cancellation requests based on your configured fulfillment method."
        enableAgentButtonDescription="Process order cancellation requests automatically."
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
    </AiAgentRoot>
  );
};

export default OrderCancellationAgent;
