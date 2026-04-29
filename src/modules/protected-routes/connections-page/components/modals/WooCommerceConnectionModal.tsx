"use client";

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
import { useAddWooCommerceStoreConnectionThroughOAuth } from "@/hooks/services/connections/woocommerce/add-store-connection-with-oauth/use-add-store-connection-with-oauth";
import { useAddWooCommerceStoreConnectionThroughSecrets } from "@/hooks/services/connections/woocommerce/add-store-connection/use-add-woocommerce-store-connection";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

import WooCommerceOAuthTroubleshootDialog from "./WooCommerceOAuthTroubleshootDialog";
import {
  clearWooCommerceOAuthAttempt,
  formatStoreUrlForDisplay,
  getWooCommerceOAuthAttempt,
  setWooCommerceOAuthAttempt,
} from "../../utils/woocommerce-oauth-attempt-storage";
// import { TimezoneSelect } from "../timezone-select";

type WooCommerceConnectionModalProps = {
  isModalOpen: boolean;
  onCloseModal: () => void;
  isWooCommerceConnected: boolean;
};

const WooCommerceConnectionModal = ({
  isModalOpen,
  onCloseModal,
  isWooCommerceConnected,
}: WooCommerceConnectionModalProps) => {
  // Hooks
  const { connectWooCommerceStore, isConnectingWooCommerceStore } =
    useAddWooCommerceStoreConnectionThroughSecrets();

  const {
    connectWooCommerceStoreWithOAuth,
    isConnectingWooCommerceStoreWithOAuth,
  } = useAddWooCommerceStoreConnectionThroughOAuth();

  const [wooConnectionMethod, setWooConnectionMethod] = useState<
    "oauth" | "api_key"
  >("oauth");
  const [wooCommerceStoreURL, setWooCommerceStoreURL] = useState("");
  const [wooApiKey, setWooApiKey] = useState("");
  const [wooApiSecret, setWooApiSecret] = useState("");
  const [wooOAuthReminderVisible, setWooOAuthReminderVisible] =
    useState(false);
  const [troubleshootOpen, setTroubleshootOpen] = useState(false);

  const handleConnectionMethodChange = (value: "oauth" | "api_key") => {
    if (value === "api_key") {
      clearWooCommerceOAuthAttempt();
      setWooOAuthReminderVisible(false);
    }
    setWooConnectionMethod(value);
  };
  // const [wooTimezone, setWooTimezone] = useState("America/New_York");
  // const timezoneDetected = false;

  useEffect(() => {
    if (isWooCommerceConnected) {
      clearWooCommerceOAuthAttempt();
      setWooOAuthReminderVisible(false);
    }
  }, [isWooCommerceConnected]);

  useEffect(() => {
    if (!isModalOpen) return;

    const pending =
      Boolean(getWooCommerceOAuthAttempt()) && !isWooCommerceConnected;
    setWooOAuthReminderVisible(pending);
  }, [isModalOpen, isWooCommerceConnected]);

  const storeUrlForGuide = (() => {
    const pending = getWooCommerceOAuthAttempt();
    const raw = pending?.storeUrl?.trim()
      ? pending.storeUrl
      : wooCommerceStoreURL.trim();
    return formatStoreUrlForDisplay(raw);
  })();

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={() => onCloseModal()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect WooCommerce Store</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {wooOAuthReminderVisible &&
            wooConnectionMethod === "oauth" &&
            !isWooCommerceConnected && (
              <div
                role="status"
                className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-50"
              >
                <div className="flex gap-3">
                  <AlertTriangle
                    aria-hidden
                    className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400"
                  />
                  <div className="min-w-0 space-y-2">
                    <p className="text-sm font-medium">
                      Trouble completing OAuth via your store URL?
                    </p>
                    <p className="text-sm text-amber-900/90 dark:text-amber-100/90">
                      If your connection attempt failed after using{" "}
                      <strong className="text-amber-950 dark:text-amber-50">
                        Connect with OAuth
                      </strong>{" "}
                      with URL-based setup, use the troubleshooting guide for
                      common WordPress roles, REST API, and security-plugin
                      issues.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-amber-300 bg-white hover:bg-amber-100 dark:border-amber-700 dark:bg-transparent dark:hover:bg-amber-900/30"
                      onClick={() => setTroubleshootOpen(true)}
                    >
                      View troubleshooting guide
                    </Button>
                  </div>
                </div>
              </div>
            )}

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
              onValueChange={handleConnectionMethodChange}
            >
              <div className="space-y-3">
                {/* OAuth Option - Now First */}
                <div
                  className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/40"
                  onClick={() => handleConnectionMethodChange("oauth")}
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
                  className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/40"
                  onClick={() => handleConnectionMethodChange("api_key")}
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
                onClick={() => {
                  setWooCommerceOAuthAttempt(wooCommerceStoreURL);
                  connectWooCommerceStoreWithOAuth({
                    storeUrl: wooCommerceStoreURL,
                  });
                }}
                className="w-full"
                disabled={
                  !wooCommerceStoreURL.trim() ||
                  isConnectingWooCommerceStoreWithOAuth
                }
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

      <WooCommerceOAuthTroubleshootDialog
        open={troubleshootOpen}
        onOpenChange={setTroubleshootOpen}
        storeUrlDisplay={storeUrlForGuide}
        onChooseApiKeys={() => {
          clearWooCommerceOAuthAttempt();
          setWooOAuthReminderVisible(false);
          handleConnectionMethodChange("api_key");
        }}
        onTryOAuthAgain={() => {
          const el =
            typeof document !== "undefined"
              ? document.getElementById("store-url")
              : null;
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      />
    </>
  );
};

export default WooCommerceConnectionModal;
