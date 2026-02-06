import { api } from "@/lib/api";
import {
  GENERATE_NAMES_FOR_AI_IDENTITY_PARAMS,
  GENERATED_NAME_FOR_AI_IDENTITY,
  GET_AI_IDENTITY_RESPONSE,
  UPDATE_AI_IDENTITY_PARAMS,
} from "@/services/ai-training/types/ai-identity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, FC, useContext, useMemo, useState } from "react";
import { toast } from "sonner";

type AiTeamCenterContextType = {
  generatedAgentNames: GENERATED_NAME_FOR_AI_IDENTITY[];
  setGeneratedAgentNames: React.Dispatch<
    React.SetStateAction<GENERATED_NAME_FOR_AI_IDENTITY[]>
  >;
  updateAiIdentity: (params: Partial<UPDATE_AI_IDENTITY_PARAMS>) => void;
  generateNamesForAiIdentity: (
    params: GENERATE_NAMES_FOR_AI_IDENTITY_PARAMS,
  ) => void;
  aiIdentity: GET_AI_IDENTITY_RESPONSE | undefined;
  isLoading: boolean;
};

const AiTeamCenterContext = createContext<AiTeamCenterContextType>({
  generatedAgentNames: [],
  setGeneratedAgentNames: () => {},
  updateAiIdentity: () => {},
  generateNamesForAiIdentity: () => {},
  aiIdentity: undefined,
  isLoading: false,
});

export const useAiTeamCenter = (): AiTeamCenterContextType => {
  const context = useContext(AiTeamCenterContext);
  if (!context) {
    throw new Error(
      "useAiTeamCenter must be used within a AiTeamCenterProvider",
    );
  }
  return context;
};

export const AiTeamCenterProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const [generatedAgentNames, setGeneratedAgentNames] = useState<
    GENERATED_NAME_FOR_AI_IDENTITY[]
  >([]);

  const { data, isError, isPending, error } = useQuery({
    queryKey: ["ai-identity"],
    queryFn: () => api.ai_team_center_service.getAiIdentity(),
  });

  const updateAiIdentity = useMutation({
    mutationFn: (params: Partial<UPDATE_AI_IDENTITY_PARAMS>) =>
      api.ai_team_center_service.updateAiIdentity(params),
    onError: (error) => {
      toast.error("Error updating AI Identity", {
        description: error.message || "Please try again!",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ai-identity"],
      });
      toast.success("AI Identity updated successfully");
    },
  });

  const generateNamesForAiIdentity = useMutation({
    mutationFn: (params: GENERATE_NAMES_FOR_AI_IDENTITY_PARAMS) =>
      api.ai_team_center_service.generateNamesforAiIdentity(params),
    onError: (error) => {
      toast.error("Error generating names for AI Identity", {
        description: error.message || "Please try again!",
      });
    },
    onSuccess: (data) => {
      setGeneratedAgentNames(data);
    },
  });

  if (isError) {
    toast.error("Error fetching AI Identity", {
      description: error.message || "Please try again!",
    });
  }

  const value = useMemo(() => {
    return {
      generatedAgentNames,
      setGeneratedAgentNames,
      updateAiIdentity: (params: Partial<UPDATE_AI_IDENTITY_PARAMS>) =>
        updateAiIdentity.mutate(params),
      generateNamesForAiIdentity: (
        params: GENERATE_NAMES_FOR_AI_IDENTITY_PARAMS,
      ) => generateNamesForAiIdentity.mutate(params),
      aiIdentity: data,
      isLoading:
        isPending ||
        generateNamesForAiIdentity.isPending ||
        updateAiIdentity.isPending,
    };
  }, [
    generatedAgentNames,
    setGeneratedAgentNames,
    updateAiIdentity,
    generateNamesForAiIdentity,
    data,
    isPending,
  ]);

  return (
    <AiTeamCenterContext.Provider value={value}>
      {children}
    </AiTeamCenterContext.Provider>
  );
};
