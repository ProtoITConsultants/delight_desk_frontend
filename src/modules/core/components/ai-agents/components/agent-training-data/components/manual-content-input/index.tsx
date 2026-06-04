"use client";
import { Button } from "@/components/ui/button";
import { MANUAL_CONTENT_DATA, MANUAL_CONTENT_INPUT_PROPS } from "../../types";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ManualTrainingDataInput = ({
  titlePlaceholder,
  contentPlaceholder,
  setShowManualInput,
  showManualInput,
  isInputDisabled,
  isAddingContent,
  addManualContent,
}: MANUAL_CONTENT_INPUT_PROPS) => {
  const [manualContentData, setManualContentData] =
    useState<MANUAL_CONTENT_DATA>({
      title: "",
      content: "",
    });

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      {!showManualInput && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowManualInput(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      )}
      {/* Input */}
      {showManualInput && (
        <Card className="border-2 border-dashed border-gray-200 py-0">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="manual-title">Title</Label>
              <Input
                id="manual-title"
                placeholder={titlePlaceholder}
                value={manualContentData.title}
                onChange={(e) =>
                  setManualContentData({
                    ...manualContentData,
                    title: e.target.value,
                  })
                }
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manual-content">Content</Label>
              <Textarea
                id="manual-content"
                placeholder={contentPlaceholder}
                value={manualContentData.content}
                onChange={(e) => {
                  setManualContentData({
                    ...manualContentData,
                    content: e.target.value,
                  });
                }}
                minLength={20}
                rows={6}
                className="bg-white resize-none min-h-30"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowManualInput(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  const isSuccess = await addManualContent({
                    title: manualContentData.title.trim(),
                    content: manualContentData.content.trim(),
                  });
                  if (isSuccess) {
                    setManualContentData({ title: "", content: "" });
                    setShowManualInput(false);
                  }
                }}
                disabled={
                  isInputDisabled ||
                  isAddingContent ||
                  !manualContentData.title.trim() ||
                  manualContentData.content.trim().length < 20
                }
              >
                {isAddingContent ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Adding...
                  </>
                ) : (
                  "Add Content"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManualTrainingDataInput;
