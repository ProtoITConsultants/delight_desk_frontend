import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Clock, CreditCard } from "lucide-react";
import React from "react";

const CurrentUserPlan = () => {
  const currentPlan = {
    displayName: "Solopreneur",
  };
  const isActive = true;
  const isOnTrial = true;
  const isCancelled = false;
  const trialDaysLeft = 0;
  const hasPaymentMethod = false;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Current Subscription</CardTitle>
            <CardDescription>
              {currentPlan?.displayName || "No active plan"}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {isOnTrial && !isCancelled && (
              <Badge
                variant="outline"
                className="bg-orange-50 text-orange-700 border-orange-200"
              >
                <Clock className="w-3 h-3 mr-1" />
                {trialDaysLeft} days left
              </Badge>
            )}
            {isActive && (
              <Badge className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
            )}
            {isCancelled && (
              <Badge variant="destructive">
                <Clock className="w-3 h-3 mr-1" />
                Cancelled • {trialDaysLeft} days left
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isOnTrial && !hasPaymentMethod && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="font-medium text-orange-900">
                  Trial Active
                </span>
              </div>
              <p className="text-sm text-orange-700">
                Your trial ends in {trialDaysLeft} days. Add a payment method to
                continue using Delight Desk.
              </p>
            </div>
          )}

          {isOnTrial && hasPaymentMethod && !isCancelled && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900">
                  Payment Method Added
                </span>
              </div>
              <p className="text-sm text-blue-700">
                Your subscription will automatically begin when your trial ends
                in {trialDaysLeft} days.
              </p>
            </div>
          )}

          {isOnTrial && isCancelled && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-900">
                  Subscription Cancelled
                </span>
              </div>
              <p className="text-sm text-green-700 mb-3">
                You won&apos;t be charged when your trial ends in{" "}
                {trialDaysLeft} days. You can continue using Delight Desk until
                then.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Resume subscription by updating status back to trial
                }}
                // disabled={updateSubscriptionMutation.isPending}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                data-testid="button-resume-subscription"
              >
                {/* {updateSubscriptionMutation.isPending
                  ? "Resuming..."
                  : "Resume Subscription"} */}
                Resume Subscription
              </Button>
            </div>
          )}

          {isActive && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-900">
                  Subscription Active
                </span>
              </div>
              <p className="text-sm text-green-700">
                Your subscription is active and will renew automatically.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentUserPlan;
