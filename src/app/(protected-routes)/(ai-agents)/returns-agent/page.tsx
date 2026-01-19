"use client";
import AgentSettings from "@/modules/core/components/ai-agents/components/agent-settings";
import AiAgentHeader from "@/modules/core/components/ai-agents/components/ai-agent-header";
import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import EmailResponseSamplePreview from "@/modules/core/components/ai-agents/components/email-response-preview";
import ReturnPolicyConfigForm from "@/modules/protected-routes/ai-agents/returns-agent/components/return-policy-config-form";
import ReturnPolicyConfigRoot from "@/modules/protected-routes/ai-agents/returns-agent/components/return-policy-root";
import { Bot, Package } from "lucide-react";
import { useState } from "react";

const ReturnsAgentPage = () => {
  const [isAgentEnabled, setIsAgentEnabled] = useState(false);
  const [isAgentModerated, setIsAgentModerated] = useState(false);

  return (
    <AiAgentRoot className="max-w-7xl">
      {/* Header */}
      <AiAgentHeader
        Icon={
          <div className="p-2 bg-orange-600/10 rounded-lg">
            <Package className="h-6 w-6 text-orange-600" />
          </div>
        }
        title="Returns Agent"
        description="Automate return and refund processing based on your business policies. Handle simple auto-approvals or complex eligibility evaluations."
      />
      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgentSettings
          agentName="Returns Agent"
          agentIcon={<Bot className="h-5 w-5" />}
          agentDescription="Configure how the Returns Agent handles return and refund requests."
          enableAgentButtonDescription="Automatically process return and refund requests."
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
          disableAgentSettings={false}
        />
        <EmailResponseSamplePreview
          responsePreviewType="default"
          from="hello@humanfoodbar.com"
          to="hello@humanfoodbar.com"
          {...{
            type: "default",
            fromEmail: "hello@humanfoodbar.com",
            subject: "Re: Return Request Approved",
            body: `<p>I understand you'd like to return your recent order.<br/><br/>Based on our return policy, your order #12345 is eligible for a full refund. Here's what you need to do:<br/><br/><ol><li>Pack your items in their original packaging</li><li>Print the prepaid return label: [Return Label Link]</li><li>Drop off at any USPS location</li></ol><br/><br/>Your refund will be processed within 3-5 business days once we receive your return.<br/><br/>Is there anything else I can help you with regarding your return?</p>`,
            signature: `Kai<br/>AI Customer Service Agent<br/>Human Food Bar`,
          }}
          hasTracking={false}
        />
      </div>
      <ReturnPolicyConfigRoot>
        <ReturnPolicyConfigForm />
      </ReturnPolicyConfigRoot>
    </AiAgentRoot>
  );
};

export default ReturnsAgentPage;
