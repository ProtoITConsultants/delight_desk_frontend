import { apiService } from "@/lib/api-service";
import {
  convertAiAgentSettingsToDto,
  GetAiAgentsSettingsResponse,
  UpdateSettingsOfSpecificAgentParams,
  UpdateSettingsOfSpecificAgentResponse,
} from "./utils/common";
import AI_AGENTS_SETTINGS from "./constants";
import {
  TestWismoAgentParams,
  TestWismoAgentResponse,
} from "./utils/wismo-agent";

export class AIAgentsService {
  // Fetch All Agents' Settings
  fetchAllAgentsSettings = async () => {
    const response = await apiService.get<GetAiAgentsSettingsResponse>(
      AI_AGENTS_SETTINGS.GET_ALL_AGENTS_SETTINGS_URL,
    );

    const dto = convertAiAgentSettingsToDto(response);

    return dto;
  };

  // Update Ai Agent's Settings
  updateSettingsOfSpecificAgent = async ({
    agentId,
    isEnabled,
    requiresModeration,
  }: UpdateSettingsOfSpecificAgentParams) => {
    // Include only the provided parameters
    const payload: Partial<UpdateSettingsOfSpecificAgentParams> = {};
    if (isEnabled !== undefined) payload.isEnabled = isEnabled;
    if (requiresModeration !== undefined)
      payload.requiresModeration = requiresModeration;

    const response =
      await apiService.patch<UpdateSettingsOfSpecificAgentResponse>(
        AI_AGENTS_SETTINGS.UPDATE_AGENT_SETTINGS_URL({ agentId }),
        payload,
      );
    return response;
  };

  // Test Wismo Agent
  testWismoAgent = async ({ query }: TestWismoAgentParams) => {
    const response = await apiService.post<TestWismoAgentResponse>(
      AI_AGENTS_SETTINGS.TEST_WISMO_AGENT_URL,
      { query },
    );
    return response;
  };
}
