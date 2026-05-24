"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateAiResponse } from "@/hooks/services/ai-assistant/use-generate-ai-response";
import { useSendEscalationResponse } from "@/hooks/services/ai-assistant/use-send-escalation-response";
import { EscalationType } from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import { AI_ASSISTANT_ICON } from "@/constants/product-icons";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Edit3,
  Loader2,
  PenSquare,
  RefreshCw,
  Send,
  Sparkles,
} from "lucide-react";
import { FC, useEffect, useState } from "react";

/**
 * Low confidence flow.
 *
 *  The AI can't draft confidently, so we offer two paths:
 *   1. Write manually — full plain-text composition.
 *   2. Instruct AI    — describe what to say, generate a draft, then edit.
 *
 * Both paths share the same composer surface (textarea + signature toggle
 * + send button) so users don't have to re-learn the controls when they
 * switch modes.
 */

type Mode = "manual" | "instruct-ai";

const LowConfidenceResponse: FC<EscalationType> = ({ id }) => {
  const [mode, setMode] = useState<Mode>("manual");

  const [manualText, setManualText] = useState("");
  const [manualSignature, setManualSignature] = useState(true);

  const [instructions, setInstructions] = useState("");
  const [editableAiResponse, setEditableAiResponse] = useState("");
  const [aiSignature, setAiSignature] = useState(true);

  const {
    isPending: isGenerating,
    generateAiResponse,
    aiResponse: aiGeneratedResponse,
  } = useGenerateAiResponse();
  const { isPending: isSending, sendEscalationResponse } =
    useSendEscalationResponse();

  const hasAiResponse = editableAiResponse.trim().length > 0;

  useEffect(() => {
    if (aiGeneratedResponse) {
      setEditableAiResponse(aiGeneratedResponse);
    }
  }, [aiGeneratedResponse]);

  const handleSendManual = () => {
    if (!manualText.trim()) return;
    sendEscalationResponse({
      escalationId: id,
      message: manualText,
      includeEmailSignature: manualSignature,
    });
  };

  const handleSendAi = () => {
    if (!editableAiResponse.trim()) return;
    sendEscalationResponse({
      escalationId: id,
      message: editableAiResponse,
      includeEmailSignature: aiSignature,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Why we're here. Calm grey banner — informative, not alarming. */}
      <div className="flex items-start gap-3 rounded-md border border-border bg-muted/40 p-3">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-foreground">
            No confident AI draft for this case
          </p>
          <p className="text-xs text-muted-foreground">
            Compose a reply yourself, or describe what to say and let AI draft
            from your instructions.
          </p>
        </div>
      </div>

      {/* Segmented mode switcher — visually paired so the user reads them
          as a single choice. */}
      <div
        role="tablist"
        aria-label="Response mode"
        className="inline-flex w-fit rounded-md border bg-muted/40 p-0.5"
      >
        <ModeButton
          isActive={mode === "manual"}
          onClick={() => setMode("manual")}
          icon={<PenSquare className="h-3.5 w-3.5" />}
          label="Write manually"
        />
        <ModeButton
          isActive={mode === "instruct-ai"}
          onClick={() => setMode("instruct-ai")}
          icon={<AI_ASSISTANT_ICON className="h-3.5 w-3.5" />}
          label="Instruct AI"
        />
      </div>

      {mode === "manual" && (
        <div className="flex flex-col gap-3">
          <Textarea
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            className="min-h-[140px] resize-y"
            placeholder="Write your response to the customer..."
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <SignatureToggle
              id={`signature-manual-${id}`}
              checked={manualSignature}
              onChange={setManualSignature}
            />
            <Button
              size="sm"
              onClick={handleSendManual}
              disabled={isSending || !manualText.trim()}
              className="h-8 gap-1 px-3 text-xs"
            >
              {isSending ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Send className="h-3 w-3" />
              )}
              {isSending ? "Sending..." : "Send response"}
            </Button>
          </div>
        </div>
      )}

      {mode === "instruct-ai" && (
        <div className="flex flex-col gap-3">
          <div>
            <label
              htmlFor={`instructions-${id}`}
              className="mb-1 block text-xs font-medium text-foreground"
            >
              Tell AI what to write
            </label>
            <Textarea
              id={`instructions-${id}`}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="min-h-[80px] resize-y"
              placeholder="e.g. Apologize for the delay and offer a 15% discount, or explain the return policy and ask for the order number."
              disabled={hasAiResponse || isGenerating}
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {hasAiResponse ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setEditableAiResponse("")}
                disabled={isGenerating || isSending}
                className="h-8 gap-1 px-2 text-xs"
              >
                <RefreshCw className="h-3 w-3" />
                Update instructions
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                onClick={() =>
                  generateAiResponse({
                    escalationId: id,
                    instruction: instructions,
                  })
                }
                disabled={isGenerating || !instructions.trim()}
                className="h-8 gap-1 px-3 text-xs"
              >
                {isGenerating ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Sparkles className="h-3 w-3" />
                )}
                {isGenerating ? "Generating..." : "Generate draft"}
              </Button>
            )}
          </div>

          {hasAiResponse && (
            <div className="flex flex-col gap-3 rounded-md border bg-muted/40 p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Edit3 className="h-3 w-3" />
                <span>AI draft — edit before sending</span>
              </div>
              <Textarea
                value={editableAiResponse}
                onChange={(e) => setEditableAiResponse(e.target.value)}
                className="min-h-[140px] resize-y border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
                placeholder="AI response will appear here..."
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3">
                <SignatureToggle
                  id={`signature-ai-${id}`}
                  checked={aiSignature}
                  onChange={setAiSignature}
                />
                <Button
                  size="sm"
                  onClick={handleSendAi}
                  disabled={isSending || !editableAiResponse.trim()}
                  className="h-8 gap-1 px-3 text-xs"
                >
                  {isSending ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Send className="h-3 w-3" />
                  )}
                  {isSending ? "Sending..." : "Send response"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LowConfidenceResponse;

/* ----------------------- Sub-components ----------------------- */

type ModeButtonProps = {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
};

const ModeButton: FC<ModeButtonProps> = ({ isActive, onClick, icon, label }) => (
  <button
    type="button"
    role="tab"
    aria-selected={isActive}
    onClick={onClick}
    className={cn(
      "inline-flex items-center gap-1.5 rounded-sm px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
      isActive
        ? "bg-background text-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground",
    )}
  >
    {icon}
    {label}
  </button>
);

type SignatureToggleProps = {
  id: string;
  checked: boolean;
  onChange: (next: boolean) => void;
};

const SignatureToggle: FC<SignatureToggleProps> = ({
  id,
  checked,
  onChange,
}) => (
  <div className="flex items-center gap-2">
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={(next) => onChange(Boolean(next))}
    />
    <label htmlFor={id} className="cursor-pointer text-xs text-muted-foreground">
      Include email signature
    </label>
  </div>
);
