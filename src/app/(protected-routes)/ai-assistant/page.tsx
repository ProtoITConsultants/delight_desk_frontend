import AiAssistantHeader from "@/modules/protected-routes/ai-assistant/components/ai-assistant-header";
import AiAssistantTabs from "@/modules/protected-routes/ai-assistant/components/ai-assistant-tabs";
import AiTrainingNotification from "@/modules/protected-routes/ai-assistant/components/ai-training-notification";

const AiAssistantPage = () => {
  const aiTrainingStatus = {
    hasTrainingUrls: false,
    hasCompletedUrls: false,
    completedUrlCount: 0,
    urlCount: 0,
    contentCount: 0,
    brandVoice: "Professional" as const,
  };

  const showAiTrainingNotification = true;

  return (
    <div className="max-w-6xl mx-auto px-6 space-y-6">
      <AiAssistantHeader
        pendingEscalationItems={261}
        highPriorityEscalationItems={129}
      />
      {showAiTrainingNotification && (
        <AiTrainingNotification {...aiTrainingStatus} />
      )}
      <AiAssistantTabs />
    </div>
  );
};

export default AiAssistantPage;
