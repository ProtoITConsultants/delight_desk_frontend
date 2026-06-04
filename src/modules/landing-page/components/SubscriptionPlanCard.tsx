import { ArrowRight } from "lucide-react";
import { SUBSCRIPTION_PLAN_CARD } from "../types";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
        <h3 className="text-2xl font-bold text-white mb-2">{displayName}</h3>
        <p className="text-white/60">
          {name === "solopreneur" && "Perfect for getting started"}
          {name === "growth" && "For growing businesses"}
          {name === "scale" && "For enterprise operations"}
        </p>
      </div>

      <div>
        <div className="text-5xl font-bold text-white mb-2">
          ${parseInt(price)}
        </div>
        <div className="text-white/60 mb-4">per month</div>
        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <div className="text-sm text-white/60 mb-2">
            Pay only for AI automations:
          </div>
          <div className="text-lg font-semibold text-green-400 break-all">
            ${parseFloat(costPerResolution).toFixed(2)} per AI agent resolution
          </div>
          <div className="text-xs text-white/50 mt-1">
            ~{Math.floor(parseFloat(price) / parseFloat(costPerResolution))}{" "}
            automations included in base price
          </div>
        </div>
      </div>

      <div>
        <div className="text-center space-y-2">
          {features.map((feature, featureIndex) => (
            <div
              key={featureIndex}
              className="text-sm font-medium text-white/80"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/signup"
        className={cn(
          `w-full rounded-lg py-2 px-4 flex items-center justify-center text-white font-semibold`,
          isPopular
            ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            : isFirst
            ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        )}
      >
        Start Free Trial
        <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </div>
  );
};

export default SubscriptionPlanCard;
