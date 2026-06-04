import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle,
  Globe,
  Loader2,
  MessageSquare,
  PlayCircle,
  Plus,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAiTeamCenter } from "@/providers/ai-team-center";
import { ProductKnowledgeSourceStatus } from "@/services/ai-training/types/product-knowledge";

const Root = ({ children }: { children: React.ReactNode }) => (
  <Card>{children}</Card>
);

const Header = ({
  heading,
  icon,
  description,
  rightSection,
  tip,
  isComingSoon = false,
}: {
  heading: string;
  icon: React.ReactNode;
  description: string;
  rightSection?: React.ReactNode;
  tip?: string;
  isComingSoon?: boolean;
}) => (
  <CardHeader>
    {isComingSoon && (
      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
        Coming Soon
      </Badge>
    )}
    <CardTitle className="flex items-start justify-between gap-6">
      <div className="space-y-2">
        {/* Heading & Icon */}
        <div className="flex items-center gap-2 text-2xl">
          {icon}
          {heading}
        </div>
        {/* Description */}
        <p className="text-sm text-gray-600 font-normal">{description}</p>
      </div>
      {/* Right Section */}
      {rightSection}
    </CardTitle>
    {/* Pro Tip */}
    {tip && (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <p className="text-xs text-green-800">
          <strong>Pro Tip:</strong> {tip}
        </p>
      </div>
    )}
  </CardHeader>
);

const Body = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <CardContent className={cn("space-y-6", className)}>{children}</CardContent>
);

// Ai Identity Tab
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

  const { generateNamesForAiIdentity, generatedAgentNames, isLoading } =
    useAiTeamCenter();

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
                generateNamesForAiIdentity({
                  customerDescription: targetAudience,
                });
              }
            }}
            disabled={isLoading}
          />
        </div>

        <Button
          onClick={() =>
            generateNamesForAiIdentity({
              customerDescription: targetAudience,
            })
          }
          disabled={!targetAudience.trim() || isLoading}
          className="w-full"
          size="sm"
        >
          {isLoading ? (
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

        {generatedAgentNames.length > 0 && (
          <div>
            <Label className="text-sm font-medium text-green-700 mb-2 block">
              Names for Your Audience
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {generatedAgentNames.map((suggestion) => (
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
                    {suggestion.description}
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

// AI Knowledge Tab
const SourceURLInput = ({
  sourceURL,
  setSourceURL,
  onAddSourceURL,
  isAddingSourceURL,
  isPanelActive = false,
}: {
  sourceURL: string;
  setSourceURL: React.Dispatch<React.SetStateAction<string>>; // Dispatch function to update the sourceURL state
  onAddSourceURL: () => Promise<void>;
  isAddingSourceURL: boolean;
  /** When false, tab content is hidden (Radix Tabs); focus only when true. */
  isPanelActive?: boolean;
}) => {
  const urlInputId = useId();
  const handleSubmit = async () => {
    if (!sourceURL.trim() || isAddingSourceURL) {
      return;
    }
    await onAddSourceURL();
  };

  useEffect(() => {
    if (!isPanelActive || isAddingSourceURL) return;

    const tid = window.setTimeout(() => {
      const el = document.getElementById(urlInputId) as HTMLInputElement | null;
      if (!el?.isConnected || el.disabled) return;
      el.focus({ preventScroll: true });
    }, 0);

    return () => window.clearTimeout(tid);
  }, [isPanelActive, isAddingSourceURL, urlInputId]);

  return (
    <div className="flex gap-2">
      <Input
        id={urlInputId}
        placeholder="https://yoursite.com/faq"
        value={sourceURL}
        onChange={(e) => setSourceURL(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            void handleSubmit();
          }
        }}
        disabled={isAddingSourceURL}
      />
      <Button
        onClick={() => {
          void handleSubmit();
        }}
        disabled={isAddingSourceURL || !sourceURL.trim()}
      >
        {isAddingSourceURL ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

const AiKnowledgeSourceCard = ({
  id,
  title,
  sourceUrl,
  status,
  errorMessage,
  onDelete,
  isDeleting,
}: {
  id: string;
  title: string;
  sourceUrl: string | null;
  status: ProductKnowledgeSourceStatus;
  errorMessage?: string;
  onDelete: (sourceId: string) => void;
  isDeleting?: boolean;
}) => {
  // Helper functions
  const getStatusIcon = (status: ProductKnowledgeSourceStatus) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "processing":
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
      default:
        return <Globe className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ProductKnowledgeSourceStatus) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 p-4 border rounded-lg bg-white">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {getStatusIcon(status)}
        <div className="w-full">
          <p className="font-medium text-sm line-clamp-1">{title}</p>
          {sourceUrl && (
            <p className="text-xs text-gray-500 line-clamp-1 mt-1">
              {sourceUrl}
            </p>
          )}
          <div className="flex items-center gap-2 flex-wrap mt-1">
            <Badge
              variant="secondary"
              className={`text-xs rounded-full ${getStatusColor(status)}`}
            >
              {status}
            </Badge>
            {status === "failed" && errorMessage && (
              <span className="text-xs text-red-600 line-clamp-1">
                {errorMessage}
              </span>
            )}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(id)}
        className="!p-0"
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

const ManuallyAddedSourceCard = ({
  id,
  title,
  createdAt,
  onDelete,
  isDeleting,
}: {
  id: string;
  title: string;
  createdAt: string;
  onDelete: (sourceId: string) => void;
  isDeleting?: boolean;
}) => {
  return (
    // <di
    <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50 border-blue-200">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <MessageSquare className="h-4 w-4 text-blue-600" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-blue-900 line-clamp-1">
            {title}
          </p>
          <div className="flex items-center flex-wrap gap-2 mt-1">
            <Badge
              variant="secondary"
              className="text-xs bg-blue-100 text-blue-800 rounded-full"
            >
              manual content
            </Badge>
            <span className="text-xs text-blue-600">
              ✓ Added {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(id)}
        disabled={isDeleting}
        className="text-red-600 hover:text-red-700"
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

const ManuallContentForm = ({
  onAddManualContent,
  isAddingManualContent,
}: {
  onAddManualContent: (data: {
    title: string;
    content: string;
  }) => Promise<boolean>;
  isAddingManualContent: boolean;
}) => {
  const [showManualInputForm, setShowManualInputForm] = useState(false);
  const [manualContent, setManualContent] = useState<{
    title: string;
    content: string;
  }>({
    title: "",
    content: "",
  });

  const resetForm = () => {
    setShowManualInputForm(false);
    setManualContent({
      title: "",
      content: "",
    });
  };

  const handleAddManualContent = async () => {
    if (
      !manualContent.title.trim() ||
      manualContent.content.trim().length <= 20 ||
      isAddingManualContent
    ) {
      return;
    }

    const isSuccess = await onAddManualContent({
      title: manualContent.title.trim(),
      content: manualContent.content.trim(),
    });
    if (isSuccess) {
      resetForm();
    }
  };

  return (
    <>
      {/* Trigger */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 rounded-full p-2">
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              Add Content Manually
            </h4>
            <p className="text-xs text-blue-800 mb-3">
              Fine-tune your AI by adding specific content that addresses
              customer questions not covered in your FAQs, or add content from
              websites that can&apos;t be scraped.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowManualInputForm((prev) => !prev)}
              className="bg-white hover:bg-gray-50"
              disabled={isAddingManualContent}
            >
              {showManualInputForm
                ? "Hide Manual Input"
                : "Add Content Manually"}
            </Button>
          </div>
        </div>
      </div>
      <Card
        className={cn(
          "bg-gray-50 rounded-lg",
          showManualInputForm ? "" : "hidden",
        )}
      >
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="manual=title">Content Title</Label>
            <Input
              id="manual=title"
              placeholder="e.g., FAQ - Shipping & Returns"
              value={manualContent.title}
              onChange={(e) =>
                setManualContent({
                  ...manualContent,
                  title: e.target.value,
                })
              }
              minLength={20}
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manual-content">Content</Label>
            <Textarea
              id="manual-content"
              placeholder="Copy and paste your FAQ content, support documentation, or other content for the AI to learn from."
              value={manualContent.content}
              onChange={(e) =>
                setManualContent({
                  ...manualContent,
                  content: e.target.value,
                })
              }
              rows={6}
              className="bg-white resize-none h-[180px] overflow-auto"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={resetForm}
              disabled={isAddingManualContent}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                void handleAddManualContent();
              }}
              disabled={
                !manualContent.title.trim() ||
                manualContent.content.trim().length <= 20 ||
                isAddingManualContent
              }
            >
              {isAddingManualContent ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Content"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

// AI Performance Tab
const AiPerformanceTestForm = () => {
  const [playgroundQuery, setPlaygroundQuery] = useState("");
  // TODO: Create handlePlaygroundTest function
  const handlePlaygroundTest = () => {};

  const playgroundLoading = false;
  const playgroundResponse = "";
  const brandVoice = "Professional";
  const allowEmojis = false;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Customer Question Input */}
      <div className="space-y-4">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Ask a Customer Question</Label>
          <Textarea
            placeholder="What's your return policy? Tell me about your company. What makes your brand unique? Do you offer free shipping?"
            value={playgroundQuery}
            onChange={(e) => setPlaygroundQuery(e.target.value)}
            rows={6}
            className="resize-none h-[144px] overflow-auto placeholder:text-sm flex-1"
          />
        </div>
        <Button
          onClick={handlePlaygroundTest}
          disabled={playgroundLoading || !playgroundQuery.trim()}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {playgroundLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              AI is thinking...
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4 mr-2" />
              Get AI Response
            </>
          )}
        </Button>
      </div>
      {/* AI Response */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">AI Response Preview</Label>
        <div
          className={cn(
            "min-h-[200px] max-h-[400px] p-4 border rounded-lg bg-gray-50 overflow-auto",
            !playgroundLoading &&
              !playgroundResponse &&
              "flex items-center justify-center",
          )}
        >
          {playgroundLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Generating response...</p>
              </div>
            </div>
          ) : playgroundResponse ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {playgroundResponse}
              </p>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Response generated using <strong>{brandVoice}</strong> voice
                  {allowEmojis && " with emojis enabled"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <MessageSquare className="h-8 w-8 text-gray-300 mx-auto" />
              <p className="text-sm text-gray-500 text-center">
                Enter a question and click &quot;Get AI Response&quot; to test
                your trained AI
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AiTrainingComponents = {
  Root,
  Header,
  Body,
  // AI Identity Tab
  SignaturePreview,
  NameGenerator,
  // AI Knowledge Tab
  SourceURLInput,
  AiKnowledgeSourceCard,
  ManuallyAddedSourceCard,
  ManuallContentForm,
  // AI Performance Tab
  AiPerformanceTestForm,
};

export default AiTrainingComponents;
