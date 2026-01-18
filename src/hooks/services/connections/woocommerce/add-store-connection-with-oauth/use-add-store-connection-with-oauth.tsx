"use client";
import { api } from "@/lib/api";
import { useConnectionsDialogs } from "@/providers/connections/connections-dialogs-provider";
import {
  WOOCOMMERCE_CONNECTION_THROUGH_OAUTH_PARAMS,
  WOOCOMMERCE_CONNECTION_THROUGH_OAUTH_RESPONSE,
} from "@/services/connections/utils/woocommerce-connection";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAddWooCommerceStoreConnectionThroughOAuth = () => {
  const { setWooCommerceDialog } = useConnectionsDialogs();
  const router = useRouter();

  const connectWooCommerceStore = useMutation<
    WOOCOMMERCE_CONNECTION_THROUGH_OAUTH_RESPONSE,
    Error,
    WOOCOMMERCE_CONNECTION_THROUGH_OAUTH_PARAMS
  >({
    mutationFn: (params) =>
      api.user_connections.addWooCommerceConnectionThroughOAuth(params),
    onSuccess: (data) => {
      router.replace(data.redirectUrl);
      setWooCommerceDialog({
        isModalOpen: false,
        type: "",
      });
    },
    onError: (error) => {
      toast.error("Failed to connect store!", {
        description: error.message || "Something went wrong",
      });
    },
  });

  return {
    connectWooCommerceStoreWithOAuth: connectWooCommerceStore.mutate,
    isConnectingWooCommerceStoreWithOAuth: connectWooCommerceStore.isPending,
  };
};
