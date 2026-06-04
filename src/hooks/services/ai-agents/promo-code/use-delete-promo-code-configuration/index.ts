import { promoCodeConfigurationsQueryKey } from "@/hooks/services/ai-agents/promo-code/use-promo-code-configurations";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeletePromoCodeConfiguration = () => {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (configId: string) =>
      api.ai_agents_service.deletePromoCodeConfiguration(configId),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: promoCodeConfigurationsQueryKey,
      });
      toast.success(data.message);
    },
    onError: (err: Error) => {
      toast.error("Failed to delete configuration", {
        description: err.message,
      });
    },
  });

  return {
    isDeleting: isPending,
    deleteConfiguration: mutateAsync,
  };
};
