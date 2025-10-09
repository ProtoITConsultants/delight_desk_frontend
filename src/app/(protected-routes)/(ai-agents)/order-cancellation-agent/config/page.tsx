"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FULLFILLMENT_METHODS from "@/modules/core/components/ai-agents/components/agent-workflow-card/constants/fullfilement-methods";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import FulfillmentMethodConfigCard from "@/modules/core/components/ai-agents/components/fulfillment-method-configuration/components/fulfillment-method-card";
import { isConfigMethodEnabled } from "@/modules/core/utils/order-fulfillment-methods/services/config-method-enabled";
import getConfigMethodStatus from "@/modules/core/utils/order-fulfillment-methods/services/get-config-method-status";
import { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";
import { Settings } from "lucide-react";
import { useState } from "react";

const OrderCancellationAgentConfig = () => {
  const [currentConfigurationMethod, setCurrentConfigurationMethod] = useState<
    FULLFILLMENT_METHODS_TYPES | ""
  >("");

  const configSettings = {
    warehouseEmailEnabled: true,
    shipbobEnabled: false,
    selfFulfillmentEnabled: false,
    shipstationEnabled: true,
  };

  return (
    <AiAgentRoot>
      {/* Configuration Header */}
      <AiAgentHeader
        Icon={
          <div className="p-2 bg-gray-500/10 rounded-lg">
            <Settings className="h-6 w-6 text-gray-500" />
          </div>
        }
        title="Fulfillment Method Configuration"
        description="Choose how you want to handle order cancellation requests. Once selected, this will run in the background."
      />
      {/* Body */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Choose Your Fulfillment Method
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select how you want to handle order cancellations to get started
            with automation.
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {FULLFILLMENT_METHODS.map((fulfillmentMethod) => {
            const MethodIcon = fulfillmentMethod.icon;
            const isCurrentConfiguredMethod =
              currentConfigurationMethod === fulfillmentMethod.id;
            const isEnabled = isConfigMethodEnabled({
              methodId: fulfillmentMethod.id as FULLFILLMENT_METHODS_TYPES,
              configSettings,
            });

            const methodConfigStatus = getConfigMethodStatus({
              isCurrent: isCurrentConfiguredMethod,
              isEnabled,
            });
            return (
              <FulfillmentMethodConfigCard
                key={fulfillmentMethod.id}
                methodId={fulfillmentMethod.id}
                MethodIcon={MethodIcon}
                methodTitle={fulfillmentMethod.title}
                methodDescription={fulfillmentMethod.description}
                methodFeatures={fulfillmentMethod.features}
                cardColorClassName={fulfillmentMethod.color}
                isCurrentConfiguredMethod={isCurrentConfiguredMethod}
                areActionButtonsDisabled={false}
                isConfigMethodEnabled={isEnabled}
                methodConfigStatus={methodConfigStatus}
                onActivateConfigMethod={() => {
                  setCurrentConfigurationMethod(
                    fulfillmentMethod.id as FULLFILLMENT_METHODS_TYPES
                  );
                }}
                onClickConfigMethod={() => {}}
              />
            );
          })}
        </CardContent>
      </Card>

      {/* Configuration Dialogs */}
    </AiAgentRoot>
  );
};

export default OrderCancellationAgentConfig;
