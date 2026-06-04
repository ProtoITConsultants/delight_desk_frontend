import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings2 } from "lucide-react";
import { FC } from "react";
import WooCommerceTrackingAlert from "./alert-message";
import WoocommerceTrackingPluginQuestion from "./traking-plugin-question";
import { WoocommerceTrackingProps } from "../../types";

const WoocommerceTrackingConfig: FC<WoocommerceTrackingProps> = ({
  hasTrackingPlugin,
  setHasTrackingPlugin,
}) => {
  return (
    <Card className="border-2 border-blue-200 bg-blue-50/30">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-600">
          <Settings2 className="h-5 w-5" />
          <span>WooCommerce Tracking Setup</span>
        </CardTitle>
        <CardDescription>
          Configure how order tracking notifications are handled in your
          WooCommerce store
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tracking Plugin Requirement Alert */}
        <WooCommerceTrackingAlert />
        {/* Woocommerce Tracking Plugin Question */}
        <WoocommerceTrackingPluginQuestion
          hasTrackingPlugin={hasTrackingPlugin}
          setHasTrackingPlugin={setHasTrackingPlugin}
        />
      </CardContent>
    </Card>
  );
};

export default WoocommerceTrackingConfig;
