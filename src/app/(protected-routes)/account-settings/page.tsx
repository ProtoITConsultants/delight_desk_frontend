import { Metadata } from "next";

import AccountSettingsTabs from "@/modules/protected-routes/account-settings/components/AccountSettingsTabs";

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

      {/* Account Settings Tabs */}
      <AccountSettingsTabs />
    </div>
  );
};

export default AccountSettings;
