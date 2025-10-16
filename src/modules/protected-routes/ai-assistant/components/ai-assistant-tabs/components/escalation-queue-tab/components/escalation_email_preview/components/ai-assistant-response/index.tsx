import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { useEscalationEmails } from "../../../escalation-emails-list/utils/context/escalation-emails-filters";
import HighConfidenceResponse from "./components/high-confidence-response";
import LowConfidenceResponse from "./components/low-confidence-response";

const AiAssistantResponse = () => {
  const { selectedEmailDetails } = useEscalationEmails();
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
        {selectedEmailDetails?.aiSuggestedResponse &&
        selectedEmailDetails?.aiConfidence &&
        selectedEmailDetails?.aiConfidence > 0.5 ? (
          <HighConfidenceResponse />
        ) : selectedEmailDetails?.aiConfidence &&
          selectedEmailDetails?.aiConfidence <= 0.5 ? (
          <LowConfidenceResponse />
        ) : null}
      </CardContent>
    </Card>
  );
};

export default AiAssistantResponse;
