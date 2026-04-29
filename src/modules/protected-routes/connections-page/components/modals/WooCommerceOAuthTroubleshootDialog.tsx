"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useEffect, useState, type ReactNode } from "react";

import { getSupportContactEmail } from "../../constants/support-contact";

export type WooOAuthTroubleshootFailureMode =
  | "oauth_incomplete_after_url_flow"
  | "oauth_role_or_rest_block";

type WooCommerceOAuthTroubleshootDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storeUrlDisplay: string;
  onChooseApiKeys: () => void;
  onTryOAuthAgain: () => void;
};

const introBody: Record<WooOAuthTroubleshootFailureMode, ReactNode> = {
  oauth_incomplete_after_url_flow: (
    <p className="text-sm text-muted-foreground">
      You started Connect with OAuth using your{" "}
      <strong>store URL</strong>. If that flow didn&apos;t finish and your
      store isn&apos;t connected yet, one-click OAuth often hits the issues
      below.
    </p>
  ),
  oauth_role_or_rest_block: (
    <p className="text-sm text-muted-foreground">
      WooCommerce&apos;s one-click connect requires roles and REST access from
      WordPress. OAuth may fail silently or show errors during WordPress login
      when REST access is restricted.
    </p>
  ),
};

const WooCommerceOAuthTroubleshootDialog = ({
  open,
  onOpenChange,
  storeUrlDisplay,
  onChooseApiKeys,
  onTryOAuthAgain,
}: WooCommerceOAuthTroubleshootDialogProps) => {
  const supportEmail = getSupportContactEmail();
  const [failureMode, setFailureMode] =
    useState<WooOAuthTroubleshootFailureMode>(
      "oauth_incomplete_after_url_flow",
    );

  useEffect(() => {
    if (open) {
      setFailureMode("oauth_incomplete_after_url_flow");
    }
  }, [open]);

  const handleMailto = () => {
    window.location.href = `mailto:${supportEmail}?subject=WooCommerce%20OAuth%20connection%20help`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[110] gap-6 sm:max-w-lg">
        <DialogHeader className="space-y-4">
          <DialogTitle>
            We couldn&apos;t connect your WooCommerce store
          </DialogTitle>

          <div
            role="tablist"
            aria-label="Troubleshooting focus"
            className="flex flex-wrap gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={failureMode === "oauth_incomplete_after_url_flow"}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                failureMode === "oauth_incomplete_after_url_flow"
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
              )}
              onClick={() =>
                setFailureMode("oauth_incomplete_after_url_flow")
              }
            >
              OAuth didn&apos;t finish
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={failureMode === "oauth_role_or_rest_block"}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                failureMode === "oauth_role_or_rest_block"
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
              )}
              onClick={() => setFailureMode("oauth_role_or_rest_block")}
            >
              Roles / REST / plugins
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-4 max-h-[min(72vh,520px)] overflow-y-auto pr-1 text-sm">
          {introBody[failureMode]}

          <div className="space-y-2">
            <p className="text-sm">
              WooCommerce&apos;s one-click connect requires a WordPress user with
              the <strong>Administrator</strong> or{" "}
              <strong>Shop Manager</strong> role and an unblocked REST API. The
              most common reasons this fails:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                The user you logged in with on{" "}
                <strong className="text-foreground">
                  {storeUrlDisplay || "your store"}
                </strong>{" "}
                does not have either role.
              </li>
              <li>
                A security plugin (Wordfence, iThemes Security, Hide My WP,
                etc.) is blocking the WooCommerce REST API.
              </li>
              <li>
                Custom WordPress role permissions are missing the{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
                  manage_woocommerce
                </code>{" "}
                capability.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium mb-2">What to do next</p>

            <ol className="list-decimal pl-5 space-y-3 text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">
                  Use API Key authentication{" "}
                  <span className="font-normal italic text-muted-foreground">
                    (recommended — works around all of the above)
                  </span>
                </span>
                {" — "}Generate REST keys in{" "}
                <strong className="text-foreground">
                  WP Admin → WooCommerce → Advanced → REST API
                </strong>{" "}
                and paste them in the next step.
              </li>
              <li>
                <strong className="text-foreground">
                  Try again with an Administrator account
                </strong>
                {" — "}log out of{" "}
                <strong>{storeUrlDisplay || "your store"}</strong> and retry
                with an admin user.
              </li>
              <li>
                <strong className="text-foreground">Contact us</strong>{" "}
                <a
                  className="text-primary underline-offset-4 hover:underline"
                  href={`mailto:${supportEmail}`}
                >
                  {supportEmail}
                </a>{" "}
                if neither option works.
              </li>
            </ol>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            type="button"
            className="w-full"
            size="lg"
            onClick={() => {
              onChooseApiKeys();
              onOpenChange(false);
            }}
          >
            Use API Keys
          </Button>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between sm:gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:flex-1"
              onClick={() => {
                onTryOAuthAgain();
                onOpenChange(false);
              }}
            >
              Try Again
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-full sm:flex-1"
              onClick={handleMailto}
            >
              Contact Support
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WooCommerceOAuthTroubleshootDialog;
