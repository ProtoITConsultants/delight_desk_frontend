"use client";
import { useState } from "react";
import ConnectionCard from "@/modules/protected-routes/connections-page/components/connection-card";
import ConnectionsHeader from "@/modules/protected-routes/connections-page/components/Header";
import ShipStationConnectionalModal from "@/modules/protected-routes/connections-page/components/modals/ShipStationConnectionalModal";
import { Store, Mail, Info } from "lucide-react";
import WooCommerceConnectionModal from "@/modules/protected-routes/connections-page/components/modals/WooCommerceConnectionModal";
import ManageConnectionModal from "@/modules/protected-routes/connections-page/components/modals/ManageConnectionModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useDisconnectWooCommerceStore } from "@/hooks/services/connections/woocommerce/disconnect-store/use-disconnect-woocommerce-store";
import {
  ConnectionsDialogsProvider,
  useConnectionsDialogs,
} from "@/providers/connections/connections-dialogs-provider";
import ShipBobConnectionalModal from "@/modules/protected-routes/connections-page/components/modals/ShipBobConnectionalModal copy";

type emailConnectionModalType = {
  isModalOpen: boolean;
  type: "gmail" | "outlook" | null;
};

const ConnectionsPageContent = () => {
  // Hooks
  const queryClient = useQueryClient();
  const { disconnectWooCommerceStore, isRemovingWooCommerceStore } =
    useDisconnectWooCommerceStore();
  const {
    wooCommerceDialog,
    setWooCommerceDialog,
    shipstationDialog,
    setShipstationDialog,
    shipbobDialogOpen,
    setShipbobDialogOpen,
  } = useConnectionsDialogs();

  // Local States

  const [manageEmailConnectionDialog, setManageEmailConnectionDialog] =
    useState<emailConnectionModalType>({
      isModalOpen: false,
      type: null,
    });

  // Get User Connections - Query
  const {
    data: connectionsData,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ["connections"],
    queryFn: () => {
      return api.user_connections.getUserConnections();
    },
  });

  if (isError) {
    toast.error("Error fetching connections", {
      description: error.message || "",
    });
  }

  // Disconnect Gmail
  const disconnectGmailMutation = useMutation({
    mutationFn: () => api.user_connections.disconnectGmailAccount(),
    onSuccess: () => {
      toast.success("Account Disconnected!", {
        description: "Gmail account disconnected successfully!",
      });
      queryClient.invalidateQueries({
        queryKey: ["connections"],
      });
      setManageEmailConnectionDialog({
        isModalOpen: false,
        type: null,
      });
    },
    onError: (error) => {
      toast.error("Failed to disconnect account!", {
        description: error.message || "Something went wrong",
      });
    },
  });

  // Disconnect Outlook
  const disconnectOutlookMutation = useMutation({
    mutationFn: () => api.user_connections.disconnectOutlookAccount(),
    onSuccess: () => {
      toast.success("Account Disconnected!", {
        description: "Outlook account disconnected successfully!",
      });
      queryClient.invalidateQueries({
        queryKey: ["connections"],
      });
      setManageEmailConnectionDialog({
        isModalOpen: false,
        type: null,
      });
    },
    onError: (error) => {
      toast.error("Failed to disconnect account!", {
        description: error.message || "Something went wrong",
      });
    },
  });

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
          connectionEstablished={
            connectionsData?.wooCommerceConnection ? true : false
          }
          onCreateConnection={() =>
            setWooCommerceDialog({
              isModalOpen: true,
              type: "create-connection",
            })
          }
          onManageConnection={() => {
            setWooCommerceDialog({
              isModalOpen: true,
              type: "manage-connection",
            });
          }}
          isFetchingDetails={isPending}
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
          connectionEstablished={
            connectionsData?.gmailConnection ? true : false
          }
          onCreateConnection={() => api.user_connections.addGmailConnection()}
          onManageConnection={() => {
            setManageEmailConnectionDialog({
              isModalOpen: true,
              type: "gmail",
            });
          }}
          isFetchingDetails={isPending}
          disabled={connectionsData?.outlookConnection ? true : false}
        />
        {/* Outlook Connection */}
        <ConnectionCard.Item
          title="Outlook"
          description="Microsoft 365"
          icon={
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          }
          connectionEstablished={
            connectionsData?.outlookConnection ? true : false
          }
          onCreateConnection={() => api.user_connections.addOutlookConnection()}
          onManageConnection={() => {
            setManageEmailConnectionDialog({
              isModalOpen: true,
              type: "outlook",
            });
          }}
          isFetchingDetails={isPending}
          disabled={connectionsData?.gmailConnection ? true : false}
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
          connectionEstablished={
            connectionsData?.shipbobConnection ? true : false
          }
          onCreateConnection={() => setShipbobDialogOpen(true)}
          onManageConnection={() => {}}
          isFetchingDetails={isPending}
        />
        {/* Shipstation Connection */}
        <ConnectionCard.Item
          title="Shipstation"
          description="Shipping Platform"
          icon={
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-orange-600 dark:text-orange-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
          }
          connectionEstablished={
            connectionsData?.shipstationConnection ? true : false
          }
          onCreateConnection={() =>
            setShipstationDialog({
              isModalOpen: true,
              type: "create-connection",
            })
          }
          onManageConnection={() =>
            setWooCommerceDialog({
              isModalOpen: true,
              type: "manage-connection",
            })
          }
          isFetchingDetails={isPending}
        />

        {/* Callout for users without ShipBob/Shipstation */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 col-span-2">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Don&apos;t use ShipBob or Shipstation?
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                You can still make full use of all AI agents! You&apos;ll see
                configuration options in the settings for each individual agent
                to customize their behavior for your fulfillment process.
              </p>
            </div>
          </div>
        </div>
      </ConnectionCard.Root>

      {/* Connection Modals */}
      {/* WooCommerce Connection - Modal */}
      <WooCommerceConnectionModal
        isModalOpen={
          wooCommerceDialog.isModalOpen &&
          wooCommerceDialog.type === "create-connection"
        }
        onCloseModal={() =>
          setWooCommerceDialog({
            isModalOpen: false,
            type: "",
          })
        }
      />
      {/* ShipStation Connection - Modal */}
      <ShipStationConnectionalModal
        showShipstationDialog={
          shipstationDialog.isModalOpen &&
          shipstationDialog.type === "create-connection"
        }
        onCloseModal={() =>
          setShipstationDialog({
            isModalOpen: false,
            type: "",
          })
        }
      />
      {/* ShipBob Connection - Modal */}
      <ShipBobConnectionalModal
        showShipBobDialog={shipbobDialogOpen}
        onCloseModal={() => setShipbobDialogOpen(false)}
      />

      {/* Manage Connections Modal */}
      <ManageConnectionModal
        isModalOpen={
          manageEmailConnectionDialog.isModalOpen &&
          manageEmailConnectionDialog.type === "gmail"
        }
        onCloseModal={() =>
          setManageEmailConnectionDialog({
            isModalOpen: false,
            type: null,
          })
        }
        type="gmail"
        status={
          connectionsData?.gmailConnection?.status === "connected"
            ? "active"
            : "inactive"
        }
        email={connectionsData?.gmailConnection?.email}
        onDisconnectAccount={() => disconnectGmailMutation.mutate()}
        isDisconnecting={disconnectGmailMutation.isPending}
      />
      <ManageConnectionModal
        isModalOpen={
          manageEmailConnectionDialog.isModalOpen &&
          manageEmailConnectionDialog.type === "outlook"
        }
        onCloseModal={() =>
          setManageEmailConnectionDialog({
            isModalOpen: false,
            type: null,
          })
        }
        type="outlook"
        status={
          connectionsData?.outlookConnection?.status === "connected"
            ? "active"
            : "inactive"
        }
        email={connectionsData?.outlookConnection?.email}
        onDisconnectAccount={() => disconnectOutlookMutation.mutate()}
        isDisconnecting={disconnectOutlookMutation.isPending}
      />
      {/* For Now I would have two separate Modals for each connection */}
      <ManageConnectionModal
        isModalOpen={
          wooCommerceDialog.isModalOpen &&
          wooCommerceDialog.type === "manage-connection"
        }
        onCloseModal={() =>
          setWooCommerceDialog({
            isModalOpen: false,
            type: "",
          })
        }
        type="wooCommerce"
        status="active"
        storeURL={connectionsData?.wooCommerceConnection?.storeUrl || "N/A"}
        onDisconnectAccount={() => disconnectWooCommerceStore()}
        isDisconnecting={isRemovingWooCommerceStore}
      />
    </div>
  );
};

const ConnectionsPage = () => {
  return (
    <ConnectionsDialogsProvider>
      <ConnectionsPageContent />
    </ConnectionsDialogsProvider>
  );
};

export default ConnectionsPage;
