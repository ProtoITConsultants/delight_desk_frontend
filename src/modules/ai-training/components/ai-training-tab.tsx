import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Root = ({ children }: { children: React.ReactNode }) => (
  <Card>{children}</Card>
);

const Header = ({
  heading,
  icon,
  description,
  rightSection,
  tip,
}: {
  heading: string;
  icon: React.ReactNode;
  description: string;
  rightSection?: React.ReactNode;
  tip?: string;
}) => (
  <CardHeader>
    <CardTitle className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-2xl">
        {icon}
        {heading}
      </div>
      {/* Right Section */}
      {rightSection}
      {/* Pro Tip */}
      {tip && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs text-green-800">
            <strong>Pro Tip:</strong> {tip}
          </p>
        </div>
      )}
    </CardTitle>
    <p className="text-sm text-gray-600">{description}</p>
  </CardHeader>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <CardContent className="space-y-6">{children}</CardContent>
);

// Ai Identity
const SignaturePreview = ({
  salutation,
  customSalutation,
  aiAgentName,
  aiAgentTitle,
  signatureCompanyName,
  signatureFooter,
}: {
  salutation: string;
  customSalutation?: string;
  aiAgentName?: string;
  aiAgentTitle?: string;
  signatureCompanyName?: string;
  signatureFooter?: string;
}) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <div className="flex items-start gap-3">
      <div className="bg-blue-100 rounded-full p-2">
        <User className="h-4 w-4 text-blue-600" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          Email Signature Preview
        </h4>
        <div className="text-xs text-blue-800 bg-white border border-blue-200 rounded p-3 font-mono">
          {salutation === "Custom"
            ? customSalutation || "Best regards"
            : salutation}
          ,<br />
          {aiAgentName || "Your AI Agent"}
          <br />
          {aiAgentTitle}
          <br />
          {signatureCompanyName || "Your Company"}
          {signatureFooter && (
            <>
              <br />
              <br />
              <span className="text-gray-600 italic">{signatureFooter}</span>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);

const NameGenerator = ({
  aiAgentName,
  setAiAgentName,
}: {
  aiAgentName: string;
  setAiAgentName: (name: string) => void;
}) => {
  const [targetAudience, setTargetAudience] = useState<string>("");
  // TODO: Create Generate Names Mutation
  const handleGenerateNames = () => {};

  const isGeneratingNames = false;

  const generatedNames = [
    {
      name: "John Doe",
      reasoning: "A busy professional who needs quick support",
    },
    {
      name: "Jane Smith",
      reasoning: "A senior who needs expert advice",
    },
    {
      name: "Alice Johnson",
      reasoning: "A young family who needs personalized support",
    },
    {
      name: "Bob Brown",
      reasoning: "A tech enthusiast who needs expert guidance",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Name Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Target Audience</Label>
          <p className="text-xs text-gray-600 mb-3">
            Describe your typical customers to generate appropriate names
          </p>
          <Input
            placeholder="e.g., busy professionals, seniors, young families, tech enthusiasts"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleGenerateNames();
              }
            }}
          />
        </div>

        <Button
          onClick={handleGenerateNames}
          disabled={!targetAudience.trim() || isGeneratingNames}
          className="w-full"
          size="sm"
        >
          {isGeneratingNames ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Names...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Names for This Audience
            </>
          )}
        </Button>

        {generatedNames.length > 0 && (
          <div>
            <Label className="text-sm font-medium text-green-700 mb-2 block">
              Names for Your Audience
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {generatedNames.map((suggestion) => (
                <div
                  key={suggestion.name}
                  onClick={() => setAiAgentName(suggestion.name)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-blue-50 ${
                    aiAgentName === suggestion.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="font-medium text-sm">{suggestion.name}</div>
                  <div className="text-xs text-gray-600">
                    {suggestion.reasoning}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const AiTrainingTab = {
  Root,
  Header,
  Body,
  SignaturePreview,
  NameGenerator,
};

export default AiTrainingTab;
