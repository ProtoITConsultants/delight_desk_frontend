import { api } from "@/lib/api";
import {
  TestWismoAgentParams,
  TestWismoAgentResponse,
} from "@/services/ai-agents/utils/wismo-agent";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const useTestWismoAgent = () => {
  const [agentResponse, setAgentResponse] =
    useState<TestWismoAgentResponse | null>(null);

  const { isPending, mutate } = useMutation({
    mutationFn: (params: TestWismoAgentParams) =>
      api.ai_agents_service.testWismoAgent(params),
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
