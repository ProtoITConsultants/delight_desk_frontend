import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TEST_AI_AGENT_PROPS } from "../../utils/types";
import { cn } from "@/lib/utils";
import { Loader2, Send, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EmailResponseSamplePreview from "../email-response-preview";

const TestAiAgent = ({
  className,
  instructions,
  contentClassName,
  InputField,
  actionButtonTitle,
  onActionButtonClick,
  isActionButtonDisabled,
  isGeneratingResponse,
  emailResponse,
}: TEST_AI_AGENT_PROPS) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-5 w-5" />
            <span>Test Your Agent</span>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            AI Powered
          </Badge>
        </CardTitle>
        <CardDescription>{instructions}</CardDescription>
      </CardHeader>
      <CardContent className={cn("flex flex-col gap-4", contentClassName)}>
        {/* User Input */}
        {InputField}
        {/* Action Button */}
        <Button
          onClick={onActionButtonClick}
          disabled={isActionButtonDisabled}
          className="w-full"
          data-testid="button-generate-response"
        >
          {isGeneratingResponse ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Response...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              {actionButtonTitle || "Generate AI Response"}
            </>
          )}
        </Button>
        {/* AI Response Preview */}
        {emailResponse && <EmailResponseSamplePreview {...emailResponse} />}
      </CardContent>
    </Card>
  );
};

export default TestAiAgent;
