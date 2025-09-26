"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Shield, User, Zap } from "lucide-react";
import AccountSecurity from "@/modules/protected-routes/account-settings/sections/AccountSecurity";
import ProfileSection from "@/modules/protected-routes/account-settings/sections/ProfileSection";
import BillingandSubscription from "@/modules/protected-routes/account-settings/sections/BillingandSubscription";
import PlanUsage from "@/modules/protected-routes/account-settings/sections/PlanUsage";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AccountSettingsTabs = () => {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="hidden md:flex items-center flex-wrap w-full gap-2 p-1 h-10">
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

      <div className="flex md:hidden justify-end">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="min-w-[183.39px] bg-white">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="profile">Profile</SelectItem>
            <SelectItem value="subscription">Billing & Subscription</SelectItem>
            <SelectItem value="usage">Usage</SelectItem>
            <SelectItem value="security">Security</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
  );
};

export default AccountSettingsTabs;
