// Agent Page Root
type AI_AGENT_ROOT_PROPS = {
  className?: string;
  children: React.ReactNode;
};

// Agent Header
type AI_AGENT_HEADER_PROPS = {
  className?: string;
  Icon?: React.ReactNode;
  title: string;
  description: string;
  hasRightSection?: boolean;
  rightSection?: React.ReactNode;
  rightSectionClassName?: string;
};

// Agent Settings
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

// What Agent Handles
type WHAT_AGENT_HANDLES_PROPS = {
  className?: string;
  agentFeatures: string[];
};

// How Agent Work
type AGENT_WORKFLOW_CARD_PROPS = {
  title: string;
  description: string;
  icon: React.ReactNode;
  moderationDescription?: string;
};

type HOW_AGENT_WORKS_PROPS = {
  className?: string;
  agentWorkflowClassName?: string;
  agentWorkflowSteps: AGENT_WORKFLOW_CARD_PROPS[];
  agentRequiresModeration?: boolean;
};

export type {
  AI_AGENT_ROOT_PROPS,
  AI_AGENT_HEADER_PROPS,
  AI_AGENT_SETTINGS_PROPS,
  WHAT_AGENT_HANDLES_PROPS,
  AGENT_WORKFLOW_CARD_PROPS,
  HOW_AGENT_WORKS_PROPS,
};
