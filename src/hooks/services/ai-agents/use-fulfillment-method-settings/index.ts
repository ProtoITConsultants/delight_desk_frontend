import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const FULFILLMENT_METHOD_SETTINGS_QUERY_KEY = [
  "fulfillmentMethodSettings",
];

export const useFulfillmentMethodSettings = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: FULFILLMENT_METHOD_SETTINGS_QUERY_KEY,
    queryFn: () => api.ai_agents_service.getFulfillmentMethodSettings(),
  });

  if (isError) {
    toast.error("Error fetching fulfillment method settings", {
      description: error.message || "Please try again later.",
    });
  }

  return {
    fulfillmentMethodSettings: data,
    isFetchingFulfillmentMethodSettings: isPending,
  };
};
