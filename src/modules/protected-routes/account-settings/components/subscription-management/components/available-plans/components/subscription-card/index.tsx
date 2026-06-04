import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SUBSCRIPTION_CARD_TYPES } from "../../types";
import { CheckCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SubscriptionCard = ({
  isCurrentPlan,
  planName,
  planPrice,
  planFeatures,
  isTrialPlan,
  userHasPaymentMethod,
  isPlanCancelled,
  isPlanActive,
}: SUBSCRIPTION_CARD_TYPES) => {
  const billing = {
    stripeSubscriptionId: "12xxao9da",
  };

  const currentPlan = {
    id: "pro",
    name: "Pro",
    price: "29.99",
  };

  const updateSubscriptionMutation = {
    isPending: false,
  };

  return (
    <Card className={`relative ${isCurrentPlan ? "ring-2 ring-blue-500" : ""}`}>
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-blue-500 text-white">Current Plan</Badge>
        </div>
      )}

      <CardHeader className="text-center">
        <CardTitle className="text-xl">{planName}</CardTitle>
        <div className="text-3xl font-bold">${planPrice}</div>
        <CardDescription>per month</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          {planFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-4">
          {isCurrentPlan ? (
            <div className="space-y-2">
              {isTrialPlan && !userHasPaymentMethod && (
                <Button
                  className="w-full"
                  onClick={() => {}}
                  //   disabled={updateSubscriptionMutation.isPending}
                  data-testid={`button-add-payment-${planName}`}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              )}

              {isTrialPlan &&
                userHasPaymentMethod &&
                !billing.stripeSubscriptionId &&
                !isPlanCancelled && (
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                    disabled={true}
                    data-testid={`button-plan-selected-${planName}`}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Plan Selected
                  </Button>
                )}

              {isPlanCancelled && (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-gray-200 text-gray-600"
                    disabled={true}
                    data-testid={`button-plan-selected-cancelled-${planName}`}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Selected Plan
                  </Button>
                  <Button
                    className="w-full"
                    // onClick={() => {
                    //   updateSubscriptionMutation.mutate({ newPlanId: plan.id });
                    // }}
                    // disabled={updateSubscriptionMutation.isPending}
                    data-testid={`button-resume-from-plan-${planName}`}
                  >
                    {/* {updateSubscriptionMutation.isPending
                      ? "Resuming..."
                      : "Resume Subscription"} */}
                    Resume Subscription
                  </Button>
                </div>
              )}

              {userHasPaymentMethod && isPlanActive && !isPlanCancelled && (
                <Button
                  variant="outline"
                  className="w-full"
                  //   onClick={() => cancelSubscriptionMutation.mutate()}
                  //   disabled={cancelSubscriptionMutation.isPending}
                  data-testid="button-cancel-subscription"
                >
                  Cancel Subscription
                </Button>
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              //   onClick={() => handlePlanSelect(plan)}
              //   disabled={updateSubscriptionMutation.isPending}
              data-testid={`button-select-${planName}`}
            >
              {updateSubscriptionMutation.isPending
                ? "Updating..."
                : !currentPlan
                ? "Select Plan"
                : parseFloat(planPrice) > parseFloat(currentPlan.price)
                ? "Upgrade"
                : parseFloat(planPrice) < parseFloat(currentPlan.price)
                ? "Downgrade"
                : "Switch to this Plan"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
