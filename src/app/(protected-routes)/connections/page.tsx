"use client";
import { Badge } from "@/components/ui/badge";
import ConnectionCard from "@/modules/protected-routes/connections-page/components/connection-card";
import ConnectionsHeader from "@/modules/protected-routes/connections-page/components/Header";
import { Store, Mail } from "lucide-react";

const ConnectionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <ConnectionsHeader />
      {/* Connection Cards */}
      {/* Store Connections */}
      <ConnectionCard.Root
        title="E-commerce Store"
        description="Connect one store to manage orders and customer data"
        icon={<Store className="w-5 h-5" />}
      >
        {/* WooCommerce Connection */}
        <ConnectionCard.Item
          title="WooCommerce"
          description="WordPress store"
          icon={
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          }
          connectionEstablished={true}
          onCreateConnection={() => {}}
          onManageConnection={() => {}}
        />
      </ConnectionCard.Root>
      {/* Email Connections */}
      <ConnectionCard.Root
        title="Business Email"
        description="Connect your business email account to send automated replies"
        icon={<Mail className="w-5 h-5" />}
      >
        {/* Gmail Connection */}
        <ConnectionCard.Item
          title="Gmail"
          description="Google Workspace"
          icon={
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
          }
          connectionEstablished={true}
          onCreateConnection={() => {}}
          onManageConnection={() => {}}
        />{" "}
        {/* Outlook Connection */}
        <ConnectionCard.Item
          title="Outlook"
          description="Microsoft 365"
          icon={
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          }
          connectionEstablished={false}
          onCreateConnection={() => {}}
          onManageConnection={() => {}}
        />
      </ConnectionCard.Root>
      {/* Fulfillment Integration */}
      <ConnectionCard.Root
        title="Fulfillment Partners"
        description="Connect your 3PL or fulfillment service for automated order cancellations"
        icon={
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        }
      >
        {/* ShipBob Connection */}
        <ConnectionCard.Item
          title="ShipBob"
          description="3PL Fulfillment"
          icon={
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
          }
          connectionEstablished={false}
          onCreateConnection={() => {}}
          onManageConnection={() => {}}
        />
        {/* Placeholder for future 3PL integrations */}
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 opacity-60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500 dark:text-gray-400">
                  More 3PLs
                </h3>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Coming Soon
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full"
            >
              Coming Soon
            </Badge>
          </div>
        </div>
      </ConnectionCard.Root>
    </div>
  );
};

export default ConnectionsPage;
