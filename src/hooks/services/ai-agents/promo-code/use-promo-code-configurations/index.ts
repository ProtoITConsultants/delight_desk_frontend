import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const promoCodeConfigurationsQueryKey = ["promo-code-configurations"] as const;

export const usePromoCodeConfigurations = (enabled = true) => {
  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: promoCodeConfigurationsQueryKey,
    queryFn: () => api.ai_agents_service.getPromoCodeConfigurations(),
    enabled,
  });

  return {
    configurations: data,
    isConfigurationsPending: isPending,
    isConfigurationsFetching: isFetching,
    isConfigurationsError: isError,
    configurationsError: error,
    refetchConfigurations: refetch,
  };
};
