import { Eye, Mail } from "lucide-react";
import { AI_RESPONSE_PREVIEW_PROPS } from "../../utils/types";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const EmailResponseSamplePreview = ({
  className,
  type,
  fromEmail,
  subject,
  content,
  signature,
}: AI_RESPONSE_PREVIEW_PROPS) => {
  return (
    <div
      className={cn(
        type === "default" &&
          "bg-card text-card-foreground flex flex-col gap-6 rounded-lg border p-6 shadow-sm"
      )}
    >
      {/* Response Header - If Not AI Agent Test Preview */}
      {type === "default" && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Eye className="h-5 w-5" />
            <span>Email Preview</span>
          </CardTitle>
          <CardDescription>
            How customers will see automated responses from this agent
          </CardDescription>
        </CardHeader>
      )}
      {/* Response Content */}
      <div
        className={cn(
          "border rounded-lg p-4",
          type === "ai-agent-test"
            ? "bg-gradient-to-br from-blue-50 to-purple-50"
            : "bg-gray-50",
          className
        )}
      >
        <div className="flex flex-col gap-3">
          {/* Email Header */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span>From: {fromEmail}</span>
            </div>
            <div className="text-sm text-gray-600">Subject: {subject}</div>
          </div>

          <Separator
            className={cn(
              type === "ai-agent-test" &&
                "bg-gradient-to-br from-blue-200 to-purple-200"
            )}
          />

          {/* Email Body */}
          <div
            className="text-sm leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          {/* Email Signature */}
          <Separator
            className={cn(
              type === "ai-agent-test" &&
                "bg-gradient-to-br from-blue-200 to-purple-200"
            )}
          />

          <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
            {signature.agentName} <br />
            {signature.agentTitle} <br />
            {signature.companyName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailResponseSamplePreview;
