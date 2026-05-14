"use client";

import { FC } from "react";
import { Power, ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAiAgents } from "@/providers/ai-agents";
import { useUpdateSpecificAIAgentSettings } from "@/hooks/services/ai-agents/use-update-specific-ai-agent-settings";
import { ApprovalQueueAgentCategory } from "@/modules/protected-routes/approval-queue/utils/constants";
import { AiAgentsEnum } from "@/types/ai-agents";
import { cn } from "@/lib/utils";

type AgentControlsProps = {
  category: Exclude<ApprovalQueueAgentCategory, ApprovalQueueAgentCategory.ALL>;
  agentName: string;
};

// The two enums share the same string values
// (e.g. "wismo", "promo_code"), so the approval-queue category can be used
// directly as a key into the AI Agents settings DTO map.
const toAgentEnum = (
  category: AgentControlsProps["category"],
): AiAgentsEnum => category as unknown as AiAgentsEnum;

export const AgentControls: FC<AgentControlsProps> = ({
  category,
  agentName,
}) => {
  const { aiAgentsSettings, isFetchingAgentsSettings } = useAiAgents();
  const { updateAIAgentSettings, isUpdating } =
    useUpdateSpecificAIAgentSettings();

  const agent = aiAgentsSettings[toAgentEnum(category)];
  const agentApiId = agent?.id;
  const isEnabled = agent?.isEnabled ?? false;
  const requiresModeration = agent?.requiresModeration ?? false;

  const hasAgent = Boolean(agentApiId);
  const controlsBusy = isUpdating || isFetchingAgentsSettings;
  const disableEnableSwitch = controlsBusy || !hasAgent;
  const disableModerationSwitch = disableEnableSwitch || !isEnabled;

  const handleToggleEnabled = (checked: boolean) => {
    if (!agentApiId) return;
    if (checked) {
      updateAIAgentSettings({
        params: { agentId: agentApiId, isEnabled: true },
      });
    } else {
      // Disabling the agent also clears the moderation flag, mirroring
      // the behaviour of the dedicated agent settings pages.
      updateAIAgentSettings({
        params: {
          agentId: agentApiId,
          isEnabled: false,
          requiresModeration: false,
        },
      });
    }
  };

  const handleToggleModeration = (checked: boolean) => {
    if (!agentApiId) return;
    updateAIAgentSettings({
      params: { agentId: agentApiId, requiresModeration: checked },
    });
  };

  // While the initial agent settings request is in-flight we render a
  // placeholder so the card layout doesn't jump once data lands.
  if (isFetchingAgentsSettings && !hasAgent) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1.5">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-8" />
        <div className="h-4 w-px bg-border/70" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-8" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 sm:gap-3 rounded-full border border-border/70 bg-muted/40 px-3 py-1.5",
        "transition-colors",
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <label
            htmlFor={`agent-enable-${agentApiId}`}
            className={cn(
              "flex items-center gap-1.5",
              disableEnableSwitch
                ? "cursor-not-allowed opacity-70"
                : "cursor-pointer",
            )}
          >
            <Power
              className={cn(
                "size-3.5 transition-colors",
                isEnabled ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span className="hidden text-xs font-medium text-foreground sm:inline">
              Agent
            </span>
            <Switch
              id={`agent-enable-${agentApiId}`}
              checked={isEnabled}
              onCheckedChange={handleToggleEnabled}
              disabled={disableEnableSwitch}
              aria-label={`Toggle ${agentName}`}
            />
          </label>
        </TooltipTrigger>
        <TooltipContent>
          {hasAgent
            ? isEnabled
              ? `Disable ${agentName}`
              : `Enable ${agentName}`
            : "Agent settings unavailable"}
        </TooltipContent>
      </Tooltip>

      <div className="h-4 w-px bg-border/70" />

      <Tooltip>
        <TooltipTrigger asChild>
          <label
            htmlFor={`agent-moderation-${agentApiId}`}
            className={cn(
              "flex items-center gap-1.5",
              disableModerationSwitch
                ? "cursor-not-allowed opacity-70"
                : "cursor-pointer",
            )}
          >
            <ShieldCheck
              className={cn(
                "size-3.5 transition-colors",
                requiresModeration ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span className="hidden text-xs font-medium text-foreground sm:inline">
              Moderation
            </span>
            <Switch
              id={`agent-moderation-${agentApiId}`}
              checked={requiresModeration}
              onCheckedChange={handleToggleModeration}
              disabled={disableModerationSwitch}
              aria-label={`Toggle moderation for ${agentName}`}
            />
          </label>
        </TooltipTrigger>
        <TooltipContent>
          {!hasAgent
            ? "Agent settings unavailable"
            : !isEnabled
              ? "Enable the agent to control moderation"
              : requiresModeration
                ? "Auto-send responses without review"
                : "Require human review before sending"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
