"use client";

import { useSubscriptionPlans } from "@/modules/protected-routes/account-settings/components/subscription-management/hooks/use-subscription-plans";
import SubscriptionCard from "./components/subscription-card";
import { Skeleton } from "@/components/ui/skeleton";

const AvailablePlans = () => {
  const { subscriptionPlans, isFetchingSubscriptionPlans } =
    useSubscriptionPlans();

  console.log("subscriptionPlans", subscriptionPlans);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Available Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isFetchingSubscriptionPlans
          ? Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-lg" />
            ))
          : subscriptionPlans?.map((plan) => (
              <SubscriptionCard
                key={plan.id}
                isCurrentPlan={true}
                planName={plan.name}
                planPrice={plan.price}
                planFeatures={plan.features}
                isTrialPlan={true}
                userHasPaymentMethod={false}
                isPlanCancelled={false}
                isPlanActive={false}
              />
            ))}
      </div>
    </div>
  );
};

export default AvailablePlans;
