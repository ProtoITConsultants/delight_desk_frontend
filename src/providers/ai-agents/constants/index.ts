import { GetAiAgentsSettingsDtoResponse } from "@/services/ai-agents/utils/common";
import { AiAgentsEnum } from "@/types/ai-agents";

const AiAgentDefaultSettings = {
  id: "",
  isEnabled: false,
  requiresModeration: false,
  name: "",
  description: "",
  icon: "",
};

export const initialAiAgentsSettings: GetAiAgentsSettingsDtoResponse = {
  [AiAgentsEnum.WISMO_AGENT]: {
    ...AiAgentDefaultSettings,
    type: AiAgentsEnum.WISMO_AGENT,
  },
  [AiAgentsEnum.SUBSCRIPTION_AGENT]: {
    ...AiAgentDefaultSettings,
    type: AiAgentsEnum.SUBSCRIPTION_AGENT,
  },
  [AiAgentsEnum.PRODUCT_AGENT]: {
    ...AiAgentDefaultSettings,
    type: AiAgentsEnum.PRODUCT_AGENT,
  },
  [AiAgentsEnum.RETURNS_AGENT]: {
    ...AiAgentDefaultSettings,
    type: AiAgentsEnum.RETURNS_AGENT,
  },
  [AiAgentsEnum.PROMO_CODE_AGENT]: {
    ...AiAgentDefaultSettings,
    type: AiAgentsEnum.PROMO_CODE_AGENT,
  },
  [AiAgentsEnum.ADDRESS_CHANGE_AGENT]: {
    ...AiAgentDefaultSettings,
    type: AiAgentsEnum.ADDRESS_CHANGE_AGENT,
  },
  [AiAgentsEnum.ORDER_CANCELLATION_AGENT]: {
    ...AiAgentDefaultSettings,
    type: AiAgentsEnum.ORDER_CANCELLATION_AGENT,
  },
};
