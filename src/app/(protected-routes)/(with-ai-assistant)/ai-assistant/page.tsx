"use client";
import AiAssistantHeader from "@/modules/protected-routes/ai-assistant/components/ai-assistant-header";
import AiAssistantTabs from "@/modules/protected-routes/ai-assistant/components/ai-assistant-tabs";
import EscalationStatsStrip from "@/modules/protected-routes/ai-assistant/components/escalation-stats-strip";

const AiAssistantPage = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 px-4 sm:px-6">
      <AiAssistantHeader />
      <EscalationStatsStrip />
      <AiAssistantTabs />
    </div>
  );
};

export default AiAssistantPage;
