import { promoCodeConfigurationsQueryKey } from "@/hooks/services/ai-agents/promo-code/use-promo-code-configurations";
import { api } from "@/lib/api";
import type { CreatePromoCodeConfigurationPayload } from "@/services/ai-agents/utils/promo-code";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePromoCodeConfiguration = () => {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (payload: CreatePromoCodeConfigurationPayload) =>
      api.ai_agents_service.createPromoCodeConfiguration(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: promoCodeConfigurationsQueryKey,
      });
      toast.success("Promo code configuration created");
    },
    onError: (err: Error) => {
      toast.error("Failed to create configuration", {
        description: err.message,
      });
    },
  });

  return {
    isCreating: isPending,
    createConfiguration: mutateAsync,
  };
};
