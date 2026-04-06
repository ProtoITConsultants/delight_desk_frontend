"use client";
import AiAssistantHeader from "@/modules/protected-routes/ai-assistant/components/ai-assistant-header";
import AiAssistantTabs from "@/modules/protected-routes/ai-assistant/components/ai-assistant-tabs";
import { AiAssistantProvider } from "@/providers/ai-assistant";

const AiAssistantPage = () => {
  // const aiTrainingStatus = {
  //   hasTrainingUrls: false,
  //   hasCompletedUrls: false,
  //   completedUrlCount: 0,
  //   urlCount: 0,
  //   contentCount: 0,
  //   brandVoice: "Professional" as const,
  // };

  return (
    <AiAssistantProvider>
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <AiAssistantHeader />
        {/* <AiTrainingNotification {...aiTrainingStatus} /> */}
        <AiAssistantTabs />
      </div>
    </AiAssistantProvider>
  );
};

export default AiAssistantPage;
