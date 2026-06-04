"use client";
import { AI_ASSISTANT_ICON } from "@/constants/product-icons";
import HighConfidenceResponse from "./components/high-confidence-response";
import LowConfidenceResponse from "./components/low-confidence-response";
import ConfidenceMeter from "./components/confidence-meter";
import { useAiAssistant } from "@/providers/ai-assistant";

const HIGH_CONFIDENCE_THRESHOLD = 50;

const AiAssistantResponse = () => {
  const { selectedEscalationDetails } = useAiAssistant();
  if (!selectedEscalationDetails) return null;

  const aiConfidence =
    selectedEscalationDetails.aiSuggestedResponseConfidence || 0;
  const isHighConfidence = aiConfidence > HIGH_CONFIDENCE_THRESHOLD;

  return (
    <section className="overflow-hidden rounded-md border bg-card">
      <header className="flex flex-col gap-2 border-b bg-muted/30 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
              <AI_ASSISTANT_ICON className="h-3.5 w-3.5 text-primary" />
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              AI Assistant
            </h3>
          </div>
          <ConfidenceMeter confidence={aiConfidence} />
        </div>
        <p className="text-xs text-muted-foreground">
          Trained on your brand knowledge and company policies. Review and
          edit before sending.
        </p>
      </header>
      <div className="px-4 py-4">
        {isHighConfidence ? (
          <HighConfidenceResponse {...selectedEscalationDetails} />
        ) : (
          <LowConfidenceResponse {...selectedEscalationDetails} />
        )}
      </div>
    </section>
  );
};

export default AiAssistantResponse;
