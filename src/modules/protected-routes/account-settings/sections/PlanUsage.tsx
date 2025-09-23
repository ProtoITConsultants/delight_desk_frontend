import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Crown,
  Mail,
  XCircle,
} from "lucide-react";

const billingContext = {
  isTrialActive: true,
  hasPaymentSecured: true,
  isActiveSubscription: false,
  planName: "Growth",
};

const usageData = [
  {
    type: "combined_actions",
    monthlyCount: 0,
    monthlyLimit: 100,
    limitExceeded: false,
    resetDate: "2023-06-30",
  },
  {
    type: "automations",
    monthlyCount: 0,
    monthlyLimit: 100,
    limitExceeded: false,
    resetDate: "2023-06-30",
  },
];

const getUsageStatus = (count: number, limit: number, exceeded: boolean) => {
  if (exceeded)
    return { status: "exceeded", color: "destructive", icon: XCircle };
  if (count >= limit * 0.9)
    return { status: "warning", color: "warning", icon: AlertTriangle };
  return { status: "good", color: "success", icon: CheckCircle };
};

const getServiceDisplayName = (type: string) => {
  switch (type) {
    case "combined_actions":
      return "AI-Powered Actions";
    case "automations":
      return "Email Automations";
    default:
      return type;
  }
};

const getServiceIcon = (type: string) => {
  switch (type) {
    case "combined_actions":
      return CheckCircle;
    case "automations":
      return Mail;
    default:
      return CheckCircle;
  }
};

const getServiceDescription = (type: string) => {
  switch (type) {
    case "combined_actions":
      return "AI order lookups with delivery predictions + automated email responses";
    case "automations":
      return "AI-powered automated email responses";
    default:
      return "";
  }
};

const getContextualDescription = () => {
  if (!billingContext) return "Loading usage data...";

  const { isTrialActive, hasPaymentSecured, isActiveSubscription, planName } =
    billingContext;

  if (isActiveSubscription) {
    return `Track your ${planName} plan usage and monthly limits.`;
  }

  if (isTrialActive && hasPaymentSecured) {
    return `Your ${planName} plan includes these monthly limits. Trial credits roll over to plan limits seamlessly.`;
  }

  if (isTrialActive && !hasPaymentSecured) {
    return "Track your free trial usage. Add payment to unlock full plan limits.";
  }

  return "Track your usage and monthly limits.";
};

const getTrialStatusBadge = () => {
  if (!billingContext) return null;

  const { isTrialActive, hasPaymentSecured, planName } = billingContext;

  if (isTrialActive && hasPaymentSecured) {
    return (
      <Badge variant="outline" className="ml-2">
        <Crown className="w-3 h-3 mr-1" />
        {planName} Trial
      </Badge>
    );
  }

  if (isTrialActive && !hasPaymentSecured) {
    return (
      <Badge variant="secondary" className="ml-2">
        Free Trial
      </Badge>
    );
  }

  return null;
};

const PlanUsage = () => {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          Monthly Usage
          {getTrialStatusBadge()}
        </CardTitle>
        <CardDescription>{getContextualDescription()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {usageData?.map((usage) => {
          const status = getUsageStatus(
            usage.monthlyCount,
            usage.monthlyLimit,
            usage.limitExceeded
          );
          const StatusIcon = status.icon;
          const ServiceIcon = getServiceIcon(usage.type);
          const usagePercentage = Math.round(
            (usage.monthlyCount / usage.monthlyLimit) * 100
          );

          return (
            <div key={usage.type} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ServiceIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium">
                      {getServiceDisplayName(usage.type)}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {getServiceDescription(usage.type)}
                    </p>
                  </div>
                </div>
                {usage.limitExceeded && (
                  <Badge variant="destructive">Service Disabled</Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <StatusIcon
                      className={`w-4 h-4 ${
                        status.color === "destructive"
                          ? "text-red-500"
                          : status.color === "warning"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    />
                    <span>This Month</span>
                  </div>
                  <span className="font-medium">
                    {usage.monthlyCount} / {usage.monthlyLimit}
                  </span>
                </div>
                <Progress value={usagePercentage} className="h-3" />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{usagePercentage}% used</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Resets {usage.resetDate}</span>
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              {usage.limitExceeded && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="text-sm text-red-800">
                    <strong>Service Temporarily Disabled</strong>
                    <p className="mt-1">
                      You&apos;ve reached your{" "}
                      {getServiceDisplayName(usage.type).toLowerCase()} limit.
                      Service will resume when your usage resets or you upgrade
                      your plan.
                    </p>
                  </div>
                </div>
              )}

              {/* Warning at 90% */}
              {!usage.limitExceeded && usagePercentage >= 90 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="text-sm text-yellow-800">
                    <strong>Approaching Limit</strong>
                    <p className="mt-1">
                      You&apos;re at {usagePercentage}% of your{" "}
                      {getServiceDisplayName(usage.type).toLowerCase()} limit.
                      Consider upgrading to avoid service interruption.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Upgrade CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h4 className="font-medium mb-2 text-gray-900">
            Need unlimited automations?
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Upgrade to remove limits and get unlimited AI-powered customer
            service automation and order lookups.
          </p>
          <a
            href="/account-settings?tab=billing"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors"
          >
            Upgrade Plan
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanUsage;
