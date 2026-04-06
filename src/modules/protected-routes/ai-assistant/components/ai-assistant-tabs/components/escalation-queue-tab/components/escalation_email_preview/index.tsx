"use client";
import { cn } from "@/lib/utils";
import { ESCALATION_EMAIL_PREVIEW_PROPS } from "../../types/escalation-email-preview";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import EmailPreviewHeader from "./components/email-preview-header";
import EmailPreviewContent from "./components/email-preview-content";
import AiAssistantResponse from "./components/ai-assistant-response";
import EmailPreviewActions from "./components/email-preview-actions";
import { useAiAssistant } from "@/providers/ai-assistant";

const EscalationEmailPreview = ({
  className,
}: ESCALATION_EMAIL_PREVIEW_PROPS) => {
  const { selectedEscalationDetails } = useAiAssistant();

  return selectedEscalationDetails ? (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Email Header */}
      <EmailPreviewHeader />
      {/* Email Content */}
      <EmailPreviewContent />
      {/* AI Assistant Section */}
      <AiAssistantResponse />
      {/* Action Buttons */}
      <EmailPreviewActions />
    </div>
  ) : (
    <Card className={cn("h-96 flex items-center justify-center", className)}>
      <div className="text-center text-gray-500">
        <Mail className="h-12 w-12 mx-auto mb-2 text-gray-300" />
        <p>Select an email to view details</p>
      </div>
    </Card>
  );
};

export default EscalationEmailPreview;
