"use client";

import { FC } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAiAgents } from "@/providers/ai-agents";
import { useUpdateSpecificAIAgentSettings } from "@/hooks/services/ai-agents/use-update-specific-ai-agent-settings";
import { ApprovalQueueAgentCategory } from "@/modules/protected-routes/approval-queue/utils/constants";
import { AiAgentsEnum } from "@/types/ai-agents";
import { AGENT_METADATA_MAP } from "../approval-queue-items-list/utils";

type AgentCategory = Exclude<
  ApprovalQueueAgentCategory,
  ApprovalQueueAgentCategory.ALL
>;

// The two enums share the same string values, so the approval-queue category
// can be used directly as a key into the AI Agents settings DTO map.
const toAgentEnum = (category: AgentCategory): AiAgentsEnum =>
  category as unknown as AiAgentsEnum;

const AGENT_CATEGORIES = Object.keys(AGENT_METADATA_MAP) as AgentCategory[];

type ActiveAgentChipProps = {
  category: AgentCategory;
};

const ActiveAgentChip: FC<ActiveAgentChipProps> = ({ category }) => {
  const { aiAgentsSettings, isFetchingAgentsSettings } = useAiAgents();
  const { updateAIAgentSettings, isUpdating } =
    useUpdateSpecificAIAgentSettings();

  const meta = AGENT_METADATA_MAP[category];
  const AgentIcon = meta.icon;
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

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "group flex shrink-0 items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm shadow-sm transition-colors",
                "hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isEnabled
                  ? "border-border/80 text-foreground"
                  : "border-border/60 text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  isEnabled ? meta.bgColor : "bg-muted",
                )}
              >
                <AgentIcon
                  className={cn(
                    "h-3.5 w-3.5",
                    isEnabled ? meta.textColor : "text-muted-foreground",
                  )}
                />
              </span>
              <span className="font-medium whitespace-nowrap">
                {meta.agentName}
              </span>
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  isEnabled ? "bg-emerald-500" : "bg-muted-foreground/40",
                )}
                aria-label={isEnabled ? "Agent on" : "Agent off"}
              />
              {requiresModeration && isEnabled && (
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              )}
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {hasAgent
            ? `${meta.agentName} \u00b7 ${isEnabled ? "On" : "Off"}${
                isEnabled && requiresModeration ? " \u00b7 Moderation" : ""
              }`
            : "Agent settings unavailable"}
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="w-72 p-0"
      >
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full",
              meta.bgColor,
            )}
          >
            <AgentIcon className={cn("h-4 w-4", meta.textColor)} />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">
              {meta.agentName}
            </span>
            <span className="text-xs text-muted-foreground">
              {isEnabled ? "Active" : "Disabled"}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          {isFetchingAgentsSettings && !hasAgent ? (
            <div className="flex flex-col gap-3 px-4 py-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
          ) : (
            <>
              <label
                htmlFor={`active-agent-enable-${category}`}
                className={cn(
                  "flex items-start justify-between gap-3 px-4 py-3 hover:bg-muted/40 transition-colors",
                  disableEnableSwitch
                    ? "cursor-not-allowed opacity-70"
                    : "cursor-pointer",
                )}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium leading-tight">
                    Agent enabled
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {isEnabled
                      ? "Currently processing matching items"
                      : "Items in this category are paused"}
                  </span>
                </div>
                <Switch
                  id={`active-agent-enable-${category}`}
                  checked={isEnabled}
                  onCheckedChange={handleToggleEnabled}
                  disabled={disableEnableSwitch}
                  aria-label={`Toggle ${meta.agentName}`}
                />
              </label>

              <label
                htmlFor={`active-agent-moderation-${category}`}
                className={cn(
                  "flex items-start justify-between gap-3 border-t px-4 py-3 hover:bg-muted/40 transition-colors",
                  disableModerationSwitch
                    ? "cursor-not-allowed opacity-70"
                    : "cursor-pointer",
                )}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium leading-tight">
                    Require human approval
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {!isEnabled
                      ? "Enable the agent to control moderation"
                      : requiresModeration
                        ? "Each response is reviewed before being sent"
                        : "Responses are sent automatically"}
                  </span>
                </div>
                <Switch
                  id={`active-agent-moderation-${category}`}
                  checked={requiresModeration}
                  onCheckedChange={handleToggleModeration}
                  disabled={disableModerationSwitch}
                  aria-label={`Toggle moderation for ${meta.agentName}`}
                />
              </label>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const ActiveAgentsStrip: FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Agents
        </span>
        <span className="h-px flex-1 bg-border/60" />
      </div>
      <div className="-mx-1 overflow-x-auto pb-1">
        <div className="flex w-max items-center gap-2 px-1">
          {AGENT_CATEGORIES.map((category) => (
            <ActiveAgentChip key={category} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveAgentsStrip;
