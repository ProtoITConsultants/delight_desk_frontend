"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Bot, Edit, Loader2, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const LowConfidenceResponse = () => {
  const [instructingAI, setInstructingAI] = useState<Set<string>>(new Set());
  const [generatedFromInstructions, setGeneratedFromInstructions] = useState<
    Record<string, string>
  >({});

  const toggleAIInstruction = (emailId: string) => {
    setInstructingAI((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(emailId)) {
        newSet.delete(emailId);
      } else {
        newSet.add(emailId);
      }
      return newSet;
    });
  };

  const selectedEmailDetails = {
    id: "1",
    aiConfidence: 0.4,
  };

  const generateFromInstructionsMutation = {
    isPending: false,
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Alert Info - Reason for no response */}
      <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-md">
        <AlertCircle className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">
            AI Response Not Available Due to Low Confidence
          </p>
          <p className="text-sm text-gray-600 mt-1">
            This complex issue requires human expertise and judgment. The AI
            cannot provide a confident suggestion for this type of inquiry.
          </p>
          <div className="mt-2 text-xs text-gray-500">
            Consider adding more training data about this topic in the AI
            Training section to improve future suggestions.
          </div>
        </div>
      </div>
      {/* Response Options */}
      <div className="flex flex-col gap-4">
        {/* Available Actions */}
        <div className="flex gap-2">
          <Button
            variant={
              instructingAI.has(selectedEmailDetails.id) ? "default" : "outline"
            }
            onClick={() => toggleAIInstruction(selectedEmailDetails.id)}
            className="!h-9"
          >
            <Bot className="h-3 w-3 mr-1" />
            Instruct AI
          </Button>
          <Button
            variant={
              !instructingAI.has(selectedEmailDetails.id) &&
              !generatedFromInstructions[selectedEmailDetails.id]
                ? "default"
                : "outline"
            }
            onClick={() => {
              setInstructingAI((prev) => {
                const updated = new Set(prev);
                updated.delete(selectedEmailDetails.id);
                return updated;
              });
            }}
            className="!h-9"
          >
            <Edit className="h-3 w-3 mr-1" />
            Write Manually
          </Button>
        </div>
        {/* Response Options */}
        {instructingAI.has(selectedEmailDetails.id) ? (
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
              // value={aiInstructions[selectedEmailDetails.id] || ""}
              // onChange={(e) =>
              //   updateAIInstruction(selectedEmailDetails.id, e.target.value)
              // }
              className="min-h-[80px]"
              placeholder="Tell the AI what to write (e.g., 'Apologize for the delay and offer a 15% discount' or 'Explain our return policy and ask for order number')"
            />

            <Button
              size="sm"
              // onClick={() => {
              //   const instructions = aiInstructions[selectedEmailDetails.id];
              //   if (instructions?.trim()) {
              //     generateFromInstructionsMutation.mutate({
              //       emailId: selectedEmailDetails.id,
              //       instructions,
              //     });
              //   }
              // }}
              // disabled={
              //   generateFromInstructionsMutation.isPending ||
              //   !aiInstructions[selectedEmailDetails.id]?.trim()
              // }
            >
              {generateFromInstructionsMutation.isPending ? (
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              ) : (
                <Sparkles className="h-3 w-3 mr-1" />
              )}
              Generate Response
            </Button>
          </div>
        ) : generatedFromInstructions[selectedEmailDetails.id] ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-purple-700">
                AI Generated Response
              </span>
              <Badge
                variant="outline"
                className="text-xs bg-purple-50 text-purple-700 border-purple-300"
              >
                From instructions
              </Badge>
            </div>

            <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-md">
              <p className="text-sm whitespace-pre-wrap text-gray-800">
                {generatedFromInstructions[selectedEmailDetails.id]}
              </p>
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={`signature-instructions-${selectedEmailDetails.id}`}
                // checked={getShouldIncludeSignature(selectedEmailDetails.id)}
                // onCheckedChange={(checked) => {
                //   setIncludeSignature((prev) => ({
                //     ...prev,
                //     [selectedEmailDetails.id]: Boolean(checked),
                //   }));
                // }}
              />
              <label
                htmlFor={`signature-instructions-${selectedEmailDetails.id}`}
                className="text-xs text-gray-600 cursor-pointer"
              >
                Include email signature
              </label>
            </div>
            <div className="flex gap-2">
              <Button
                // onClick={() => {
                //   approveResponseMutation.mutate({
                //     emailId: selectedEmailDetails.id,
                //     response:
                //       generatedFromInstructions[selectedEmailDetails.id],
                //     includeSignature: getShouldIncludeSignature(
                //       selectedEmailDetails.id
                //     ),
                //   });
                // }}
                // disabled={approveResponseMutation.isPending}
                className="!h-9"
              >
                <Send className="h-3 w-3 mr-1" />
                Send
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toggleAIInstruction(selectedEmailDetails.id)}
                className="!h-9"
              >
                <Edit className="h-3 w-3 mr-1" />
                Modify Instructions
              </Button>
            </div>
          </div>
        ) : (
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
              // value={customResponses[selectedEmailDetails.id] || ""}
              // onChange={(e) =>
              //   updateCustomResponse(selectedEmailDetails.id, e.target.value)
              // }
              className="min-h-[120px]"
              placeholder="Write your response to the customer..."
            />

            <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={`signature-custom-${selectedEmailDetails.id}`}
                // checked={getShouldIncludeSignature(selectedEmailDetails.id)}
                // onCheckedChange={(checked) => {
                //   setIncludeSignature((prev) => ({
                //     ...prev,
                //     [selectedEmailDetails.id]: Boolean(checked),
                //   }));
                // }}
              />
              <label
                htmlFor={`signature-custom-${selectedEmailDetails.id}`}
                className="text-xs text-gray-600 cursor-pointer"
              >
                Include email signature
              </label>
            </div>
            <Button
              className="!h-9"
              // onClick={() => {
              //   const customText = customResponses[selectedEmailDetails.id];
              //   if (customText?.trim()) {
              //     approveResponseMutation.mutate({
              //       emailId: selectedEmailDetails.id,
              //       response: customText,
              //       includeSignature: getShouldIncludeSignature(
              //         selectedEmailDetails.id
              //       ),
              //     });
              //   }
              // }}
              // disabled={
              //   approveResponseMutation.isPending ||
              //   !customResponses[selectedEmailDetails.id]?.trim()
              // }
            >
              <Send className="h-3 w-3 mr-1" />
              Send Response
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LowConfidenceResponse;
