"use client";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import EmptyWorkflowCard from "@/modules/core/components/ai-agents/components/empty-workflow-card";
import NoFulfillmentMethodConfiguredCard from "@/modules/core/components/ai-agents/components/no-fulfillment-method-config-card";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import AddressChangeWorkflowCard from "@/modules/protected-routes/ai-agents/address-change/components/agent-workflow-card";
import AgentWorkflowRoot from "@/modules/protected-routes/ai-agents/common/components/agent-workflow-root";
import { Bot, MapPin, Settings } from "lucide-react";
import Link from "next/link";
import { useUpdateSpecificAIAgentSettings } from "@/hooks/services/ai-agents/use-update-specific-ai-agent-settings";
import { useAiAgents } from "@/providers/ai-agents";

const AddressChangeAgent = () => {
  const {
    aiAgentsSettings: { address_change },
  } = useAiAgents();
  const { updateAIAgentSettings, isUpdating } =
    useUpdateSpecificAIAgentSettings();
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
        enableAgentButtonDescription="Process address change requests automatically."
        isAgentEnabled={address_change.isEnabled}
        onChangeAgentConfiguration={() => {
          if (address_change?.isEnabled) {
            updateAIAgentSettings({
              params: {
                agentId: address_change.id,
                isEnabled: false,
                requiresModeration: false,
              },
            });
          } else {
            updateAIAgentSettings({
              params: {
                agentId: address_change.id,
                isEnabled: true,
              },
            });
          }
        }}
        agentNeedsModeration={address_change.requiresModeration}
        onChangeAgentModeration={() =>
          updateAIAgentSettings({
            params: {
              agentId: address_change.id,
              requiresModeration: !address_change.requiresModeration,
            },
          })
        }
        disableAgentSettings={isUpdating}
      />

      {/* Active Workflows Card */}
      <AgentWorkflowRoot
        workflowType="active"
        sectionHeading="Active Workflows"
        activeWorkflowsCount={2}
        onRefresh={() => {}}
      >
        <AddressChangeWorkflowCard
          workflowId="1"
          workflowStatus="processing"
          fulfillmentMethod="warehouse_email"
          orderNumber="WC-78901"
          customerEmail="michael.johnson@example.com"
          createdAt="12 Feb 2024"
        />
        <AddressChangeWorkflowCard
          workflowId="2"
          workflowStatus="awaiting_warehouse"
          fulfillmentMethod="self_fulfillment"
          orderNumber="WC-78901"
          customerEmail="remy@humanfoodbar.com"
          createdAt="12 June 2025"
        />
        <AddressChangeWorkflowCard
          workflowId="3"
          workflowStatus="failed"
          fulfillmentMethod="self_fulfillment"
          orderNumber="WC-78901"
          customerEmail="remy@humanfoodbar.com"
          createdAt="12 June 2025"
        />
      </AgentWorkflowRoot>

      {/* Recently Completed Workflows Section */}
      <AgentWorkflowRoot
        workflowType="recently-completed"
        sectionHeading="Recently Completed Workflows"
      >
        <AddressChangeWorkflowCard
          workflowId="4"
          workflowStatus="completed"
          fulfillmentMethod="shipbob"
          orderNumber="WC-78901"
          customerEmail="lisa.wang@example.com"
          createdAt="02 Mar 2025"
          addressChanged={true}
          newAddress="123 New St, New City, NY 10001"
        />
        <AddressChangeWorkflowCard
          workflowId="5"
          workflowStatus="completed"
          fulfillmentMethod="shipbob"
          orderNumber="WC-78901"
          customerEmail="lisa.wang@example.com"
          createdAt="02 Mar 2025"
          addressChanged={true}
          newAddress="123 New St, New City, NY 10001"
        />
        <AddressChangeWorkflowCard
          workflowId="6"
          workflowStatus="completed"
          fulfillmentMethod="shipstation"
          orderNumber="WC-78901"
          customerEmail="customer@example.com"
          createdAt="12 Sep 2025"
          addressChanged={false}
          failingReason="Order placed outside address change eligibility window."
        />
      </AgentWorkflowRoot>

      {/* No Fulfillment Method Card */}
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
