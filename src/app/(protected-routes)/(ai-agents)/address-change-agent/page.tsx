"use client";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import EmptyWorkflowCard from "@/modules/core/components/ai-agents/components/agent-workflow-card/order-cancellation-agent/components/empty-workflow-card";
import NoFulfillmentMethodConfiguredCard from "@/modules/core/components/ai-agents/components/agent-workflow-card/order-cancellation-agent/components/no-fulfillment-method-config-card";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import AddressChangeWorkflowCard from "@/modules/protected-routes/ai-agents/address-change/components/agent-workflow-card";
import AgentWorkflowRoot from "@/modules/protected-routes/ai-agents/common/components/agent-workflow-root";
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
          workflowCancelled={false}
        />
        <AddressChangeWorkflowCard
          workflowId="2"
          workflowStatus="awaiting_warehouse"
          fulfillmentMethod="self_fulfillment"
          orderNumber="WC-78901"
          customerEmail="remy@humanfoodbar.com"
          createdAt="12 June 2025"
          workflowCancelled={false}
        />
        <AddressChangeWorkflowCard
          workflowId="3"
          workflowStatus="failed"
          fulfillmentMethod="self_fulfillment"
          orderNumber="WC-78901"
          customerEmail="remy@humanfoodbar.com"
          createdAt="12 June 2025"
          workflowCancelled={false}
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
          workflowCancelled={true}
          refundProcessed={true}
          refundAmount={12.99}
        />
        <AddressChangeWorkflowCard
          workflowId="5"
          workflowStatus="completed"
          fulfillmentMethod="shipbob"
          orderNumber="WC-78901"
          customerEmail="lisa.wang@example.com"
          createdAt="02 Mar 2025"
          workflowCancelled={true}
        />
        <AddressChangeWorkflowCard
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
