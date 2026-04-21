"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AI_AGENT_TRAINING_DATA_PROPS } from "../../utils/types";
import { cn } from "@/lib/utils";
// import {
//   getTrainingDataQualityColor,
//   getTrainingDataQualityIcon,
// } from "../../utils/services/agent-training-data/training-data-quality";
import { AlertTriangle, FileText, Globe } from "lucide-react";
import WebsiteURLInput from "./components/url-input";
import { Separator } from "@/components/ui/separator";
import ManualTrainingDataInput from "./components/manual-content-input";
import { useState } from "react";

export const AiAgentTrainingData = ({
  className,
  agentDisplayName,
  Icon,
  trainingRequirements,
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
        {/* <div
          className={`flex items-center gap-2 p-3 rounded-lg border ${getTrainingDataQualityColor(
            trainingRequirements.contentQuality
          )}`}
        >
          {(() => {
            const QualityIcon = getTrainingDataQualityIcon(
              trainingRequirements.contentQuality
            );
            return <QualityIcon className="w-4 h-4" />;
          })()}
          <div className="flex-1">
            <p className="font-medium capitalize">
              {trainingRequirements.contentQuality} Training Quality
            </p>
            <p className="text-sm opacity-75">
              {trainingRequirements.totalSources} training{" "}
              {trainingRequirements.totalSources === 1 ? "source" : "sources"}{" "}
              added
            </p>
          </div>
        </div> */}
        {/* Combined Status and Recommendations */}
        {(trainingRequirements?.warning ||
          trainingRequirements?.recommendations) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col gap-3">
            {/* Warning */}
            {trainingRequirements?.warning && (
              <div className="flex items-start gap-2 pb-3 border-b border-blue-200">
                <AlertTriangle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  {trainingRequirements.warning}
                </p>
              </div>
            )}
            {/* Recommendations */}
            {trainingRequirements.recommendations.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="font-medium text-blue-900">Recommendations:</h4>
                <ul className="text-sm text-blue-800">
                  {trainingRequirements.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {/* Training Data Inputs */}
        <WebsiteURLInput
          heading="Website URLs"
          Icon={<Globe className="h-4 w-4 text-gray-600" />}
          isInputDisabled={showManualInput}
          addUrlMutation={(websiteURL) => {
            console.log("addUrlMutation", websiteURL);
          }}
          placeholder="https://yoursite.com/products"
          isAddingContent={false}
        />

        <Separator />

        {/* Manual Content Input */}
        <ManualTrainingDataInput
          heading="Manual Content"
          Icon={<FileText className="h-4 w-4 text-gray-600" />}
          titlePlaceholder="e.g., Product Features & Benefits"
          contentPlaceholder="Add detailed information about your products, features, specifications, and benefits."
          showManualInput={showManualInput}
          setShowManualInput={setShowManualInput}
          isInputDisabled={false}
          isAddingContent={false}
          addManualContent={(manualContentData) => {
            console.log("addManualContent", manualContentData);
          }}
        />
      </CardContent>
    </Card>
  );
};
