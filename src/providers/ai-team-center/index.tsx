import { api } from "@/lib/api";
import {
  GENERATE_NAMES_FOR_AI_IDENTITY_PARAMS,
  GENERATED_NAME_FOR_AI_IDENTITY,
  GET_AI_IDENTITY_RESPONSE,
  UPDATE_AI_IDENTITY_PARAMS,
} from "@/services/ai-training/types/ai-identity";
import {
  AddManualProductKnowledgeParams,
  AddUrlProductKnowledgeParams,
  ProductKnowledgeSource,
} from "@/services/ai-training/types/product-knowledge";
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
  productKnowledgeSources: ProductKnowledgeSource[];
  addManualProductKnowledgeSource: (
    params: AddManualProductKnowledgeParams,
  ) => Promise<boolean>;
  addUrlProductKnowledgeSource: (
    params: AddUrlProductKnowledgeParams,
  ) => Promise<boolean>;
  deleteProductKnowledgeSource: (sourceId: string) => void;
  refetchProductKnowledgeSources: () => void;
  aiIdentity: GET_AI_IDENTITY_RESPONSE | undefined;
  isLoading: boolean;
  isFetchingProductKnowledgeSources: boolean;
  isAddingManualSource: boolean;
  isAddingUrlSource: boolean;
  isDeletingSource: boolean;
};

const AiTeamCenterContext = createContext<AiTeamCenterContextType>({
  generatedAgentNames: [],
  setGeneratedAgentNames: () => {},
  updateAiIdentity: () => {},
  generateNamesForAiIdentity: () => {},
  productKnowledgeSources: [],
  addManualProductKnowledgeSource: async () => false,
  addUrlProductKnowledgeSource: async () => false,
  deleteProductKnowledgeSource: () => {},
  refetchProductKnowledgeSources: () => {},
  aiIdentity: undefined,
  isLoading: false,
  isFetchingProductKnowledgeSources: false,
  isAddingManualSource: false,
  isAddingUrlSource: false,
  isDeletingSource: false,
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

  const {
    data: productKnowledgeSources,
    isError: isProductKnowledgeError,
    isPending: isFetchingProductKnowledgeSources,
    error: productKnowledgeError,
    refetch: refetchProductKnowledgeSources,
  } = useQuery({
    queryKey: ["product-knowledge-sources"],
    queryFn: () => api.ai_team_center_service.getProductKnowledgeSources(),
    refetchInterval: (query) => {
      const sources = query.state.data ?? [];
      const hasProcessingSource = sources.some(
        (source) => source.status === "processing",
      );
      return hasProcessingSource ? 5000 : false;
    },
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

  const addManualProductKnowledgeSource = useMutation({
    mutationFn: (params: AddManualProductKnowledgeParams) =>
      api.ai_team_center_service.addManualProductKnowledgeSource(params),
    onError: (error) => {
      toast.error("Error adding manual product knowledge source", {
        description: error.message || "Please try again!",
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["product-knowledge-sources"],
      });
      await refetchProductKnowledgeSources();
      toast.success("Manual knowledge source added");
    },
  });

  const addUrlProductKnowledgeSource = useMutation({
    mutationFn: (params: AddUrlProductKnowledgeParams) =>
      api.ai_team_center_service.addUrlProductKnowledgeSource(params),
    onError: (error) => {
      toast.error("Error adding URL product knowledge source", {
        description: error.message || "Please try again!",
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["product-knowledge-sources"],
      });
      await refetchProductKnowledgeSources();
      toast.success("URL knowledge source added");
    },
  });

  const deleteProductKnowledgeSource = useMutation({
    mutationFn: (sourceId: string) =>
      api.ai_team_center_service.deleteProductKnowledgeSource(sourceId),
    onError: (error) => {
      toast.error("Error deleting product knowledge source", {
        description: error.message || "Please try again!",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-knowledge-sources"],
      });
      toast.success("Knowledge source removed");
    },
  });

  if (isError) {
    toast.error("Error fetching AI Identity", {
      description: error.message || "Please try again!",
    });
  }

  if (isProductKnowledgeError) {
    toast.error("Error fetching product knowledge sources", {
      description: productKnowledgeError.message || "Please try again!",
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
      productKnowledgeSources: productKnowledgeSources ?? [],
      addManualProductKnowledgeSource: async (
        params: AddManualProductKnowledgeParams,
      ) => {
        try {
          await addManualProductKnowledgeSource.mutateAsync(params);
          return true;
        } catch {
          return false;
        }
      },
      addUrlProductKnowledgeSource: async (params: AddUrlProductKnowledgeParams) => {
        try {
          await addUrlProductKnowledgeSource.mutateAsync(params);
          return true;
        } catch {
          return false;
        }
      },
      deleteProductKnowledgeSource: (sourceId: string) =>
        deleteProductKnowledgeSource.mutate(sourceId),
      refetchProductKnowledgeSources: () => {
        void refetchProductKnowledgeSources();
      },
      aiIdentity: data,
      isLoading:
        isPending ||
        generateNamesForAiIdentity.isPending ||
        updateAiIdentity.isPending ||
        addManualProductKnowledgeSource.isPending ||
        addUrlProductKnowledgeSource.isPending ||
        deleteProductKnowledgeSource.isPending,
      isFetchingProductKnowledgeSources,
      isAddingManualSource: addManualProductKnowledgeSource.isPending,
      isAddingUrlSource: addUrlProductKnowledgeSource.isPending,
      isDeletingSource: deleteProductKnowledgeSource.isPending,
    };
  }, [
    generatedAgentNames,
    setGeneratedAgentNames,
    updateAiIdentity,
    generateNamesForAiIdentity,
    productKnowledgeSources,
    addManualProductKnowledgeSource,
    addUrlProductKnowledgeSource,
    deleteProductKnowledgeSource,
    refetchProductKnowledgeSources,
    data,
    isPending,
    isFetchingProductKnowledgeSources,
  ]);

  return (
    <AiTeamCenterContext.Provider value={value}>
      {children}
    </AiTeamCenterContext.Provider>
  );
};
