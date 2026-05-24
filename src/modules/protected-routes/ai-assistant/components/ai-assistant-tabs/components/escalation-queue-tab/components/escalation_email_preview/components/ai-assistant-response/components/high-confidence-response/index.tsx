"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Edit3, Loader2, Send, ThumbsDown, X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { EscalationType } from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import { useSendEscalationResponse } from "@/hooks/services/ai-assistant/use-send-escalation-response";
import { useAiAssistant } from "@/providers/ai-assistant";

const HighConfidenceResponse: FC<EscalationType> = ({
  id,
  aiSuggestedResponse,
}) => {
  const { setFeedbackDialogData } = useAiAssistant();
  const { sendEscalationResponse, isPending } = useSendEscalationResponse();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [includeSignature, setIncludeSignature] = useState(true);

  useEffect(() => {
    setDraft(aiSuggestedResponse || "");
  }, [isEditing, aiSuggestedResponse]);

  const onSend = () => {
    sendEscalationResponse({
      escalationId: id,
      message: draft,
      includeEmailSignature: includeSignature,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* AI draft — reads as a message bubble rather than a notice block. */}
      <div className="rounded-md border bg-muted/40 p-4">
        {isEditing ? (
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="min-h-[140px] resize-y border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
            placeholder="Edit the AI response..."
          />
        ) : (
          <div
            className="prose prose-sm max-w-none text-sm leading-relaxed text-foreground [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: aiSuggestedResponse || "" }}
          />
        )}
      </div>

      {/* Action bar — primary Send + signature toggle live together to
          keep the "ready to send?" decisions close to each other. */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`signature-${id}`}
            checked={includeSignature}
            onCheckedChange={(checked) =>
              setIncludeSignature(Boolean(checked))
            }
          />
          <label
            htmlFor={`signature-${id}`}
            className="cursor-pointer text-xs text-muted-foreground"
          >
            Include email signature
          </label>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              setFeedbackDialogData({ isOpen: true, emailId: id })
            }
            disabled={isPending}
            className="h-8 gap-1 px-2 text-xs text-muted-foreground"
            data-testid="button-reject-response"
          >
            <ThumbsDown className="h-3 w-3" />
            Reject
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (isEditing) setDraft(aiSuggestedResponse || "");
              setIsEditing((prev) => !prev);
            }}
            disabled={isPending}
            className="h-8 gap-1 px-2 text-xs"
          >
            {isEditing ? (
              <>
                <X className="h-3 w-3" />
                Cancel
              </>
            ) : (
              <>
                <Edit3 className="h-3 w-3" />
                Edit
              </>
            )}
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={onSend}
            disabled={isPending || !draft.trim()}
            className={cn("h-8 gap-1 px-3 text-xs")}
          >
            {isPending ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Send className="h-3 w-3" />
            )}
            {isPending ? "Sending..." : "Send response"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HighConfidenceResponse;
