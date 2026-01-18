import { api } from "@/lib/api";
import { UpdateSettingsOfSpecificAgentParams } from "@/services/ai-agents/utils/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateSpecificAIAgentSettings = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async ({
      params,
      onSuccessCallback,
    }: {
      params: UpdateSettingsOfSpecificAgentParams;
      onSuccessCallback?: () => void;
    }) => {
      const res =
        await api.ai_agents_service.updateSettingsOfSpecificAgent(params);
      if (onSuccessCallback) {
        onSuccessCallback();
      }

      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchAllAgentsSettings"] });
      toast.success("Settings updated successfully");
    },

    onError: (error) => {
      toast.error("Error updating settings", {
        description: error.message || "Please try again!",
      });
    },
  });

  return { isUpdating: isPending, updateAIAgentSettings: mutate };
};
