import { CheckCircle } from "lucide-react";
import React from "react";

const PlanSelectionHeader = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center text-center">
      {/* Success Banner */}
      <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm px-4 py-2 rounded-full w-fit">
        <CheckCircle className="h-4 w-4" />
        Account Created Successfully!
      </div>
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
        Simple, Usage-Based Pricing
      </h1>
      {/* Description */}
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Start your <strong>7-day free trial</strong>. Every plan includes full
        platform access. Pay only when AI automations resolve customer issues.
      </p>
    </div>
  );
};

export default PlanSelectionHeader;
