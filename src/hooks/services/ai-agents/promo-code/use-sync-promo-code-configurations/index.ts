import { promoCodeConfigurationsQueryKey } from "@/hooks/services/ai-agents/promo-code/use-promo-code-configurations";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSyncPromoCodeConfigurations = () => {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => api.ai_agents_service.syncPromoCodeConfigurations(),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: promoCodeConfigurationsQueryKey,
      });
      toast.success("WooCommerce sync complete", {
        description: `Synced: ${data.synced}, failed: ${data.failed}`,
      });
    },
    onError: (err: Error) => {
      toast.error("Sync failed", { description: err.message });
    },
  });

  return {
    isSyncing: isPending,
    syncConfigurations: mutateAsync,
  };
};
