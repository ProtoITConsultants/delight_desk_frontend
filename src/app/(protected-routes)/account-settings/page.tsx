import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Shield, User, Zap } from "lucide-react";
import AccountSecurity from "@/modules/protected-routes/account-settings/sections/AccountSecurity";
import ProfileSection from "@/modules/protected-routes/account-settings/sections/ProfileSection";
import BillingandSubscription from "@/modules/protected-routes/account-settings/sections/BillingandSubscription";
import PlanUsage from "@/modules/protected-routes/account-settings/sections/PlanUsage";

export const metadata: Metadata = {
  title: "Account Settings - Delight Desk",
};

const AccountSettings = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Account Settings
        </h1>
        <p className="text-gray-600">
          Manage your profile, billing, and store connections
        </p>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="flex items-center flex-wrap w-full gap-2 p-1 h-10">
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 p-[6px_12px] cursor-pointer h-8"
          >
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="subscription"
            className="flex items-center gap-2 p-[6px_12px] cursor-pointer"
          >
            <CreditCard className="h-4 w-4" />
            Billing & Subscription
          </TabsTrigger>
          <TabsTrigger
            value="usage"
            className="flex items-center gap-2 p-[6px_12px] cursor-pointer"
          >
            <Zap className="h-4 w-4" />
            Usage
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center gap-2 p-[6px_12px] cursor-pointer"
          >
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>
        {/* Tabs Content */}
        {/* User Profile - Tab */}
        <TabsContent value="profile">
          <ProfileSection />
        </TabsContent>
        {/* Billing and Subscription - Tab */}
        <TabsContent value="subscription">
          <BillingandSubscription />
        </TabsContent>
        {/* Plan Usage - Tab */}
        <TabsContent value="usage">
          <PlanUsage />
        </TabsContent>
        {/* Account Security - Tab */}
        <TabsContent value="security">
          <AccountSecurity />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountSettings;
