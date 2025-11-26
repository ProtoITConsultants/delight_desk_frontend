import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAddWooCommerceStoreConnectionThroughSecrets } from "@/hooks/services/connections/woocommerce/add-store-connection/use-add-woocommerce-store-connection";
import { api } from "@/lib/api";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
// import { TimezoneSelect } from "../timezone-select";

type WooCommerceConnectionModalProps = {
  isModalOpen: boolean;
  onCloseModal: () => void;
};

const WooCommerceConnectionModal = ({
  isModalOpen,
  onCloseModal,
}: WooCommerceConnectionModalProps) => {
  // Hooks
  const { connectWooCommerceStore, isConnectingWooCommerceStore } =
    useAddWooCommerceStoreConnectionThroughSecrets();

  const [wooConnectionMethod, setWooConnectionMethod] = useState("oauth");
  const [wooCommerceStoreURL, setWooCommerceStoreURL] = useState("");
  const [wooApiKey, setWooApiKey] = useState("");
  const [wooApiSecret, setWooApiSecret] = useState("");
  // const [wooTimezone, setWooTimezone] = useState("America/New_York");
  // const timezoneDetected = false;

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onCloseModal()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect WooCommerce Store</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Store URL - always required */}
          <div className="space-y-2 border-t pt-4">
            <Label htmlFor="store-url">Store URL</Label>
            <Input
              id="store-url"
              placeholder="https://your-store.com"
              value={wooCommerceStoreURL}
              onChange={(e) => setWooCommerceStoreURL(e.target.value)}
              className="h-10"
            />
            <p className="text-xs text-gray-500">
              Enter your WooCommerce store URL (e.g., yourstore.com)
            </p>
          </div>

          {/* Timezone Select */}
          {/* <TimezoneSelect
            label="Store Timezone"
            value={wooTimezone}
            onValueChange={setWooTimezone}
            required
            description={
              timezoneDetected
                ? "Auto-detected from your WooCommerce store"
                : "Used for accurate order processing and delivery predictions"
            }
          /> */}

          {/* Connection Method Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Connection Method</Label>
            <RadioGroup
              value={wooConnectionMethod}
              onValueChange={(value: "oauth" | "api_key") =>
                setWooConnectionMethod(value)
              }
            >
              <div className="space-y-3">
                {/* OAuth Option - Now First */}
                <div
                  className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setWooConnectionMethod("oauth")}
                >
                  <RadioGroupItem value="oauth" id="oauth" className="mt-1" />
                  <div className="flex-1">
                    <Label
                      htmlFor="oauth"
                      className="font-medium cursor-pointer"
                    >
                      Direct Authentication
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      One-click secure connection. Works for most WooCommerce
                      stores.
                    </p>
                  </div>
                </div>

                {/* API Key Option */}
                <div
                  className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setWooConnectionMethod("api_key")}
                >
                  <RadioGroupItem
                    value="api_key"
                    id="api_key"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="api_key"
                      className="font-medium cursor-pointer"
                    >
                      API Key Authentication
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Fallback option using WooCommerce REST API credentials if
                      direct authentication has issues with your site.
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* API Key Fields */}
          {wooConnectionMethod === "api_key" && (
            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="woo-key">Consumer Key</Label>
                <Input
                  id="woo-key"
                  placeholder="ck_..."
                  value={wooApiKey}
                  onChange={(e) => setWooApiKey(e.target.value)}
                  data-testid="input-consumer-key"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="woo-secret">Consumer Secret</Label>
                <Input
                  id="woo-secret"
                  placeholder="cs_..."
                  type="password"
                  value={wooApiSecret}
                  onChange={(e) => setWooApiSecret(e.target.value)}
                  data-testid="input-consumer-secret"
                  className="h-10"
                />
              </div>
              <p className="text-xs text-gray-500 -mt-2">
                Get your API credentials from WooCommerce Settings → Advanced →
                REST API. Set permissions to Read/Write.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => onCloseModal()}
              className="w-full"
              disabled={isConnectingWooCommerceStore}
            >
              Cancel
            </Button>
            {wooConnectionMethod === "oauth" ? (
              <Button
                onClick={() =>
                  api.user_connections.addWooCommerceConnectionThroughOAuth({
                    storeUrl: wooCommerceStoreURL,
                  })
                }
                className="w-full"
                disabled={!wooCommerceStoreURL.trim()}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect with OAuth
              </Button>
            ) : (
              <Button
                onClick={() =>
                  connectWooCommerceStore({
                    storeUrl: wooCommerceStoreURL,
                    consumerKey: wooApiKey,
                    consumerSecret: wooApiSecret,
                  })
                }
                className="w-full"
                disabled={
                  !wooApiKey.trim() ||
                  !wooApiSecret.trim() ||
                  !wooCommerceStoreURL.trim() ||
                  isConnectingWooCommerceStore
                }
              >
                Connect with API Key
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WooCommerceConnectionModal;
