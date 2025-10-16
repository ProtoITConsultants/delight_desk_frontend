"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEscalationEmails } from "../../../escalation-emails-list/utils/context/escalation-emails-filters";
import { Bot } from "lucide-react";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Feedback Dialog - If AI Generated Response is Rejected
const EscalationEmailResponseFeedbackDialog = () => {
  const { feedbackDialogData, setFeedbackDialogData } = useEscalationEmails();
  const [customRejectionReason, setCustomRejectionReason] =
    React.useState<string>("");
  const [rejectionReason, setRejectionReason] = React.useState<string>("");
  return (
    <Dialog
      open={feedbackDialogData.isOpen}
      onOpenChange={() => {
        setFeedbackDialogData({ isOpen: false, emailId: "" });
      }}
    >
      <DialogContent className="sm:max-w-md">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            Help Us Improve AI Responses
          </DialogTitle>
          <div className="flex flex-col gap-2">
            <p>
              Your feedback directly improves our AI&apos;s future responses.
            </p>
            <div className="text-sm bg-blue-50 p-3 rounded-md border border-blue-200">
              <span className="font-medium text-blue-800">
                ✨ Rapid Learning Cycle
              </span>{" "}
              <span className="text-blue-700">
                This feedback helps the AI learn your preferences and improve
                similar responses within hours, not weeks.
              </span>
            </div>
          </div>
        </DialogHeader>
        {/* Feedback Body */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              What was wrong with this response?
            </Label>
            <RadioGroup
              value={rejectionReason}
              onValueChange={setRejectionReason}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tone_inappropriate" id="tone" />
                <Label htmlFor="tone" className="text-sm">
                  Wrong tone or style
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="factually_incorrect" id="facts" />
                <Label htmlFor="facts" className="text-sm">
                  Factually incorrect
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="too_generic" id="generic" />
                <Label htmlFor="generic" className="text-sm">
                  Too generic, not personalized
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="missed_context" id="context" />
                <Label htmlFor="context" className="text-sm">
                  Missed important context
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="policy_violation" id="policy" />
                <Label htmlFor="policy" className="text-sm">
                  Violates company policy
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="text-sm">
                  Other reason
                </Label>
              </div>
            </RadioGroup>
          </div>

          {rejectionReason === "other" && (
            <div>
              <Label
                htmlFor="custom-reason"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Please specify the issue:
              </Label>
              <Textarea
                id="custom-reason"
                value={customRejectionReason}
                onChange={(e) => setCustomRejectionReason(e.target.value)}
                placeholder="Help us understand what went wrong with this response..."
                className="!h-30 overflow-y-auto resize-none"
                data-testid="textarea-custom-rejection-reason"
              />
            </div>
          )}

          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            💡 <strong>Your input matters:</strong> Each piece of feedback helps
            our AI learn your specific business needs and communication style.
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFeedbackDialogData({
                isOpen: false,
                emailId: "",
              });
              setRejectionReason("");
              setCustomRejectionReason("");
            }}
            // disabled={isSubmittingFeedback}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {}}
            // disabled={
            //   !rejectionReason ||
            //   (rejectionReason === "other" && !customRejectionReason.trim()) ||
            //   isSubmittingFeedback
            // }
            data-testid="button-submit-feedback"
          >
            {/* {isSubmittingFeedback ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Feedback"
            )} */}
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EscalationEmailResponseFeedbackDialog;
