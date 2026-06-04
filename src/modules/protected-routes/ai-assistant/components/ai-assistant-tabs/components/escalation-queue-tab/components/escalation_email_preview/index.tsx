"use client";
import { cn } from "@/lib/utils";
import { ESCALATION_EMAIL_PREVIEW_PROPS } from "../../types/escalation-email-preview";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, MailOpen, SearchX } from "lucide-react";
import EmailPreviewHeader from "./components/email-preview-header";
import EmailPreviewContent from "./components/email-preview-content";
import AiAssistantResponse from "./components/ai-assistant-response";
import EscalationContextCallout from "./components/escalation-context-callout";
import { useAiAssistant } from "@/providers/ai-assistant";
import { useRouter, useSearchParams } from "next/navigation";

const EscalationEmailPreview = ({
  className,
}: ESCALATION_EMAIL_PREVIEW_PROPS) => {
  const {
    selectedEscalationDetails,
    setSelectedEscalationForPreview,
    deepLinkedEscalationId,
    isResolvingDeepLinkedEscalation,
    isDeepLinkedEscalationNotFound,
  } = useAiAssistant();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Same back affordance as the populated preview header — needed for the
  // loading / not-found states so a user who arrived via a stale deep link
  // can still get back to the inbox on small screens.
  const onBackToInbox = () => {
    setSelectedEscalationForPreview(null);
    if (searchParams.has("escalationId") || searchParams.has("email")) {
      router.replace("/ai-assistant", { scroll: false });
    }
  };

  if (selectedEscalationDetails) {
    return (
      <Card
        className={cn(
          "flex h-fit flex-col gap-0 overflow-hidden p-0",
          className,
        )}
      >
        <EmailPreviewHeader />
        <div className="flex flex-col gap-5 px-4 py-5 sm:px-5">
          <EscalationContextCallout />
          <EmailPreviewContent />
          <AiAssistantResponse />
        </div>
      </Card>
    );
  }

  const isAwaitingDeepLink =
    isResolvingDeepLinkedEscalation || isDeepLinkedEscalationNotFound;

  return (
    <Card
      className={cn(
        "flex min-h-[420px] flex-col border-dashed",
        className,
      )}
    >
      {/* The empty-no-selection state only ever renders on lg+ (the small-
          screen layout hides the preview when there's no selection). The
          loading / not-found states CAN render on small screens via deep
          links, so we expose a back button on those. */}
      {isAwaitingDeepLink && (
        <div className="border-b border-dashed px-4 py-3 lg:hidden">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onBackToInbox}
            aria-label="Back to inbox"
            className="group h-9 gap-2 rounded-md bg-foreground px-3.5 text-sm font-semibold text-background shadow-sm transition-all hover:bg-foreground/90 hover:text-background hover:shadow active:bg-foreground/85"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to inbox
          </Button>
        </div>
      )}
      <div className="flex flex-1 items-center justify-center px-4 py-8">
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
      </div>
    </Card>
  );
};

export default EscalationEmailPreview;
