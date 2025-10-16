"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import { AiAgentTrainingData } from "@/modules/core/components/ai-agents/components/agent-training-data";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import HowAgentWorks from "@/modules/core/components/ai-agents/components/how-agent-works";
import TestAiAgent from "@/modules/core/components/ai-agents/components/test-ai-agent";
import AGENT_WORKFLOW_STEPS from "@/modules/core/components/ai-agents/constants/how-agent-works";
import { Bot, Brain } from "lucide-react";
import { useState } from "react";

const ProductAgentPage = () => {
  const [isAgentEnabled, setIsAgentEnabled] = useState(false);
  const [isAgentModerated, setIsAgentModerated] = useState(false);
  const [aiAgentTestQuery, setAiAgentTestQuery] = useState<string>("");

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
          isAgentEnabled={isAgentEnabled}
          onChangeAgentConfiguration={() => {
            if (isAgentEnabled) {
              setIsAgentEnabled(false);
              setIsAgentModerated(false);
            } else {
              setIsAgentEnabled(true);
            }
          }}
          agentNeedsModeration={isAgentModerated}
          onChangeAgentModeration={() => setIsAgentModerated(!isAgentModerated)}
          isChangingAgentSettings={false}
        />
        {/* Test AI Agent - Interactive Agent Preview */}
        <TestAiAgent
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
          onActionButtonClick={() => {}}
          isActionButtonDisabled={!aiAgentTestQuery.trim()}
          isGeneratingResponse={false}
          emailResponse={{
            type: "ai-agent-test",
            fromEmail: "hello@humanfoodbar.com",
            subject: "Re: Product Inquiry",
            content: `<p>Hi there!<br/><br/>Thank you for reaching out with your inquiry about our product's use of organic materials. Currently, Human Food Bar uses high-quality ingredients that are naturally sourced and GMO-free.<br/><br/>Please feel free to reach out if you have any more questions or need further assistance.</p>`,
            signature: {
              agentName: "Kai",
              agentTitle: "AI Customer Service Agent",
              companyName: "Human Food Bar",
            },
          }}
        />
      </div>
      {/* How Agent Works */}
      <HowAgentWorks
        agentWorkflowSteps={AGENT_WORKFLOW_STEPS.PRODUCT_AGENT}
        agentRequiresModeration={isAgentModerated}
      />
      {/* Agent Training Data */}
      <AiAgentTrainingData
        agentDisplayName="Product Agent"
        Icon={<Brain className="h-5 w-5" />}
        trainingRequirements={{
          agentType: "product",
          hasMinimumContent: true,
          hasRelevantContent: true,
          urlCount: 10,
          manualContentCount: 10,
          relevantChunks: 10,
          totalSources: 10,
          contentQuality: "excellent",
          warning: "Insufficient relevant content for Product Agent.",
          recommendations: [
            "Add more relevant content to your training data.",
            "Use relevant keywords in your training data.",
          ],
        }}
      />
    </AiAgentRoot>
  );
};

export default ProductAgentPage;
