import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import React from "react";

const WooCommerceTrackingAlert = () => {
  return (
    <Alert variant="default" className="bg-amber-50 border-amber-200">
      <AlertTriangle className="h-4 w-4 !text-amber-600" />
      <AlertTitle className="text-amber-600">
        Important: Tracking Numbers Required
      </AlertTitle>
      <AlertDescription className="text-amber-600">
        To use the WISMO agent, you must have carrier tracking numbers being
        pushed into WooCommerce via a plugin such as ShipStation, ShipBob,
        AfterShip, or similar. Without tracking numbers in WooCommerce, the
        WISMO agent cannot provide order tracking information to customers.
      </AlertDescription>
    </Alert>
  );
};

export default WooCommerceTrackingAlert;
