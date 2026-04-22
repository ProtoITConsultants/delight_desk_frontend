import { TestWismoAgentResponse } from "@/services/ai-agents/utils/wismo-agent";
import { ProductKnowledgeSource } from "@/services/ai-training/types/product-knowledge";

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
  enableAgentButtonDescription?: string;
  settingsTipTitle?: string;
  settingsTip?: string;
  isAgentEnabled: boolean;
  onChangeAgentConfiguration: () => void;
  agentNeedsModeration: boolean;
  onChangeAgentModeration: () => void;
  disableAgentSettings: boolean;
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

// AI Response Preview
interface AI_RESPONSE_PREVIEW_PROPS extends TestWismoAgentResponse {
  className?: string;
  responsePreviewType: "default" | "ai-agent-test";
}

// Test AI Agent
type TEST_AI_AGENT_PROPS = {
  className?: string;
  instructions: string;
  contentClassName?: string;
  InputField: React.ReactNode;
  actionButtonTitle?: string;
  isActionButtonDisabled: boolean;
  query: string;
  responsePreviewType: "default" | "ai-agent-test";
};

// Agent Training Data
type AGENT_TRAINING_REQUIREMENTS = {
  agentType: string;
  hasMinimumContent: boolean;
  hasRelevantContent: boolean;
  urlCount: number;
  manualContentCount: number;
  relevantChunks: number;
  totalSources: number;
  contentQuality: "insufficient" | "basic" | "good" | "excellent";
  recommendations: string[];
  warning?: string;
};

type AI_AGENT_TRAINING_DATA_PROPS = {
  className?: string;
  agentDisplayName: string;
  Icon?: React.ReactNode;
  urlSources?: ProductKnowledgeSource[];
  manualSources?: ProductKnowledgeSource[];
  onAddUrl?: (url: string) => void;
  onAddManual?: (data: { title: string; content: string }) => Promise<boolean>;
  onDelete?: (sourceId: string) => void;
  isAddingUrl?: boolean;
  isAddingManual?: boolean;
  isDeleting?: boolean;
  isFetchingSources?: boolean;
};

export type {
  AI_AGENT_ROOT_PROPS,
  AI_AGENT_HEADER_PROPS,
  AI_AGENT_SETTINGS_PROPS,
  WHAT_AGENT_HANDLES_PROPS,
  AGENT_WORKFLOW_CARD_PROPS,
  HOW_AGENT_WORKS_PROPS,
  TEST_AI_AGENT_PROPS,
  AI_RESPONSE_PREVIEW_PROPS,
  AI_AGENT_TRAINING_DATA_PROPS,
};
