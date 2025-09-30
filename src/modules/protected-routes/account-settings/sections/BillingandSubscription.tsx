"use client";

import SubscriptionManagement from "../components/subscription-management/subscription-management";

const BillingandSubscription = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Billing & Subscription
          </h2>
          <p className="text-gray-600">
            Manage your subscription, payment methods, and billing preferences
          </p>
        </div>
      </div>
      {/* Subscription Management */}
      <SubscriptionManagement />
    </div>
  );
};

export default BillingandSubscription;
