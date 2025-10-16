import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ShipbobConfiguration = () => {
  const connectionEstablished = false; // Replace with actual connection status

  return (
    <div className="flex flex-col gap-4">
      {/* Heading */}
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        ShipBob API Integration
      </h3>
      {/* Connection Button / Status */}
      {connectionEstablished ? (
        // Success Message
        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900 dark:text-green-100">
              ShipBob Connected Successfully
            </span>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
            Your ShipBob integration is active and ready for automated order
            cancellations.
          </p>
        </div>
      ) : (
        // Connect Button
        <div className="space-y-3">
          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Connect your ShipBob account to enable automated order
              cancellations through their API.
            </p>
          </div>

          <Button onClick={() => {}} className="w-full">
            Connect to ShipBob
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShipbobConfiguration;
