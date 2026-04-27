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
import { useAddressChangeWorkflowProgress } from "@/hooks/services/approval-queue/use-agent-workflow-progress";
import { useFulfillmentMethodSettings } from "@/hooks/services/ai-agents/use-fulfillment-method-settings";
import { isFulfillmentMethodIntegrated } from "@/modules/protected-routes/ai-agents/common/utils/is-fulfillment-method-integrated";
import {
  buildAddressChangeActiveCardProps,
  buildAddressChangeCompletedCardProps,
} from "@/modules/protected-routes/ai-agents/address-change/utils/build-workflow-card-props";

const AddressChangeAgent = () => {
  const {
    aiAgentsSettings: { address_change },
  } = useAiAgents();
  const { updateAIAgentSettings, isUpdating } =
    useUpdateSpecificAIAgentSettings();

  const { fulfillmentMethodSettings } = useFulfillmentMethodSettings();
  const hasIntegratedFulfillmentMethod = isFulfillmentMethodIntegrated(
    fulfillmentMethodSettings,
  );

  const { activeItems, completedItems, isLoading, refetch } =
    useAddressChangeWorkflowProgress();

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

      <AgentWorkflowRoot
        workflowType="active"
        sectionHeading="Active Workflows"
        activeWorkflowsCount={activeItems.length}
        onRefresh={() => {
          void refetch();
        }}
      >
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading workflows…</p>
        ) : activeItems.length === 0 ? (
          <EmptyWorkflowCard
            workflowType="active-workflow"
            agentType="address-change-agent"
          />
        ) : (
          activeItems.map((item) => (
            <AddressChangeWorkflowCard
              key={item.id}
              {...buildAddressChangeActiveCardProps(item)}
            />
          ))
        )}
      </AgentWorkflowRoot>

      <AgentWorkflowRoot
        workflowType="recently-completed"
        sectionHeading="Recently Completed Workflows"
      >
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading workflows…</p>
        ) : completedItems.length === 0 ? (
          <EmptyWorkflowCard
            workflowType="completed-workflow"
            agentType="address-change-agent"
          />
        ) : (
          completedItems.map((item) => (
            <AddressChangeWorkflowCard
              key={item.id}
              {...buildAddressChangeCompletedCardProps(item)}
            />
          ))
        )}
      </AgentWorkflowRoot>

      {!hasIntegratedFulfillmentMethod && (
        <NoFulfillmentMethodConfiguredCard agentType="address-change-agent" />
      )}
    </AiAgentRoot>
  );
};

export default AddressChangeAgent;
