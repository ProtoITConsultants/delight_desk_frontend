import { AlertCircle } from "lucide-react";

const ShipStationConfiguration = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Heading */}
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        ShipStation API Integration
      </h3>
      {/* Configuration Details */}
      <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <span className="font-medium text-yellow-900 dark:text-yellow-100">
            ShipStation Integration Coming Soon
          </span>
        </div>
        <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
          ShipStation API integration is in development. Use ShipBob or
          warehouse email coordination for now.
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Planned Features
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Direct API connection to ShipStation</li>
          <li>• Real-time order status checking</li>
          <li>• Automated shipment cancellation</li>
          <li>• Seamless WooCommerce integration</li>
        </ul>
      </div>
    </div>
  );
};

export default ShipStationConfiguration;
