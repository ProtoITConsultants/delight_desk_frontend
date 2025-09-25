import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle,
  Globe,
  Loader2,
  MessageSquare,
  Plus,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

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

// AI Knowledge Tab
const SourceURLInput = ({
  sourceURL,
  setSourceURL,
}: {
  sourceURL: string;
  setSourceURL: React.Dispatch<React.SetStateAction<string>>; // Dispatch function to update the sourceURL state
}) => (
  <div className="flex gap-2">
    <Input
      placeholder="https://yoursite.com/faq"
      value={sourceURL}
      onChange={(e) => setSourceURL(e.target.value)}
      onKeyDown={
        (e) => e.key === "Enter" && sourceURL.trim()
        // !addUrlMutation.isPending &&
        // handleAddUrl()
      }
      // disabled={addUrlMutation.isPending}
    />
    <Button
      // onClick={handleAddUrl}
      onClick={() => {}}
      // disabled={addUrlMutation.isPending || !sourceURL.trim()}
      disabled={!sourceURL.trim()}
    >
      {/* {addUrlMutation.isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )} */}
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);

const AiKnowledgeSourceCard = ({
  url,
  status,
  pageCount,
  lastCrawled,
}: {
  url: string;
  status: string;
  pageCount?: number;
  lastCrawled?: string;
}) => {
  // Helper functions
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "crawling":
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
      default:
        return <Globe className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "crawling":
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
          <p className="font-medium text-sm line-clamp-1">{url}</p>
          <div className="flex items-center gap-2 flex-wrap mt-1">
            <Badge
              variant="secondary"
              className={`text-xs rounded-full ${getStatusColor(status)}`}
            >
              {status}
            </Badge>
            {pageCount && (
              <span className="text-xs text-gray-500">
                {pageCount} pages crawled
              </span>
            )}
            {status === "completed" && lastCrawled && (
              <span className="text-xs text-green-600">
                {/* ✓ Crawled {new Date(lastCrawled).toLocaleString()} */}✓
                Crawled {lastCrawled}
              </span>
            )}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {}}
        className="!p-0"
        // disabled={removeUrlMutation.isPending}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const ManuallyAddedSourceCard = ({
  title,
  createdAt,
  contentLength,
}: {
  title: string;
  createdAt: string;
  contentLength: number;
}) => {
  return (
    // <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
    //   <div className="flex items-center gap-3 flex-1 min-w-0">
    //     <div className="bg-blue-100 rounded-full p-2">
    //       <FileText className="h-4 w-4 text-blue-600" />
    //     </div>
    //     <div className="flex-1 min-w-0">
    //       <p className="font-medium text-sm truncate">{title}</p>
    //       <div className="flex items-center gap-2 mt-1">
    //         <Badge variant="outline" className="text-xs">
    //           Manual
    //         </Badge>
    //         <span className="text-xs text-gray-500">
    //           Added {new Date(createdAt).toLocaleDateString()}
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    //   <Button
    //     variant="ghost"
    //     size="sm"
    //     // onClick={() => deleteManualContentMutation.mutate(content.id)}
    //     // disabled={deleteManualContentMutation.isPending}
    //     className="text-red-600 hover:text-red-700"
    //   >
    //     <Trash2 className="h-4 w-4" />
    //   </Button>
    // </div>
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
            <span className="text-xs text-blue-700">
              {contentLength} characters
            </span>
            <span className="text-xs text-blue-600">
              ✓ Added {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        // onClick={() => deleteManualContentMutation.mutate(content.id)}
        // disabled={deleteManualContentMutation.isPending}
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const ManuallContentForm = () => {
  const [showManualInputForm, setShowManualInputForm] = useState(false);
  const [manualContent, setManualContent] = useState<{
    title: string;
    content: string;
  }>({
    title: "",
    content: "",
  });
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
          showManualInputForm ? "" : "hidden"
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
              onClick={() => {
                setShowManualInputForm(false);
                setManualContent({
                  title: "",
                  content: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button
              // onClick={handleAddManualContent}
              disabled={
                !manualContent.title.trim() || !manualContent.content.trim()
              }
            >
              {/* {addManualContentMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                "Add Content"
              )} */}
              Add Content
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
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
};

export default AiTrainingComponents;
