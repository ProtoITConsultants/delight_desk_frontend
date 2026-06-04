import { api } from "@/lib/api";
import {
  TestProductAgentParams,
  TestProductAgentResponse,
} from "@/services/ai-agents/utils/product-agent";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const useTestProductAgent = () => {
  const [agentResponse, setAgentResponse] =
    useState<TestProductAgentResponse | null>(null);

  const { isPending, mutate } = useMutation({
    mutationFn: (params: TestProductAgentParams) =>
      api.ai_agents_service.testProductAgent(params),
    onSuccess: (data) => {
      setAgentResponse(data);
    },
    onError: (error) => {
      toast.error("Failed to test WISMO Agent.", {
        description: error?.message ?? "An unexpected error occurred.",
      });
    },
  });

  return {
    isTesting: isPending,
    testWismoAgent: mutate,
    agentResponse,
  };
};
