import { api } from "@/lib/api";
import {
  UpdateFulfillmentMethodSettingsParams,
  UpdateFulfillmentMethodSettingsResponse,
} from "@/services/ai-agents/utils/fulfillment-method";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FULFILLMENT_METHOD_SETTINGS_QUERY_KEY } from "../use-fulfillment-method-settings";

export const useUpdateFulfillmentMethodSettings = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async ({
      params,
      onSuccessCallback,
    }: {
      params: UpdateFulfillmentMethodSettingsParams;
      onSuccessCallback?: () => void;
    }): Promise<UpdateFulfillmentMethodSettingsResponse> => {
      const response =
        await api.ai_agents_service.updateFulfillmentMethodSettings(params);

      if (onSuccessCallback) {
        onSuccessCallback();
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FULFILLMENT_METHOD_SETTINGS_QUERY_KEY,
      });
      queryClient.invalidateQueries({
        queryKey: ["connections"],
      });
      toast.success("Fulfillment method updated successfully");
    },
    onError: (error) => {
      toast.error("Error updating fulfillment method", {
        description: error.message || "Please try again!",
      });
    },
  });

  return {
    isUpdatingFulfillmentMethod: isPending,
    updateFulfillmentMethod: mutate,
  };
};
