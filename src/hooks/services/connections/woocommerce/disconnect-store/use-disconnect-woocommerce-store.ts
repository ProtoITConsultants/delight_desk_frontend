import { api } from "@/lib/api";
import { useConnectionsDialogs } from "@/providers/connections/connections-dialogs-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDisconnectWooCommerceStore = () => {
  const queryClient = useQueryClient();
  const { setWooCommerceDialog } = useConnectionsDialogs();

  const disconnectWooCommerceStore = useMutation({
    mutationFn: () => api.user_connections.disconnectWooCommerceAccount(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["connections"],
      });
      toast.success("Store Disconnected!", {
        description: "WooCommerce store disconnected successfully!",
      });
      setWooCommerceDialog({
        isModalOpen: false,
        type: "",
      });
    },
    onError: (error) => {
      toast.error("Failed to disconnect store!", {
        description: error.message || "Something went wrong",
      });
    },
  });

  return {
    disconnectWooCommerceStore: disconnectWooCommerceStore.mutate,
    isRemovingWooCommerceStore: disconnectWooCommerceStore.isPending,
  };
};
