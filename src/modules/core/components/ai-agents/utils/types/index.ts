type AI_AGENT_ROOT_PROPS = {
  className?: string;
  children: React.ReactNode;
};

type AI_AGENT_HEADER_PROPS = {
  className?: string;
  Icon?: React.ReactNode;
  title: string;
  description: string;
  hasRightSection?: boolean;
  rightSection?: React.ReactNode;
  rightSectionClassName?: string;
};

type AI_AGENT_SETTINGS_PROPS = {
  agentName: string;
  agentIcon: React.ReactNode;
  agentDescription: string;
  settingsTipTitle?: string;
  settingsTip?: boolean;
  isAgentEnabled: boolean;
  onChangeAgentConfiguration: () => void;
  agentNeedsModeration: boolean;
  onChangeAgentModeration: () => void;
  isChangingAgentSettings: boolean;
};

type WHAT_AGENT_HANDLES_PROPS = {
  className?: string;
  agentFeatures: string[];
};

export type {
  AI_AGENT_ROOT_PROPS,
  AI_AGENT_HEADER_PROPS,
  AI_AGENT_SETTINGS_PROPS,
  WHAT_AGENT_HANDLES_PROPS,
};
