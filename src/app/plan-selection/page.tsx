"use client";
import SubscriptionPlanCard from "@/modules/protected-routes/plan-selection/components/subscription-plan-card";
import SubscriptionPlansAPI from "@/modules/protected-routes/account-settings/components/subscription-management/api";
import PlanSelectionHeader from "@/modules/protected-routes/plan-selection/components/plan-selection-header";
import PlanValueCard from "@/modules/protected-routes/plan-selection/components/value-card";
import { VALUE_PROP_CARDS_DATA } from "@/modules/protected-routes/plan-selection/constants/value-card";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import TrustSelectionFooter from "@/modules/protected-routes/plan-selection/components/trust-selection-footer/indext";

// Plan Selection After Signup
const PlanSelectionPage = () => {
  // Fetch Subscription Plans
  const {
    data: pricingPlans,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: () => SubscriptionPlansAPI.fetchPricingPlans(),
  });

  if (isError) {
    console.log("Error fetching subscription plans", error);
    toast.error("Error fetching subscription plans!", {
      description: error.message || "Something went wrong",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <PlanSelectionHeader />
        {/* Value Props - Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {VALUE_PROP_CARDS_DATA.map((card, i) => (
            <PlanValueCard {...card} key={i} />
          ))}
        </div>

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {isPending
            ? Array.from({ length: 3 }, (_, i) => (
                <Skeleton key={i} className="h-120 w-full rounded-xl" />
              ))
            : (pricingPlans || [])
                .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                .map((plan, index) => {
                  const isPopular = plan.name === "growth";
                  const isFirst = index === 0;
                  return (
                    <SubscriptionPlanCard
                      key={plan.id}
                      {...plan}
                      {...{ isPopular, isFirst }}
                    />
                  );
                })}
        </div>

        <TrustSelectionFooter />
      </div>
    </div>
  );
};

export default PlanSelectionPage;
