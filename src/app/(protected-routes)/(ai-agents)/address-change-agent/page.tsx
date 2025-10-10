"use client";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import EmptyWorkflowCard from "@/modules/core/components/ai-agents/components/agent-workflow-card/components/empty-workflow-card";
import NoFulfillmentMethodConfiguredCard from "@/modules/core/components/ai-agents/components/agent-workflow-card/components/no-fulfillment-method-config-card";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import { Bot, MapPin, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const AddressChangeAgent = () => {
  const [isAgentEnabled, setIsAgentEnabled] = useState(false);
  const [isAgentModerated, setIsAgentModerated] = useState(false);
  const hasSelectedMethod = false;

  return (
    <AiAgentRoot>
      {/* Header */}
      <AiAgentHeader
        Icon={
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <MapPin className="h-6 w-6 text-yellow-500" />
          </div>
        }
        title="Address Change Agent"
        description="Automate and monitor address change workflows."
        hasRightSection={true}
        rightSection={
          <Link href="/address-change-agent/config" className="ui-button">
            <Settings className="h-4 w-4 mr-2" />
            Configuration
          </Link>
        }
      />
      {/* Agent Settings */}
      <AgentSettings
        agentName="Address Change Agent"
        agentIcon={<Bot className="h-5 w-5" />}
        agentDescription="Enable automatic address change handling for incoming customer emails. The agent will process address change requests based on your configured fulfillment method."
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

      {!hasSelectedMethod && (
        <NoFulfillmentMethodConfiguredCard agentType="address-change-agent" />
      )}

      {/* No Workflow Cards */}
      <EmptyWorkflowCard
        workflowType="active-workflow"
        agentType="address-change-agent"
      />
      <EmptyWorkflowCard
        workflowType="completed-workflow"
        agentType="address-change-agent"
      />
    </AiAgentRoot>
  );
};

export default AddressChangeAgent;
