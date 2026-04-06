import { api } from "@/lib/api";
import {
  UPDATE_HTML_EMAIL_SIGNATURE_PARAMS,
  UPDATE_STRUCTURED_EMAIL_SIGNATURE_PARAMS,
} from "@/services/ai-assistant/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type UseUpdateEmailSignatureParams =
  | {
      type: "structured";
      signature: UPDATE_STRUCTURED_EMAIL_SIGNATURE_PARAMS;
    }
  | {
      type: "html";
      signature: UPDATE_HTML_EMAIL_SIGNATURE_PARAMS;
    };

export const useUpdateEmailSignature = () => {
  const queryClient = useQueryClient();

  const { mutate: updateEmailSignature, isPending } = useMutation({
    mutationFn: async (params: UseUpdateEmailSignatureParams) => {
      if (params.type === "structured") {
        await api.ai_assistant_service.updateStructuredEmailSignature(
          params.signature,
        );
      } else {
        await api.ai_assistant_service.updateHtmlEmailSignature(
          params.signature,
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-signature"] });
      toast.success("Email signature updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update email signature", {
        description: error.message || "Please try again later.",
      });
    },
  });

  return {
    updateEmailSignature,
    isPending,
  };
};
