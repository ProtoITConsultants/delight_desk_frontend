import { api } from "@/lib/api";
import { SEND_ESCALATION_RESPONSE_PARAMS } from "@/services/ai-assistant/utils/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSendEscalationResponse = () => {
  const { mutate: sendEscalationResponse, isPending } = useMutation({
    mutationFn: async ({
      escalationId,
      message,
      includeEmailSignature,
    }: SEND_ESCALATION_RESPONSE_PARAMS) =>
      api.ai_assistant_service.sendEscalationResponse({
        escalationId,
        message,
        includeEmailSignature,
      }),
    onSuccess: () => toast.success("Escalation response sent successfully"),
    onError: (error) => {
      toast.error("Failed to send escalation response", {
        description: error.message || "Please try again later.",
      });
    },
  });

  return {
    sendEscalationResponse,
    isPending,
  };
};
