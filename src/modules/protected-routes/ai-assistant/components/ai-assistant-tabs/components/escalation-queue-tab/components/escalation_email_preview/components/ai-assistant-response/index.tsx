import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";
import HighConfidenceResponse from "./components/high-confidence-response";
import LowConfidenceResponse from "./components/low-confidence-response";
import { useAiAssistant } from "@/providers/ai-assistant";

const AiAssistantResponse = () => {
  const { selectedEscalationDetails } = useAiAssistant();

  const aiConfidence =
    selectedEscalationDetails?.aiSuggestedResponseConfidence || 0;

  if (!selectedEscalationDetails) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-blue-600" />
          <CardTitle className="text-base">AI Assistant</CardTitle>
        </div>
        <p className="text-sm text-gray-600">
          AI-powered suggestions based on your trained brand knowledge and
          company policies
        </p>
      </CardHeader>
      <CardContent>
        {aiConfidence > 50 ? (
          <HighConfidenceResponse {...selectedEscalationDetails} />
        ) : (
          <LowConfidenceResponse {...selectedEscalationDetails} />
        )}
      </CardContent>
    </Card>
  );
};

export default AiAssistantResponse;
