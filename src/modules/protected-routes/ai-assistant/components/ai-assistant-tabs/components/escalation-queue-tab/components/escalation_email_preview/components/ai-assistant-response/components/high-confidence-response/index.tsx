"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Edit, Send, X } from "lucide-react";
import { useState } from "react";

const HighConfidenceResponse = () => {
  const [isEditingResponse, setIsEditingResponse] = useState(false);

  const selectedEmailDetails = {
    id: 1,
    aiConfidence: 0.8,
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            Suggested Response
          </span>
          <Badge
            variant="outline"
            className={`text-xs ${
              selectedEmailDetails.aiConfidence >= 0.8
                ? "bg-green-50 text-green-700 border-green-300"
                : selectedEmailDetails.aiConfidence >= 0.6
                ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                : "bg-red-50 text-red-700 border-red-300"
            }`}
          >
            {Math.round(selectedEmailDetails.aiConfidence * 100)}% confident
          </Badge>
        </div>
      </div>

      {/* User Edited Response */}
      <Textarea
        className={cn("min-h-32", !isEditingResponse && "hidden")}
        placeholder="Edit the AI response..."
      />

      {/* AI Response Actions */}
      <div className="flex flex-col gap-3">
        {/* Include Email Signature */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`signature-${selectedEmailDetails.id}`}
            checked={true}
            onCheckedChange={() => {}}
          />
          <label
            htmlFor={`signature-${selectedEmailDetails.id}`}
            className="text-xs text-gray-600 cursor-pointer"
          >
            Include email signature
          </label>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => {}}
            // disabled={approveResponseMutation.isPending}
            className="!h-9"
          >
            <Send className="h-3 w-3 mr-1" />
            Send
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditingResponse(!isEditingResponse)}
            className="!h-9"
          >
            {isEditingResponse ? (
              <>
                <X className="h-3 w-3 mr-1" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </>
            )}
          </Button>
          {!isEditingResponse && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {}}
              data-testid="button-reject-response"
              className="!h-9"
            >
              <X className="h-3 w-3 mr-1" />
              Reject Response
            </Button>
          )}
        </div>
      </div>

      {/* AI Generated Response */}
      <div className={cn("flex flex-col gap-3", isEditingResponse && "hidden")}>
        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md">
          <p className="text-sm whitespace-pre-wrap text-gray-800">
            Hello, Thank you for reaching out to us at Human Food Bar. We have
            successfully paused your shipments as requested. Please feel free to
            contact us whenever you&apos;re ready to resume, and we&apos;ll be
            happy to assist you. If you have any other questions or need further
            assistance, don&apos;t hesitate to let us know. Best regards,
            Customer Service Team
          </p>
        </div>
        <div className="text-xs text-gray-500">
          💡 This suggestion is generated from your brand training data. Review
          and modify as needed before sending.
        </div>
      </div>
    </div>
  );
};

export default HighConfidenceResponse;
