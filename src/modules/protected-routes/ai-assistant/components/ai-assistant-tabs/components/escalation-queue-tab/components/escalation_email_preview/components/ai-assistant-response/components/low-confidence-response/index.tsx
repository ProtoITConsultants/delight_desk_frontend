"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateAiResponse } from "@/hooks/services/ai-assistant/use-generate-ai-response";
import { useSendEscalationResponse } from "@/hooks/services/ai-assistant/use-send-escalation-response";
import { EscalationType } from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import { AlertCircle, Bot, Edit, Loader2, Send, Sparkles } from "lucide-react";
import { FC, useEffect, useState } from "react";

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

  const handleGenerate = async () => {
    generateAiResponse({
      escalationId: id,
      instruction: instructions,
    });
  };

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

  const handleReInstruct = () => {
    setEditableAiResponse("");
  };

  const handleSwitchMode = (next: Mode) => {
    setMode(next);
  };

  useEffect(() => {
    if (aiGeneratedResponse) {
      setEditableAiResponse(aiGeneratedResponse);
    }
  }, [aiGeneratedResponse]);

  return (
    <div className="flex flex-col gap-4">
      {/* ── Alert banner ── */}
      <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-md">
        <AlertCircle className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">
            AI Response Not Available Due to Low Confidence
          </p>
          <p className="text-sm text-gray-600 mt-1">
            This complex issue requires human expertise and judgment. The AI
            cannot provide a confident suggestion for this inquiry.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Consider adding more training data in the AI Training section to
            improve future suggestions.
          </p>
        </div>
      </div>

      {/* ── Mode switcher ── */}
      <div className="flex gap-2">
        <Button
          variant={mode === "instruct-ai" ? "default" : "outline"}
          onClick={() => handleSwitchMode("instruct-ai")}
          className="!h-9"
        >
          <Bot className="h-3 w-3 mr-1" />
          Instruct AI
        </Button>
        <Button
          variant={mode === "manual" ? "default" : "outline"}
          onClick={() => handleSwitchMode("manual")}
          className="!h-9"
        >
          <Edit className="h-3 w-3 mr-1" />
          Write Manually
        </Button>
      </div>

      {mode === "manual" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-blue-700">
              Write Your Response
            </span>
            <Badge
              variant="outline"
              className="text-xs bg-blue-50 text-blue-700 border-blue-300"
            >
              Human-written
            </Badge>
          </div>

          <Textarea
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            className="min-h-[120px]"
            placeholder="Write your response to the customer..."
          />

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`signature-manual-${id}`}
              checked={manualSignature}
              onCheckedChange={(checked) =>
                setManualSignature(Boolean(checked))
              }
            />
            <label
              htmlFor={`signature-manual-${id}`}
              className="text-xs text-gray-600 cursor-pointer"
            >
              Include email signature
            </label>
          </div>

          <Button
            className="!h-9"
            onClick={handleSendManual}
            disabled={isSending || !manualText.trim()}
          >
            {isSending ? (
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            ) : (
              <Send className="h-3 w-3 mr-1" />
            )}
            Send Response
          </Button>
        </div>
      )}

      {mode === "instruct-ai" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-purple-700">
              Tell AI What to Write
            </span>
            <Badge
              variant="outline"
              className="text-xs bg-purple-50 text-purple-700 border-purple-300"
            >
              AI-assisted
            </Badge>
          </div>

          <Textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="min-h-[80px]"
            placeholder="e.g. 'Apologize for the delay and offer a 15% discount' or 'Explain our return policy and ask for their order number'"
            disabled={hasAiResponse}
          />

          {hasAiResponse ? (
            <Button
              size="sm"
              onClick={handleReInstruct}
              disabled={isGenerating || !instructions.trim()}
              variant="outline"
            >
              <Edit className="h-3 w-3 mr-1" />
              Update Instructions
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleGenerate}
              disabled={isGenerating || !instructions.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  <span>Generating response</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3 w-3 mr-1" />
                  <span>Generate AI Response</span>
                </>
              )}
            </Button>
          )}

          {hasAiResponse && (
            <>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-sm font-medium text-purple-700">
                  AI Generated Response
                </span>
                <Badge
                  variant="outline"
                  className="text-xs bg-purple-50 text-purple-700 border-purple-300"
                >
                  Editable
                </Badge>
              </div>

              <Textarea
                value={editableAiResponse}
                onChange={(e) => setEditableAiResponse(e.target.value)}
                className="min-h-[120px]"
                placeholder="AI response will appear here..."
              />

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`signature-ai-${id}`}
                  checked={aiSignature}
                  onCheckedChange={(checked) =>
                    setAiSignature(Boolean(checked))
                  }
                />
                <label
                  htmlFor={`signature-ai-${id}`}
                  className="text-xs text-gray-600 cursor-pointer"
                >
                  Include email signature
                </label>
              </div>

              <Button
                className="!h-9"
                onClick={handleSendAi}
                disabled={isSending || !editableAiResponse.trim()}
              >
                {isSending ? (
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  <Send className="h-3 w-3 mr-1" />
                )}
                Send Response
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LowConfidenceResponse;
