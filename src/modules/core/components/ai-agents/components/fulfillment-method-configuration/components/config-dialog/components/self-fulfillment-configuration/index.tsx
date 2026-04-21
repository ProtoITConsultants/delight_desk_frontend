import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FulfillmentMethodType,
  UpdateFulfillmentMethodSettingsParams,
} from "@/services/ai-agents/utils/fulfillment-method";

type SelfFulFillmentMethodConfigurationProps = {
  isSavingSettings: boolean;
  onSuccessSave: () => void;
  onSaveFulfillmentSettings: (
    params: UpdateFulfillmentMethodSettingsParams,
    onSuccess?: () => void,
  ) => void;
};

const SelfFulFillmentMethodConfiguration = ({
  isSavingSettings,
  onSaveFulfillmentSettings,
  onSuccessSave,
}: SelfFulFillmentMethodConfigurationProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Heading */}
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        Self-Fulfillment Configuration
      </h3>
      {/* Connection Details */}
      <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="font-medium text-green-900 dark:text-green-100">
            Self-Fulfillment Ready
          </span>
        </div>
        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
          Your self-fulfillment setup is configured and ready for automated
          order cancellations.
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Configuration Summary
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Automated cancellation for unfulfilled orders</li>
          <li>• Instant refund processing through WooCommerce</li>
          <li>• Real-time order status updates</li>
          <li>• Professional customer communication</li>
        </ul>
      </div>
      <Button
        onClick={() => {
          onSaveFulfillmentSettings(
            { method: FulfillmentMethodType.SELF },
            onSuccessSave,
          );
        }}
        disabled={isSavingSettings}
        className="w-full"
      >
        {isSavingSettings ? "Saving..." : "Set as Active Method"}
      </Button>
    </div>
  );
};

export default SelfFulFillmentMethodConfiguration;
