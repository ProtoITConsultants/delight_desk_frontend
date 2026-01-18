"use client";
import { api } from "@/lib/api";
import { GetAiAgentsSettingsDtoResponse } from "@/services/ai-agents/utils/common";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { initialAiAgentsSettings } from "./constants";

interface AiAgentsProviderType {
  isFetchingAgentsSettings: boolean;
  aiAgentsSettings: GetAiAgentsSettingsDtoResponse;
}

// Create context with default value
const AiAgentsContext = createContext<AiAgentsProviderType>({
  isFetchingAgentsSettings: false,
  aiAgentsSettings: initialAiAgentsSettings,
});

// Hook for consuming the context
export const useAiAgents = () => {
  const context = useContext(AiAgentsContext);
  if (!context) {
    throw new Error("useAiAgents must be used within a AiAgentsProvider");
  }
  return context;
};

// Provider component
export const AiAgentsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // States
  const [aiAgentsSettings, setAiAgentsSettings] =
    useState<GetAiAgentsSettingsDtoResponse>(initialAiAgentsSettings);

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["fetchAllAgentsSettings"],
    queryFn: () => api.ai_agents_service.fetchAllAgentsSettings(),
  });

  if (isError) {
    toast.error(`Error fetching AI Agents settings`, {
      description: error.message || "Please try again later.",
    });
  }

  useEffect(() => {
    if (data) {
      setAiAgentsSettings(data);
    }
  }, [data]);

  const value = {
    aiAgentsSettings,
    isFetchingAgentsSettings: isPending,
  };

  return (
    <AiAgentsContext.Provider value={value}>
      {children}
    </AiAgentsContext.Provider>
  );
};
