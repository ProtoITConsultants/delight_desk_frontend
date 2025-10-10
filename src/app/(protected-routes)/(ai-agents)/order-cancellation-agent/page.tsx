"use client";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import EmptyWorkflowCard from "@/modules/core/components/ai-agents/components/empty-workflow-card";
import NoFulfillmentMethodConfiguredCard from "@/modules/core/components/ai-agents/components/no-fulfillment-method-config-card";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import AgentWorkflowRoot from "@/modules/protected-routes/ai-agents/common/components/agent-workflow-root";
import { Bot, Package, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import OrderCancellationAgentWorkflowCard from "@/modules/protected-routes/ai-agents/order-cancellation/components/agent-workflow-card";

const OrderCancellationAgent = () => {
  const [isAgentEnabled, setIsAgentEnabled] = useState(false);
  const [isAgentModerated, setIsAgentModerated] = useState(false);

  const hasSelectedMethod = false;

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
      {/* Active Workflows Section */}
      <AgentWorkflowRoot
        workflowType="active"
        sectionHeading="Active Workflows"
        activeWorkflowsCount={2}
        onRefresh={() => {}}
      >
        <OrderCancellationAgentWorkflowCard
          workflowId="1"
          workflowStatus="processing"
          fulfillmentMethod="warehouse_email"
          orderNumber="WC-78901"
          customerEmail="michael.johnson@example.com"
          createdAt="12 Feb 2024"
        />
        <OrderCancellationAgentWorkflowCard
          workflowId="2"
          workflowStatus="awaiting_warehouse"
          fulfillmentMethod="self_fulfillment"
          orderNumber="WC-78901"
          customerEmail="remy@humanfoodbar.com"
          createdAt="12 June 2025"
        />
        <OrderCancellationAgentWorkflowCard
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
        <OrderCancellationAgentWorkflowCard
          workflowId="4"
          workflowStatus="completed"
          fulfillmentMethod="shipbob"
          orderNumber="WC-78901"
          customerEmail="lisa.wang@example.com"
          createdAt="02 Mar 2025"
          workflowCancelled={true}
          refundProcessed={true}
          refundAmount={12.99}
        />
        <OrderCancellationAgentWorkflowCard
          workflowId="5"
          workflowStatus="completed"
          fulfillmentMethod="shipbob"
          orderNumber="WC-78901"
          customerEmail="lisa.wang@example.com"
          createdAt="02 Mar 2025"
          workflowCancelled={true}
          refundProcessed={false}
        />
        <OrderCancellationAgentWorkflowCard
          workflowId="6"
          workflowStatus="completed"
          fulfillmentMethod="shipstation"
          orderNumber="WC-78901"
          customerEmail="customer@example.com"
          createdAt="12 Sep 2025"
          workflowCancelled={false}
          failingReason="Warehouse response: Order WC-54789 has already been picked and packed for shipment. Unfortunately we cannot cancel this order as it is currently being loaded onto the delivery truck. The customer will need to initiate a return once they receive the package."
        />
      </AgentWorkflowRoot>

      {!hasSelectedMethod && (
        <NoFulfillmentMethodConfiguredCard agentType="order-cancellation-agent" />
      )}

      {/* No Workflow Cards */}
      <EmptyWorkflowCard
        workflowType="active-workflow"
        agentType="order-cancellation-agent"
      />
      <EmptyWorkflowCard
        workflowType="completed-workflow"
        agentType="order-cancellation-agent"
      />
    </AiAgentRoot>
  );
};

export default OrderCancellationAgent;
