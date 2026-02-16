import { api } from "@/lib/api";
import { GENERATE_AI_RESPONSE_PARAMS } from "@/services/ai-assistant/utils/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGenerateAiResponse = () => {
  const {
    mutate: generateAiResponse,
    isPending,
    data,
  } = useMutation({
    mutationFn: async ({
      escalationId,
      instruction,
    }: GENERATE_AI_RESPONSE_PARAMS) =>
      api.ai_assistant_service.generateAiResponse({
        escalationId,
        instruction,
      }),
    onSuccess: () => toast.success("AI response generated successfully"),
    onError: (error) => {
      toast.error("Failed to generate AI response", {
        description: error.message || "Please try again later.",
      });
    },
  });

  return {
    generateAiResponse,
    isPending,
    aiResponse: data,
  };
};
