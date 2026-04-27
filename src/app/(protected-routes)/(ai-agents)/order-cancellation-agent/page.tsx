"use client";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import EmptyWorkflowCard from "@/modules/core/components/ai-agents/components/empty-workflow-card";
import NoFulfillmentMethodConfiguredCard from "@/modules/core/components/ai-agents/components/no-fulfillment-method-config-card";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import AgentWorkflowRoot from "@/modules/protected-routes/ai-agents/common/components/agent-workflow-root";
import { Bot, Package, Settings } from "lucide-react";
import Link from "next/link";
import OrderCancellationAgentWorkflowCard from "@/modules/protected-routes/ai-agents/order-cancellation/components/agent-workflow-card";
import { useAiAgents } from "@/providers/ai-agents";
import { useUpdateSpecificAIAgentSettings } from "@/hooks/services/ai-agents/use-update-specific-ai-agent-settings";
import { useOrderCancellationWorkflowProgress } from "@/hooks/services/approval-queue/use-order-cancellation-workflow-progress";
import { useFulfillmentMethodSettings } from "@/hooks/services/ai-agents/use-fulfillment-method-settings";
import { isFulfillmentMethodIntegrated } from "@/modules/protected-routes/ai-agents/order-cancellation/utils/is-fulfillment-method-integrated";
import {
  buildOrderCancellationActiveCardProps,
  buildOrderCancellationCompletedCardProps,
} from "@/modules/protected-routes/ai-agents/order-cancellation/utils/build-workflow-card-props";

const OrderCancellationAgent = () => {
  const {
    aiAgentsSettings: { order_cancellation },
  } = useAiAgents();
  const { updateAIAgentSettings, isUpdating } =
    useUpdateSpecificAIAgentSettings();

  const { fulfillmentMethodSettings } = useFulfillmentMethodSettings();
  const hasIntegratedFulfillmentMethod = isFulfillmentMethodIntegrated(
    fulfillmentMethodSettings,
  );

  const { activeItems, completedItems, isLoading, refetch } =
    useOrderCancellationWorkflowProgress();

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
        agentName="Order Cancellation Agent"
        agentIcon={<Bot className="h-5 w-5" />}
        agentDescription="Enable automatic order cancellation handling for incoming customer emails. The agent will process cancellation requests based on your configured fulfillment method."
        enableAgentButtonDescription="Process order cancellation requests automatically."
        isAgentEnabled={order_cancellation.isEnabled}
        onChangeAgentConfiguration={() => {
          if (order_cancellation?.isEnabled) {
            updateAIAgentSettings({
              params: {
                agentId: order_cancellation.id,
                isEnabled: false,
                requiresModeration: false,
              },
            });
          } else {
            updateAIAgentSettings({
              params: {
                agentId: order_cancellation.id,
                isEnabled: true,
              },
            });
          }
        }}
        agentNeedsModeration={order_cancellation.requiresModeration}
        onChangeAgentModeration={() =>
          updateAIAgentSettings({
            params: {
              agentId: order_cancellation.id,
              requiresModeration: !order_cancellation.requiresModeration,
            },
          })
        }
        disableAgentSettings={isUpdating}
      />
      {/* Active Workflows Section */}
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
            agentType="order-cancellation-agent"
          />
        ) : (
          activeItems.map((item) => (
            <OrderCancellationAgentWorkflowCard
              key={item.id}
              {...buildOrderCancellationActiveCardProps(item)}
            />
          ))
        )}
      </AgentWorkflowRoot>

      {/* Recently Completed Workflows Section */}
      <AgentWorkflowRoot
        workflowType="recently-completed"
        sectionHeading="Recently Completed Workflows"
      >
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading workflows…</p>
        ) : completedItems.length === 0 ? (
          <EmptyWorkflowCard
            workflowType="completed-workflow"
            agentType="order-cancellation-agent"
          />
        ) : (
          completedItems.map((item) => (
            <OrderCancellationAgentWorkflowCard
              key={item.id}
              {...buildOrderCancellationCompletedCardProps(item)}
            />
          ))
        )}
      </AgentWorkflowRoot>

      {!hasIntegratedFulfillmentMethod && (
        <NoFulfillmentMethodConfiguredCard agentType="order-cancellation-agent" />
      )}
    </AiAgentRoot>
  );
};

export default OrderCancellationAgent;
