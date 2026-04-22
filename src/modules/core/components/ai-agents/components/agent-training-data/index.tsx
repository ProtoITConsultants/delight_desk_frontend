"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AI_AGENT_TRAINING_DATA_PROPS } from "../../utils/types";
import { cn } from "@/lib/utils";
// import {
//   getTrainingDataQualityColor,
//   getTrainingDataQualityIcon,
// } from "../../utils/services/agent-training-data/training-data-quality";
import { AlertTriangle, CheckCircle, FileText, Globe } from "lucide-react";
import WebsiteURLInput from "./components/url-input";
import { Separator } from "@/components/ui/separator";
import ManualTrainingDataInput from "./components/manual-content-input";
import { useState } from "react";
import AiTrainingComponents from "@/modules/protected-routes/ai-training/components/ai-training-tab";

export const AiAgentTrainingData = ({
  className,
  agentDisplayName,
  Icon,
  urlSources,
  manualSources,
  onAddUrl,
  onAddManual,
  onDelete,
  isAddingUrl = false,
  isAddingManual = false,
  isDeleting = false,
  isFetchingSources = false,
}: AI_AGENT_TRAINING_DATA_PROPS) => {
  const [showManualInput, setShowManualInput] = useState(false);
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          {Icon}
          {agentDisplayName} Training Data
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Training Data Quality */}
        {urlSources && urlSources.length > 10 ? (
          <div className="flex items-center gap-2 p-3 rounded-lg border text-green-600 bg-green-50 border-green-200">
            <CheckCircle className="w-4 h-4" />
            <div className="flex-1">
              <p className="font-medium capitalize">
                Excellent Training Quality
              </p>
              <p className="text-sm opacity-75">
                {urlSources.length} training{" "}
                {urlSources.length === 1 ? "source" : "sources"} added
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col gap-3">
            {/* Warning */}
            <div className="flex items-start gap-2 pb-3 border-b border-blue-200">
              <AlertTriangle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Insufficient relevant content for Product Agent.
              </p>
            </div>
            {/* Recommendations */}
            <div className="flex flex-col gap-2">
              <h4 className="font-medium text-blue-900">Recommendations:</h4>
              <ul className="text-sm text-blue-800">
                {[
                  "Add more relevant content to your training data.",
                  "Use relevant keywords in your training data.",
                ].map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Training Data Inputs */}
        <WebsiteURLInput
          heading="Website URLs"
          Icon={<Globe className="h-4 w-4 text-gray-600" />}
          isInputDisabled={showManualInput || isAddingUrl}
          addUrlMutation={(websiteURL) => onAddUrl?.(websiteURL)}
          placeholder="https://yoursite.com/products"
          isAddingContent={isAddingUrl}
        />

        {/* URL Sources List */}
        {urlSources && onDelete && (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {!isFetchingSources && urlSources.length < 1 ? (
              <div className="text-center py-8 text-gray-500">
                <Globe className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                <p className="text-sm font-medium">
                  No training URLs added yet
                </p>
              </div>
            ) : (
              urlSources.map((source) => (
                <AiTrainingComponents.AiKnowledgeSourceCard
                  key={source.id}
                  id={source.id}
                  title={source.title}
                  sourceUrl={source.sourceUrl}
                  status={source.status}
                  errorMessage={
                    typeof source.metadata?.error === "string"
                      ? source.metadata.error
                      : undefined
                  }
                  onDelete={onDelete}
                  isDeleting={isDeleting}
                />
              ))
            )}
          </div>
        )}

        <Separator />

        {/* Manual Sources List */}
        {manualSources && onDelete && manualSources.length > 0 && (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Manual Content ({manualSources.length})
              </span>
            </div>
            {manualSources.map((source) => (
              <AiTrainingComponents.ManuallyAddedSourceCard
                key={source.id}
                id={source.id}
                title={source.title}
                createdAt={source.createdAt}
                onDelete={onDelete}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        )}

        {/* Manual Content Input */}
        <ManualTrainingDataInput
          titlePlaceholder="e.g., Product Features & Benefits"
          contentPlaceholder="Add detailed information about your products, features, specifications, and benefits."
          showManualInput={showManualInput}
          setShowManualInput={setShowManualInput}
          isInputDisabled={isAddingManual}
          isAddingContent={isAddingManual}
          addManualContent={async (manualContentData) =>
            (await onAddManual?.(manualContentData)) ?? false
          }
        />
      </CardContent>
    </Card>
  );
};
