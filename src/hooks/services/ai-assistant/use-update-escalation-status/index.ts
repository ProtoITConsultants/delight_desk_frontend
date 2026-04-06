import { api } from "@/lib/api";
import { EscalationStatus } from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import { useAiAssistant } from "@/providers/ai-assistant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type UseUpdateEscalationStatusParams = {
  type: "bulk" | "single";
  escalationIds: string[];
  status: EscalationStatus;
};

export const useUpdateEscalationStatus = () => {
  const queryClient = useQueryClient();
  const { searchQuery, escalationStatus, setSelectedEmailsForBulkAction } =
    useAiAssistant();

  const { mutate: updateEscalationStatus, isPending } = useMutation({
    mutationFn: async (params: UseUpdateEscalationStatusParams) => {
      if (params.type === "single") {
        await api.ai_assistant_service.updateEscalationStatus({
          escalationId: params.escalationIds[0],
          status: params.status,
        });
      } else {
        await api.ai_assistant_service.bulkUpdateEscalationStatus({
          escalationIds: params.escalationIds,
          status: params.status,
        });
      }
    },
    onSuccess: () => {
      setSelectedEmailsForBulkAction(new Set());
      queryClient.invalidateQueries({
        queryKey: ["escalation-list", searchQuery, escalationStatus],
      });
      toast.success("Escalation status updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update escalation status", {
        description: error.message || "Please try again later.",
      });
    },
  });

  return {
    updateEscalationStatus,
    isPending,
  };
};
