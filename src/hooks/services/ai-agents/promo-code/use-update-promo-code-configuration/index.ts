import { promoCodeConfigurationsQueryKey } from "@/hooks/services/ai-agents/promo-code/use-promo-code-configurations";
import { api } from "@/lib/api";
import type { UpdatePromoCodeConfigurationPayload } from "@/services/ai-agents/utils/promo-code";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdatePromoCodeConfiguration = () => {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({
      configId,
      payload,
    }: {
      configId: string;
      payload: UpdatePromoCodeConfigurationPayload;
    }) => api.ai_agents_service.updatePromoCodeConfiguration({ configId, payload }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: promoCodeConfigurationsQueryKey,
      });
      toast.success("Promo code configuration updated");
    },
    onError: (err: Error) => {
      toast.error("Failed to update configuration", {
        description: err.message,
      });
    },
  });

  return {
    isUpdating: isPending,
    updateConfiguration: mutateAsync,
  };
};
