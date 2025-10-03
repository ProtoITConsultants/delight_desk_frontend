import { cn } from "@/lib/utils";
import { SUBSCRIPTION_PLAN_CARD } from "../../types/subscription-plan-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Crown, TrendingUp, Zap } from "lucide-react";

const SubscriptionPlanCard = ({
  id,
  name,
  displayName,
  price,
  costPerResolution,
  features,
  isPopular,
  isFirst,
}: SUBSCRIPTION_PLAN_CARD & {
  isPopular: boolean;
  isFirst: boolean;
}) => {
  // Get plan icons and colors
  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "solopreneur":
        return <Zap className="h-6 w-6" />;
      case "growth":
        return <TrendingUp className="h-6 w-6" />;
      case "scale":
        return <Crown className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };

  const getPlanColor = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "solopreneur":
        return "bg-blue-100 text-blue-600";
      case "growth":
        return "bg-purple-100 text-purple-600";
      case "scale":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <div
      key={id}
      className={`bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center relative shadow-2xl stripe-scale-in space-y-8 ${
        isPopular
          ? "bg-white/15 border-2 border-purple-500/50 transform lg:scale-105 stripe-stagger-5"
          : isFirst
          ? "border border-white/20 stripe-stagger-4"
          : "border border-white/20 stripe-stagger-6"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
            Most Popular
          </div>
        </div>
      )}

      <div className={`${isPopular ? "mt-4" : ""}`}>
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${getPlanColor(
            name
          )}`}
        >
          {getPlanIcon(name)}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{displayName}</h3>
        <p className="text-gray-600">
          {name === "solopreneur" && "Perfect for getting started"}
          {name === "growth" && "For growing businesses"}
          {name === "scale" && "For enterprise operations"}
        </p>
      </div>

      <div>
        <div className="text-5xl font-bold text-gray-900 mb-2">
          ${parseInt(price)}
        </div>
        <div className="text-gray-600 mb-4">per month</div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600 mb-2">
            Pay only for AI automations:
          </div>
          <div className="text-lg font-semibold text-green-400 break-all">
            ${parseFloat(costPerResolution).toFixed(2)} per AI agent resolution
          </div>
          <div className="text-xs text-gray-500 mt-1">
            ~{Math.floor(parseFloat(price) / parseFloat(costPerResolution))}{" "}
            automations included in base price
          </div>
        </div>
      </div>

      <div className="text-center space-y-3">
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={() => console.log("clicked")}
        className={cn(
          "w-full text-white",
          isPopular
            ? "bg-purple-600 hover:bg-purple-700"
            : "bg-gray-900 hover:bg-gray-800"
        )}
      >
        Start 7-Day Free Trial
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default SubscriptionPlanCard;
