"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateSpecificAIAgentSettings } from "@/hooks/services/ai-agents/use-update-specific-ai-agent-settings";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import { AiAgentTrainingData } from "@/modules/core/components/ai-agents/components/agent-training-data";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import HowAgentWorks from "@/modules/core/components/ai-agents/components/how-agent-works";
import TestProductAgent from "@/modules/core/components/ai-agents/components/test-ai-agent/product-agent";
import AGENT_WORKFLOW_STEPS from "@/modules/core/components/ai-agents/constants/how-agent-works";
import { useAiAgents } from "@/providers/ai-agents";
import {
  AiTeamCenterProvider,
  useAiTeamCenter,
} from "@/providers/ai-team-center";
import { Bot, Brain } from "lucide-react";
import { useMemo, useState } from "react";

const ProductAgentPageInner = () => {
  const {
    aiAgentsSettings: { product },
  } = useAiAgents();
  const { updateAIAgentSettings, isUpdating } =
    useUpdateSpecificAIAgentSettings();
  const [aiAgentTestQuery, setAiAgentTestQuery] = useState<string>("");

  const {
    productKnowledgeSources,
    addUrlProductKnowledgeSource,
    addManualProductKnowledgeSource,
    deleteProductKnowledgeSource,
    isAddingUrlSource,
    isAddingManualSource,
    isDeletingSource,
    isFetchingProductKnowledgeSources,
  } = useAiTeamCenter();

  const { urlSources, manualSources } = useMemo(
    () => ({
      urlSources: productKnowledgeSources.filter(
        (source) => source.sourceType === "url",
      ),
      manualSources: productKnowledgeSources.filter(
        (source) => source.sourceType === "manual",
      ),
    }),
    [productKnowledgeSources],
  );

  return (
    <AiAgentRoot>
      {/* Header */}
      <AiAgentHeader
        Icon={
          <div className="p-2 bg-primary/10 rounded-lg">
            <Brain className="h-6 w-6 text-primary" />
          </div>
        }
        title="Product Agent"
        description="Automate responses to product questions and brand inquiries."
      />
      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgentSettings
          agentName="Product Agent"
          agentIcon={<Bot className="h-5 w-5" />}
          agentDescription="Configure how the Product Agent handles product related inquiries."
          enableAgentButtonDescription="Automatically respond to product features, specifications, compatibility, and brand inquiries."
          isAgentEnabled={product.isEnabled}
          onChangeAgentConfiguration={() => {
            if (product?.isEnabled) {
              updateAIAgentSettings({
                params: {
                  agentId: product.id,
                  isEnabled: false,
                  requiresModeration: false,
                },
              });
            } else {
              updateAIAgentSettings({
                params: {
                  agentId: product.id,
                  isEnabled: true,
                },
              });
            }
          }}
          agentNeedsModeration={product.requiresModeration}
          onChangeAgentModeration={() =>
            updateAIAgentSettings({
              params: {
                agentId: product.id,
                requiresModeration: !product.requiresModeration,
              },
            })
          }
          disableAgentSettings={isUpdating}
        />
        {/* Test AI Agent - Interactive Agent Preview */}
        <TestProductAgent
          instructions="Enter a customer question to see how your Product Agent responds using your training data."
          InputField={
            <div className="flex flex-col gap-2">
              <Label>Customer Question</Label>
              <Textarea
                value={aiAgentTestQuery}
                onChange={(e) => setAiAgentTestQuery(e.target.value)}
                placeholder="Enter a customer question to test your agent..."
              />
            </div>
          }
          isActionButtonDisabled={!aiAgentTestQuery.trim()}
          query={aiAgentTestQuery}
          responsePreviewType="ai-agent-test"
        />
      </div>
      {/* How Agent Works */}
      <HowAgentWorks
        agentWorkflowSteps={AGENT_WORKFLOW_STEPS.PRODUCT_AGENT}
        agentRequiresModeration={product.requiresModeration}
      />
      {/* Agent Training Data */}
      <AiAgentTrainingData
        agentDisplayName="Product Agent"
        Icon={<Brain className="h-5 w-5" />}
        urlSources={urlSources}
        manualSources={manualSources}
        onAddUrl={(url) => {
          void addUrlProductKnowledgeSource({ url });
        }}
        onAddManual={(data) => addManualProductKnowledgeSource(data)}
        onDelete={deleteProductKnowledgeSource}
        isAddingUrl={isAddingUrlSource}
        isAddingManual={isAddingManualSource}
        isDeleting={isDeletingSource}
        isFetchingSources={isFetchingProductKnowledgeSources}
      />
    </AiAgentRoot>
  );
};

const ProductAgentPage = () => (
  <AiTeamCenterProvider>
    <ProductAgentPageInner />
  </AiTeamCenterProvider>
);

export default ProductAgentPage;
