import { apiService } from "@/lib/api-service";
import {
  GENERATE_NAMES_FOR_AI_IDENTITY_PARAMS,
  GENERATED_NAME_FOR_AI_IDENTITY,
  GET_AI_IDENTITY_RESPONSE,
  UPDATE_AI_IDENTITY_PARAMS,
} from "./types/ai-identity";
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
}
