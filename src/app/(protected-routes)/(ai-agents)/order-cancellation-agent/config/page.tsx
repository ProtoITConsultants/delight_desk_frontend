"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FULLFILLMENT_METHODS from "@/modules/protected-routes/ai-agents/order-cancellation/components/agent-workflow-card/constants/fullfilement-methods";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import FulfillmentMethodConfigDialog from "@/modules/core/components/ai-agents/components/fulfillment-method-configuration/components/config-dialog";
import FulfillmentMethodConfigCard from "@/modules/core/components/ai-agents/components/fulfillment-method-configuration/components/fulfillment-method-card";
import { isConfigMethodEnabled } from "@/modules/core/utils/order-fulfillment-methods/services/config-method-enabled";
import getConfigMethodStatus from "@/modules/core/utils/order-fulfillment-methods/services/get-config-method-status";
import { FULLFILLMENT_METHODS_TYPES } from "@/modules/core/utils/order-fulfillment-methods/types";
import { useFulfillmentMethodSettings } from "@/hooks/services/ai-agents/use-fulfillment-method-settings";
import { useUpdateFulfillmentMethodSettings } from "@/hooks/services/ai-agents/use-update-fulfillment-method-settings";
import { FulfillmentMethodType } from "@/services/ai-agents/utils/fulfillment-method";
import { Settings } from "lucide-react";
import { useState } from "react";

type CONFIG_DIALOG_DATA = {
  dialogType: FULLFILLMENT_METHODS_TYPES;
  isDialogOpen: boolean;
};

const OrderCancellationAgentConfig = () => {
  const [configDialogData, setConfigDialogData] = useState<CONFIG_DIALOG_DATA>({
    dialogType: "self_fulfillment",
    isDialogOpen: false,
  });

  const {
    fulfillmentMethodSettings,
    isFetchingFulfillmentMethodSettings,
  } = useFulfillmentMethodSettings();
  const { updateFulfillmentMethod, isUpdatingFulfillmentMethod } =
    useUpdateFulfillmentMethodSettings();

  const mapApiMethodToUiMethod = (
    method: FulfillmentMethodType | undefined,
  ): FULLFILLMENT_METHODS_TYPES | "" => {
    switch (method) {
      case FulfillmentMethodType.CUSTOM_WAREHOUSE:
        return "warehouse_email";
      case FulfillmentMethodType.SHIPBOB:
        return "shipbob";
      case FulfillmentMethodType.SELF:
        return "self_fulfillment";
      case FulfillmentMethodType.SHIPSTATION:
        return "shipstation";
      default:
        return "";
    }
  };

  const mapUiMethodToApiPayload = (method: FULLFILLMENT_METHODS_TYPES) => {
    switch (method) {
      case "warehouse_email":
        return fulfillmentMethodSettings?.warehouseEmail
          ? {
              method: FulfillmentMethodType.CUSTOM_WAREHOUSE as const,
              warehouseEmail: fulfillmentMethodSettings.warehouseEmail,
            }
          : null;
      case "shipbob":
        return fulfillmentMethodSettings?.shipbobPersonalAccessToken
          ? {
              method: FulfillmentMethodType.SHIPBOB as const,
              shipbobPersonalAccessToken:
                fulfillmentMethodSettings.shipbobPersonalAccessToken,
            }
          : null;
      case "self_fulfillment":
        return {
          method: FulfillmentMethodType.SELF as const,
        };
      case "shipstation":
        return fulfillmentMethodSettings?.shipstationApiKey
          ? {
              method: FulfillmentMethodType.SHIPSTATION as const,
              shipstationApiKey: fulfillmentMethodSettings.shipstationApiKey,
            }
          : null;
      default:
        return null;
    }
  };

  const currentConfigurationMethod = mapApiMethodToUiMethod(
    fulfillmentMethodSettings?.method,
  );

  const configSettings = {
    warehouseEmailEnabled: Boolean(fulfillmentMethodSettings?.warehouseEmail),
    shipbobEnabled: Boolean(
      fulfillmentMethodSettings?.shipbobPersonalAccessToken,
    ),
    selfFulfillmentEnabled: true,
    shipstationEnabled: Boolean(fulfillmentMethodSettings?.shipstationApiKey),
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
                isConfigMethodEnabled={isEnabled}
                methodConfigStatus={methodConfigStatus}
                onActivateConfigMethod={() => {
                  const payload = mapUiMethodToApiPayload(
                    fulfillmentMethod.id as FULLFILLMENT_METHODS_TYPES,
                  );

                  if (!payload) {
                    setConfigDialogData({
                      dialogType:
                        fulfillmentMethod.id as FULLFILLMENT_METHODS_TYPES,
                      isDialogOpen: true,
                    });
                    return;
                  }

                  updateFulfillmentMethod({
                    params: payload,
                  });
                }}
                onClickConfigMethod={() => {
                  setConfigDialogData({
                    dialogType:
                      fulfillmentMethod.id as FULLFILLMENT_METHODS_TYPES,
                    isDialogOpen: true,
                  });
                }}
                configuredWarehouseEmail={
                  fulfillmentMethodSettings?.warehouseEmail ?? ""
                }
                areActionButtonsDisabled={
                  isFetchingFulfillmentMethodSettings || isUpdatingFulfillmentMethod
                }
              />
            );
          })}
        </CardContent>
      </Card>

      {/* Configuration Dialog */}
      <FulfillmentMethodConfigDialog
        agentType="order_cancellation"
        dialogType={configDialogData.dialogType}
        isDialogOpen={configDialogData.isDialogOpen}
        onOpenChange={(value) => {
          setConfigDialogData({
            ...configDialogData,
            isDialogOpen: value,
          });
        }}
        fulfillmentSettings={fulfillmentMethodSettings}
        isSavingSettings={isUpdatingFulfillmentMethod}
        onSaveFulfillmentSettings={(params, onSuccessCallback) => {
          updateFulfillmentMethod({ params, onSuccessCallback });
        }}
      />
    </AiAgentRoot>
  );
};

export default OrderCancellationAgentConfig;
