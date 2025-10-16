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
        `cursor-pointer transition-all hover:shadow-md md:py-4 md:px-6 p-4`,
        cardColorClassName,
        isCurrentConfiguredMethod && "ring-2 ring-green-500"
      )}
    >
      <CardContent className="p-0">
        <div className="flex items-start gap-3 w-full">
          <MethodIcon className="h-6 w-6 mt-1 hidden md:block" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex sm:items-center sm:justify-between gap-2 flex-col sm:flex-row">
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

            {/* Action buttons when not editing */}
            <div className="pt-3 border-t">
              {!isConfigMethodEnabled || isCurrentConfiguredMethod ? (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-1 sm:gap-2"
                  onClick={onClickConfigMethod}
                >
                  <Settings className="h-4 w-4" />
                  <span className="line-clamp-1">Configure {methodTitle}</span>
                </Button>
              ) : (
                <Button
                  type="button"
                  className="w-full gap-1 sm:gap-2"
                  onClick={onActivateConfigMethod}
                  disabled={areActionButtonsDisabled}
                >
                  <Settings className="h-4 w-4" />
                  <span className="line-clamp-1">
                    {areActionButtonsDisabled
                      ? "Activating..."
                      : `Activate ${methodTitle}`}
                  </span>
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
