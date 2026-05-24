"use client";
import { Mail } from "lucide-react";
import { useAiAssistant } from "@/providers/ai-assistant";

/**
 * Envelope-styled customer email render. Body content is shown as the raw
 * HTML the server returned (already user-trusted upstream); the wrapper
 * uses Tailwind's `prose` defaults so multi-line plain-text emails get
 * reasonable spacing without us reinventing typography.
 */
const EmailPreviewContent = () => {
  const { selectedEscalationDetails } = useAiAssistant();
  const body = selectedEscalationDetails?.email?.body ?? "";

  return (
    <section className="overflow-hidden rounded-md border bg-card">
      <header className="flex items-center gap-2 border-b bg-muted/30 px-3 py-2">
        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Customer email
        </h3>
      </header>
      <div className="px-4 py-3">
        {body ? (
          <div
            className="prose prose-sm max-w-none text-sm leading-relaxed text-foreground [&_a]:text-primary [&_a]:underline [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <p className="text-sm italic text-muted-foreground">
            (No email body)
          </p>
        )}
      </div>
    </section>
  );
};

export default EmailPreviewContent;
