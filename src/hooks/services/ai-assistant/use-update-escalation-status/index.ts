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
  const { setSelectedEmailsForBulkAction } = useAiAssistant();

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
      // Invalidate all variants of the escalation list (different filters,
      // pages, date ranges) and the stats so the strip reflects the change
      // immediately even when SSE is delayed.
      queryClient.invalidateQueries({ queryKey: ["escalation-list"] });
      queryClient.invalidateQueries({ queryKey: ["escalation-stats"] });
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
