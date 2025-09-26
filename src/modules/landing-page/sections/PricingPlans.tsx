import { DollarSign } from "lucide-react";
import LandingPageAPIs from "../api";
import SubscriptionPlanCard from "../components/SubscriptionPlanCard";
import SubscriptionCardSkeleton from "../components/SubscriptionCardSkeleton";

const PricingPlans = async () => {
  // // Fetch pricing plans
  const pricingPlans = await LandingPageAPIs.fetchPricingPlans();

  return (
    <section
      id="pricing"
      className="relative ds-section-padding-desktop bg-gradient-to-br from-blue-900/30 via-slate-900 to-purple-900/30"
    >
      {/* Pricing Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-8 border border-white/20 glass-pulse">
            <DollarSign className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-white/90">
              Monthly Billing
            </span>
          </div>
          <h2 className="ds-heading-lg font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent stripe-fade-in-up stripe-stagger-2 leading-tight">
            Simple, Usage-Based Pricing
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto stripe-fade-in-up stripe-stagger-3">
            Every plan includes full platform access. Pay only when the AI agent
            resolves customer issues.
          </p>
        </div>
      </div>
      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {!pricingPlans ? (
          <SubscriptionCardSkeleton />
        ) : (
          (pricingPlans || [])
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
            })
        )}
      </div>
    </section>
  );
};

export default PricingPlans;
