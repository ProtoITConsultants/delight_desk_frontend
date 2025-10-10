import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";
import Link from "next/link";

/**
 * NoFulfillmentMethodConfiguredCard
 *
 * This component is displayed **only when the user has not yet configured a fulfillment method**.
 * Once a fulfillment method is configured, this card should no longer appear.
 *
 * @prop agentType - "order-cancellation-agent" | "address-change-agent"
 */

const NoFulfillmentMethodConfiguredCard = ({
  agentType,
}: {
  agentType: "order-cancellation-agent" | "address-change-agent";
}) => {
  return (
    <Card>
      <CardContent>
        <div className="text-center py-8">
          <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Choose Your Fulfillment Method
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select how you want to handle{" "}
            {agentType === "order-cancellation-agent"
              ? "order cancellations"
              : "address changes"}{" "}
            to get started with automation.
          </p>
          <Link
            href={`${agentType}/config`}
            className="ui-button !bg-primary !text-primary-foreground hover:!bg-primary/90"
          >
            Configure Fulfillment Method
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoFulfillmentMethodConfiguredCard;
