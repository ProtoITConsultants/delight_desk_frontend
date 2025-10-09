"use client";
import { Card, CardContent } from "@/components/ui/card";
import { FULFILLMENT_METHOD_CARD_PROPS } from "../../utils/types";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const FulfillmentMethodConfigCard = ({
  methodId,
  MethodIcon,
  methodTitle,
  methodDescription,
  methodFeatures,
  cardColorClassName,
  isCurrentConfiguredMethod,
  configuredWarehouseEmail,
  areActionButtonsDisabled,
  isConfigMethodEnabled,
  methodConfigStatus,
  onActivateConfigMethod,
  onClickConfigMethod,
}: FULFILLMENT_METHOD_CARD_PROPS) => {
  return (
    <Card
      className={cn(
        `cursor-pointer transition-all hover:shadow-md py-4 px-6`,
        cardColorClassName,
        isCurrentConfiguredMethod && "ring-2 ring-green-500"
      )}
    >
      <CardContent className="p-0">
        <div className="flex items-start gap-3">
          <MethodIcon className="h-6 w-6 mt-1" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{methodTitle}</h3>
              <Badge
                variant={
                  methodConfigStatus === "Active" ? "default" : "secondary"
                }
                className="text-xs"
              >
                {methodConfigStatus}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {methodDescription}
            </p>

            {/* Show current configuration */}
            {isCurrentConfiguredMethod &&
              methodId === "warehouse_email" &&
              configuredWarehouseEmail && (
                <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
                  <span className="font-medium">Warehouse Email:</span>{" "}
                  {configuredWarehouseEmail}
                </div>
              )}
            <ul className="text-xs flex flex-col gap-1">
              {methodFeatures.map((feature, index) => (
                <li
                  key={`${methodId}-feature-${index}`}
                  className="flex items-center"
                >
                  <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            {/* Configuration interface when editing */}
            {/* {isEditingMethod === method.id && (
              <div className="mt-3 pt-3 border-t space-y-3">
                {method.id === "warehouse_email" && (
                  <div>
                    <Label htmlFor="warehouse-email">
                      Warehouse Email Address
                    </Label>
                    <Input
                      id="warehouse-email"
                      type="email"
                      placeholder="warehouse@company.com"
                      value={editingValues.warehouseEmail || ""}
                      onChange={(e) =>
                        setEditingValues({
                          ...editingValues,
                          warehouseEmail: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                )}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={handleSaveConfiguration}
                    disabled={updateMethodConfigMutation.isPending}
                    className="flex-1"
                  >
                    {updateMethodConfigMutation.isPending
                      ? "Saving..."
                      : "Save"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )} */}

            {/* Action buttons when not editing */}
            <div className="mt-3 pt-3 border-t">
              {!isConfigMethodEnabled || isCurrentConfiguredMethod ? (
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={onClickConfigMethod}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configure {methodTitle}
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  className="w-full"
                  onClick={onActivateConfigMethod}
                  disabled={areActionButtonsDisabled}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {areActionButtonsDisabled
                    ? "Activating..."
                    : `Activate ${methodTitle}`}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FulfillmentMethodConfigCard;
