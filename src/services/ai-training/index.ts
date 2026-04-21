import { apiService } from "@/lib/api-service";
import {
  GENERATE_NAMES_FOR_AI_IDENTITY_PARAMS,
  GENERATED_NAME_FOR_AI_IDENTITY,
  GET_AI_IDENTITY_RESPONSE,
  UPDATE_AI_IDENTITY_PARAMS,
} from "./types/ai-identity";
import {
  AddManualProductKnowledgeParams,
  AddUrlProductKnowledgeParams,
  DeleteProductKnowledgeSourceResponse,
  IngestProductKnowledgeManualResponse,
  IngestProductKnowledgeUrlResponse,
  ListProductKnowledgeSourcesQuery,
  ListProductKnowledgeSourcesResponse,
} from "./types/product-knowledge";
import AI_TEAM_CENTER_ENDPOINTS from "./constants";

export class AiTrainingService {
  // Get AI Identity
  getAiIdentity = async () => {
    const response = await apiService.get<GET_AI_IDENTITY_RESPONSE>(
      AI_TEAM_CENTER_ENDPOINTS.GET_AI_IDENTITY_URL,
    );

    return response;
  };
  // Update AI Identity
  updateAiIdentity = async (params: Partial<UPDATE_AI_IDENTITY_PARAMS>) => {
    const response = apiService.patch(
      AI_TEAM_CENTER_ENDPOINTS.UPDATE_AI_IDENTITY_URL,
      params,
    );

    return response;
  };
  // Generate AI Names
  generateNamesforAiIdentity = async ({
    customerDescription,
  }: GENERATE_NAMES_FOR_AI_IDENTITY_PARAMS) => {
    const res = apiService.post<GENERATED_NAME_FOR_AI_IDENTITY[]>(
      AI_TEAM_CENTER_ENDPOINTS.CREATE_NAMES_FOR_AI_IDENTITY_URL,
      {
        customerDescription,
      },
    );

    return res;
  };

  // Get Product Knowledge Sources
  getProductKnowledgeSources = async (
    params?: ListProductKnowledgeSourcesQuery,
  ) => {
    const response = await apiService.get<ListProductKnowledgeSourcesResponse>(
      AI_TEAM_CENTER_ENDPOINTS.PRODUCT_KNOWLEDGE_URL,
      { params },
    );

    return response;
  };

  // Add Manual Product Knowledge Source
  addManualProductKnowledgeSource = async (
    params: AddManualProductKnowledgeParams,
  ) => {
    const response = await apiService.post<IngestProductKnowledgeManualResponse>(
      AI_TEAM_CENTER_ENDPOINTS.PRODUCT_KNOWLEDGE_MANUAL_URL,
      params,
    );

    return response;
  };

  // Add URL Product Knowledge Source
  addUrlProductKnowledgeSource = async (params: AddUrlProductKnowledgeParams) => {
    const response = await apiService.post<IngestProductKnowledgeUrlResponse>(
      AI_TEAM_CENTER_ENDPOINTS.PRODUCT_KNOWLEDGE_SOURCE_URL,
      params,
    );

    return response;
  };

  // Delete Product Knowledge Source
  deleteProductKnowledgeSource = async (sourceId: string) => {
    const response = await apiService.delete<DeleteProductKnowledgeSourceResponse>(
      `${AI_TEAM_CENTER_ENDPOINTS.PRODUCT_KNOWLEDGE_URL}/${encodeURIComponent(sourceId)}`,
    );

    return response;
  };
}
