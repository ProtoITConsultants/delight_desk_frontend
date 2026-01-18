import { api } from "@/lib/api";
import { useConnectionsDialogs } from "@/providers/connections/connections-dialogs-provider";
import { WOOCOMMERCE_CONNECTION_THROUGH_SECRET_KEYS_PARAMS } from "@/services/connections/utils/woocommerce-connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddWooCommerceStoreConnectionThroughSecrets = () => {
  const queryClient = useQueryClient();
  const { setWooCommerceDialog } = useConnectionsDialogs();

  const connectWooCommerceStore = useMutation({
    mutationFn: (params: WOOCOMMERCE_CONNECTION_THROUGH_SECRET_KEYS_PARAMS) =>
      api.user_connections.addWooCommerceConnectionThroughSecretKeys(params),
    onSuccess: () => {
      setWooCommerceDialog({
        isModalOpen: false,
        type: "",
      });
      queryClient.invalidateQueries({
        queryKey: ["connections"],
      });
      toast.success("Store Connected!", {
        description: "WooCommerce store connected successfully!",
      });
    },
    onError: (error) => {
      toast.error("Failed to connect store!", {
        description: error.message || "Something went wrong",
      });
    },
  });

  return {
    connectWooCommerceStore: connectWooCommerceStore.mutate,
    isConnectingWooCommerceStore: connectWooCommerceStore.isPending,
  };
};
