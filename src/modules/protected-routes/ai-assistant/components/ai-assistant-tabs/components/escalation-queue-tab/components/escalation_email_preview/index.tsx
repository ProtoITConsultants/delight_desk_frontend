"use client";
import { cn } from "@/lib/utils";
import { ESCALATION_EMAIL_PREVIEW_PROPS } from "../../types/escalation-email-preview";
import { Card } from "@/components/ui/card";
import { Loader2, MailOpen, SearchX } from "lucide-react";
import EmailPreviewHeader from "./components/email-preview-header";
import EmailPreviewContent from "./components/email-preview-content";
import AiAssistantResponse from "./components/ai-assistant-response";
import EscalationContextCallout from "./components/escalation-context-callout";
import { useAiAssistant } from "@/providers/ai-assistant";

const EscalationEmailPreview = ({
  className,
}: ESCALATION_EMAIL_PREVIEW_PROPS) => {
  const {
    selectedEscalationDetails,
    deepLinkedEscalationId,
    isResolvingDeepLinkedEscalation,
    isDeepLinkedEscalationNotFound,
  } = useAiAssistant();

  if (selectedEscalationDetails) {
    return (
      <Card
        className={cn(
          "flex h-fit flex-col gap-0 overflow-hidden p-0",
          className,
        )}
      >
        <EmailPreviewHeader />
        <div className="flex flex-col gap-5 px-5 py-5">
          <EscalationContextCallout />
          <EmailPreviewContent />
          <AiAssistantResponse />
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "flex min-h-[420px] items-center justify-center border-dashed",
        className,
      )}
    >
      <div className="max-w-xs text-center">
        {isResolvingDeepLinkedEscalation ? (
          <>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Opening escalation...
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Loading details for ticket{" "}
              <span className="font-mono">{deepLinkedEscalationId}</span>
            </p>
          </>
        ) : isDeepLinkedEscalationNotFound ? (
          <>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <SearchX className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Escalation not found
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Ticket{" "}
              <span className="font-mono">
                {deepLinkedEscalationId || "unknown"}
              </span>{" "}
              is unavailable or no longer accessible.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <MailOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Select an escalation
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Choose a ticket from the list to view the customer email,
              escalation context, and AI suggested response.
            </p>
          </>
        )}
      </div>
    </Card>
  );
};

export default EscalationEmailPreview;
