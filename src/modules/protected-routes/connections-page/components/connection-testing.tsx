import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StatusIndicator = ({
  hasEmailConnection,
  hasStoreConnection,
}: {
  hasEmailConnection: boolean;
  hasStoreConnection: boolean;
}) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-4">
    <div className="flex items-center gap-2">
      {hasEmailConnection ? (
        <Badge className="bg-green-100 text-green-800 border-green-200 rounded-full">
          <CheckCircle className="w-3 h-3 mr-1" />
          Email Connected
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          className="bg-red-100 text-red-800 border-red-200"
        >
          <AlertCircle className="w-3 h-3 mr-1" />
          No Email Connection
        </Badge>
      )}
    </div>
    <div className="flex items-center gap-2">
      {hasStoreConnection ? (
        <Badge className="bg-green-100 text-green-800 border-green-200 rounded-full">
          <CheckCircle className="w-3 h-3 mr-1" />
          Store Connected
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          className="bg-red-100 text-red-800 border-red-200 rounded-full"
        >
          <AlertCircle className="w-3 h-3 mr-1" />
          No Store Connection
        </Badge>
      )}
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="text-sm text-blue-800">
        <strong>How it works:</strong> We&apos;ll fetch real order data from
        your store, get tracking info from AfterShip, and send a professional
        email to your own inbox so you can see exactly what your customers
        receive.
      </p>
    </div>
  );
};

const ConnectionTesting = () => {
  // Local States
  const [testData, setTestData] = useState({
    orderNumber: "",
    customerEmail: "",
    platform: "" as "woocommerce" | "shopify" | "",
  });

  const hasEmailConnection = true;
  const hasStoreConnection = true;

  const canSendTest = hasEmailConnection && hasStoreConnection;

  const connections = {
    woocommerce: true,
    shopify: true,
  };

  // TODO: Create Send Test Email Mutation
  const handleSendTest = () => {};

  return (
    <Card className="p-4 space-y-4 gap-0 col-span-2">
      {/* Status Indicator - Badges */}
      <StatusIndicator
        hasEmailConnection={hasEmailConnection}
        hasStoreConnection={hasStoreConnection}
      />

      {/* Warning Message - No Connection */}
      {!canSendTest ? (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Setup Required:</strong> Connect both your email account and
            e-commerce store above to test the complete workflow.
          </p>
        </div>
      ) : (
        <>
          {/* How It Works */}
          <HowItWorks />

          {/* Test Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platform">E-commerce Platform</Label>
              <Select
                value={testData.platform}
                onValueChange={(value: "woocommerce" | "shopify") =>
                  setTestData((prev) => ({ ...prev, platform: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {connections?.woocommerce && (
                    <SelectItem value="woocommerce">WooCommerce</SelectItem>
                  )}
                  {connections?.shopify && (
                    <SelectItem value="shopify">Shopify</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order-number">Real Order Number</Label>
              <Input
                id="order-number"
                placeholder="Enter order #"
                value={testData.orderNumber}
                onChange={(e) =>
                  setTestData((prev) => ({
                    ...prev,
                    orderNumber: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* Test Email Form */}
          <div className="space-y-2">
            <Label htmlFor="customer-email">
              Customer Email (from that order)
            </Label>
            <Input
              id="customer-email"
              type="email"
              placeholder="customer@example.com"
              value={testData.customerEmail}
              onChange={(e) =>
                setTestData((prev) => ({
                  ...prev,
                  customerEmail: e.target.value,
                }))
              }
            />
            <p className="text-xs text-gray-500">
              This verifies the order belongs to this email, but the test email
              will be sent to your connected account:{" "}
              {/* {connectedEmailAccounts[0]?.email} */}
              m.babar@protogroup.co
            </p>
          </div>

          {/* Test Email Button */}
          <Button
            onClick={handleSendTest}
            // disabled={sendTestEmailMutation.isPending}
            className="w-full"
          >
            {/* {sendTestEmailMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Test Email...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Test Email
              </>
            )} */}
            Send Test Email
          </Button>
        </>
      )}
    </Card>
  );
};

export default ConnectionTesting;
