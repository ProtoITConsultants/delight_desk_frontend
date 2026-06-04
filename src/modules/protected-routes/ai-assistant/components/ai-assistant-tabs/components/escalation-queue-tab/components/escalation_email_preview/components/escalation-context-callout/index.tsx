"use client";
import { AlertTriangle } from "lucide-react";
import { useAiAssistant } from "@/providers/ai-assistant";

/**
 * One-line callout that explains *why* the AI handed this case off. The
 * reason field is short and authoritative — it lives in the loudest tone
 * available so the user reads it before scrolling into the email body.
 */
const EscalationContextCallout = () => {
  const { selectedEscalationDetails } = useAiAssistant();
  const reason = selectedEscalationDetails?.reason;
  if (!reason) return null;

  return (
    <div className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
        <AlertTriangle className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          Escalation reason
        </p>
        <p className="mt-0.5 text-sm capitalize text-amber-900">{reason}</p>
      </div>
    </div>
  );
};

export default EscalationContextCallout;
