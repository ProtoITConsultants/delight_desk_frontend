import { AiAgentsEnum } from "@/types/ai-agents";

export type AiAgentInfo = {
  id: string;
  name: string;
  description: string;
  type: AiAgentsEnum;
  icon: string;
  isEnabled: boolean;
  requiresModeration: boolean;
};

export type GetAiAgentsSettingsResponse = AiAgentInfo[];

export type GetAiAgentsSettingsDtoResponse = {
  [K in AiAgentsEnum]: AiAgentInfo;
};

export const convertAiAgentSettingsToDto = (
  data: GetAiAgentsSettingsResponse,
): GetAiAgentsSettingsDtoResponse => {
  const result: Partial<GetAiAgentsSettingsDtoResponse> = {};

  for (const agent of data) {
    result[agent.type] = agent;
  }

  return result as GetAiAgentsSettingsDtoResponse;
};

// Update Settings
export type UpdateSettingsOfSpecificAgentParams = {
  agentId: string;
  isEnabled?: boolean;
  requiresModeration?: boolean;
};

export type UpdateSettingsOfSpecificAgentResponse =
  | {
      message: string;
      statusCode: 409;
    }
  | {
      message: string;
      statusCode: 200;
    };
