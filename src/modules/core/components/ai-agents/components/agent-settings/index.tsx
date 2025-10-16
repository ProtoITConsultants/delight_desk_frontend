import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AI_AGENT_SETTINGS_PROPS } from "../../utils/types";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle } from "lucide-react";

const AgentSettings = ({
  agentName,
  agentIcon,
  agentDescription,
  enableAgentButtonDescription = "Automatically respond to user inquiries",
  settingsTipTitle,
  settingsTip,
  isAgentEnabled,
  onChangeAgentConfiguration,
  agentNeedsModeration,
  onChangeAgentModeration,
  isChangingAgentSettings = false,
}: AI_AGENT_SETTINGS_PROPS) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-start gap-4 justify-between">
          <div className="flex items-center space-x-2 text-2xl">
            {agentIcon}
            <span>Agent Settings</span>
          </div>
          <Badge variant={isAgentEnabled ? "default" : "secondary"}>
            {isAgentEnabled ? "Active" : "Inactive"}
          </Badge>
        </CardTitle>
        <CardDescription>{agentDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Agent Enable/Disable */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-0.5">
            <div className="text-base font-medium">Enable {agentName}</div>
            <div className="text-sm text-muted-foreground">
              {enableAgentButtonDescription}
            </div>
          </div>
          <Switch
            checked={isAgentEnabled}
            onCheckedChange={onChangeAgentConfiguration}
            disabled={isChangingAgentSettings}
            data-testid="switch-enable-agent"
          />
        </div>

        {/* Moderation Toggle */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-0.5">
            <div className="text-base font-medium">Requires Moderation</div>
            <div className="text-sm text-muted-foreground">
              {agentNeedsModeration
                ? "Responses will appear in approval queue before sending"
                : "Responses will be sent automatically without review"}
            </div>
          </div>
          <Switch
            checked={agentNeedsModeration}
            onCheckedChange={onChangeAgentModeration}
            disabled={isChangingAgentSettings || !isAgentEnabled}
            data-testid="switch-requires-moderation"
          />
        </div>

        {/* Moderation Flag */}
        {agentNeedsModeration && (
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-900">
                Human Approval Required
              </h4>
            </div>
            <p className="text-sm text-yellow-800">
              All responses will be reviewed by humans before being sent to
              customers. You can disable this setting once you&apos;re confident
              in the agent&apos;s performance.
            </p>
          </div>
        )}

        {/* Tip */}
        {settingsTip && (
          <>
            <Separator />
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>{settingsTipTitle || "Recommendation:"}</strong>{" "}
                {settingsTip}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentSettings;
