"use client";

import { FC, useState } from "react";
import { useApprovalQueueContext } from "@/providers/approval-queue";
import {
  APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS,
  APPROVAL_QUEUE_AGENT_FILTER_OPTIONS,
} from "../../utils/constants";
import {
  ApprovalQueueAgentCategory,
  ApprovalQueueStatusFilter,
} from "@/modules/protected-routes/approval-queue/utils/constants";
import {
  AGENT_METADATA_MAP,
  APPROVAL_QUEUE_STATUS_STYLES,
} from "../../utils";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Ban,
  Bot,
  Check,
  ChevronDown,
  Power,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAiAgents } from "@/providers/ai-agents";
import { useUpdateSpecificAIAgentSettings } from "@/hooks/services/ai-agents/use-update-specific-ai-agent-settings";
import { AiAgentsEnum } from "@/types/ai-agents";

const ALL_STATUSES_LABEL = "All Statuses";
const DEFAULT_AGENT = ApprovalQueueAgentCategory.ALL;

type AgentCategory = Exclude<
  ApprovalQueueAgentCategory,
  ApprovalQueueAgentCategory.ALL
>;

const toAgentEnum = (category: AgentCategory): AiAgentsEnum =>
  category as unknown as AiAgentsEnum;

/**
 * One agent cell inside the Agent filter dropdown grid. Each cell drives two
 * intents and keeps them on distinct click targets:
 *
 *   - The top button (icon + name + filter check) applies the agent filter
 *     and closes the dropdown. Unavailable agents stay visible but disable
 *     this click target and surface a "Coming soon" pill.
 *   - The two toggle rows underneath flip the agent's enabled + moderation
 *     flags. Switches stop pointer-down propagation so the dropdown stays
 *     open while users adjust both knobs.
 */
type AgentFilterRowProps = {
  category: AgentCategory;
  label: string;
  isSelected: boolean;
  isUnavailable?: boolean;
  onSelect: () => void;
};

const AgentFilterRow: FC<AgentFilterRowProps> = ({
  category,
  label,
  isSelected,
  isUnavailable = false,
  onSelect,
}) => {
  const meta = AGENT_METADATA_MAP[category];
  const AgentIcon = meta.icon;
  const { aiAgentsSettings, isFetchingAgentsSettings } = useAiAgents();
  const { updateAIAgentSettings, isUpdating } =
    useUpdateSpecificAIAgentSettings();

  const agent = aiAgentsSettings[toAgentEnum(category)];
  const agentApiId = agent?.id;
  const isEnabled = !isUnavailable && (agent?.isEnabled ?? false);
  const requiresModeration =
    !isUnavailable && (agent?.requiresModeration ?? false);

  const hasAgent = Boolean(agentApiId);
  const controlsBusy = isUpdating || isFetchingAgentsSettings;
  const disableEnableSwitch = isUnavailable || controlsBusy || !hasAgent;
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
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-md border bg-card/40 transition-colors",
        isSelected && "border-primary/40 bg-primary/5 shadow-sm",
        isUnavailable && "opacity-90",
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={onSelect}
            disabled={isUnavailable}
            aria-disabled={isUnavailable}
            className={cn(
              "flex w-full items-center justify-between gap-2 px-2.5 py-2 text-left text-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
              isUnavailable
                ? "cursor-not-allowed text-muted-foreground"
                : "hover:bg-muted/60",
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                  isUnavailable
                    ? "bg-muted text-muted-foreground/70"
                    : isEnabled
                      ? meta.bgColor
                      : "bg-muted",
                )}
              >
                <AgentIcon
                  className={cn(
                    "h-3 w-3",
                    isUnavailable
                      ? "text-muted-foreground/70"
                      : isEnabled
                        ? meta.textColor
                        : "text-muted-foreground",
                  )}
                />
              </span>
              <span
                className={cn(
                  "truncate text-xs font-semibold leading-tight",
                  isUnavailable && "line-through decoration-muted-foreground/40",
                )}
                title={label}
              >
                {label}
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5">
              {isUnavailable ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rose-600">
                  <Ban className="h-2.5 w-2.5" />
                  Soon
                </span>
              ) : (
                <>
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      isEnabled ? "bg-emerald-500" : "bg-muted-foreground/40",
                    )}
                    aria-label={isEnabled ? "Agent on" : "Agent off"}
                  />
                  {requiresModeration && isEnabled && (
                    <ShieldCheck className="h-3 w-3 text-primary" />
                  )}
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  )}
                </>
              )}
            </span>
          </button>
        </TooltipTrigger>
        {isUnavailable && (
          <TooltipContent side="top">
            This agent isn&apos;t available yet
          </TooltipContent>
        )}
      </Tooltip>

      <div
        className={cn(
          "flex flex-col gap-1 border-t px-2.5 py-2",
          isUnavailable ? "bg-muted/10" : "bg-muted/30",
        )}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <label
          htmlFor={`filter-agent-enable-${category}`}
          className={cn(
            "flex items-center justify-between gap-2 text-[11px]",
            disableEnableSwitch
              ? "cursor-not-allowed opacity-70"
              : "cursor-pointer",
          )}
        >
          <span className="flex items-center gap-1.5">
            <Power
              className={cn(
                "h-3 w-3",
                isEnabled ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span className="font-medium">Enabled</span>
          </span>
          <Switch
            id={`filter-agent-enable-${category}`}
            checked={isEnabled}
            onCheckedChange={handleToggleEnabled}
            disabled={disableEnableSwitch}
            aria-label={`Toggle ${meta.agentName}`}
            className="scale-75"
          />
        </label>
        <label
          htmlFor={`filter-agent-moderation-${category}`}
          className={cn(
            "flex items-center justify-between gap-2 text-[11px]",
            disableModerationSwitch
              ? "cursor-not-allowed opacity-70"
              : "cursor-pointer",
          )}
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck
              className={cn(
                "h-3 w-3",
                requiresModeration ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span className="font-medium">Approval</span>
          </span>
          <Switch
            id={`filter-agent-moderation-${category}`}
            checked={requiresModeration}
            onCheckedChange={handleToggleModeration}
            disabled={disableModerationSwitch}
            aria-label={`Toggle moderation for ${meta.agentName}`}
            className="scale-75"
          />
        </label>
      </div>
    </div>
  );
};

export const ApprovalQueueItemsFilter = () => {
  const {
    selectedItemStatus,
    setSelectedItemStatus,
    activeAgentCategory,
    setActiveAgentCategory,
  } = useApprovalQueueContext();
  const { aiAgentsSettings } = useAiAgents();

  const [isAgentMenuOpen, setIsAgentMenuOpen] = useState(false);

  const currentStatusOption = selectedItemStatus
    ? APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS.find(
        (option) => option.value === selectedItemStatus,
      )
    : null;
  const currentAgentOption = APPROVAL_QUEUE_AGENT_FILTER_OPTIONS.find(
    (option) => option.value === activeAgentCategory,
  );

  const isStatusActive = selectedItemStatus !== null;
  const isAgentActive = activeAgentCategory !== DEFAULT_AGENT;
  const hasActiveFilters = isStatusActive || isAgentActive;

  const ActiveAgentIcon =
    activeAgentCategory !== ApprovalQueueAgentCategory.ALL
      ? AGENT_METADATA_MAP[activeAgentCategory]?.icon
      : null;

  // Surface the fleet state on the trigger so users see the current agent
  // health without having to open the menu. We compute everything from the
  // filter options (not the full metadata map) so removed agents like Returns
  // and not-yet-available agents are correctly accounted for.
  const visibleAgentOptions = APPROVAL_QUEUE_AGENT_FILTER_OPTIONS.filter(
    (option) => option.value !== ApprovalQueueAgentCategory.ALL,
  ) as ReadonlyArray<{
    label: string;
    value: AgentCategory;
    isUnavailable?: boolean;
  }>;
  const availableAgentOptions = visibleAgentOptions.filter(
    (option) => !option.isUnavailable,
  );
  const totalAgentCount = visibleAgentOptions.length;
  const enabledAgentCount = availableAgentOptions.filter(
    (option) => aiAgentsSettings[toAgentEnum(option.value)]?.isEnabled,
  ).length;
  const moderatedAgentCount = availableAgentOptions.filter((option) => {
    const agent = aiAgentsSettings[toAgentEnum(option.value)];
    return agent?.isEnabled && agent.requiresModeration;
  }).length;

  // The trigger has two distinct states. When ALL is selected the helper
  // text doubles as a how-to ("tap to filter or configure"). When a specific
  // agent is selected we instead tell the user what state they're in.
  const activeAgentMeta =
    activeAgentCategory !== ApprovalQueueAgentCategory.ALL
      ? AGENT_METADATA_MAP[activeAgentCategory as AgentCategory]
      : undefined;
  const helperText = isAgentActive
    ? `Filtering by ${activeAgentMeta?.agentName ?? "agent"} \u00b7 tap to change or configure`
    : enabledAgentCount === 0
      ? "All agents are off \u00b7 tap to enable or filter"
      : `Tap to filter the queue or configure agents \u00b7 ${moderatedAgentCount} require approval`;

  const handleClearFilters = () => {
    setSelectedItemStatus(null);
    setActiveAgentCategory(DEFAULT_AGENT);
  };

  const handleSelectAgent = (value: ApprovalQueueAgentCategory) => {
    setActiveAgentCategory(value);
    setIsAgentMenuOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}

        {/* Status filter. Typography + card shell mirror the Agent filter so
            the two triggers read as siblings; this one stays single-line
            because it doesn't need to surface fleet info. */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "group inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 text-left shadow-sm transition-colors",
                "hover:border-primary/40 hover:bg-muted/40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isStatusActive && "border-primary/40 bg-primary/5",
              )}
              aria-label={`Status filter: ${currentStatusOption?.label ?? ALL_STATUSES_LABEL}. Tap to change.`}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  selectedItemStatus ? "bg-muted/60" : "bg-muted",
                )}
              >
                {selectedItemStatus ? (
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      APPROVAL_QUEUE_STATUS_STYLES[selectedItemStatus]?.dot,
                    )}
                  />
                ) : (
                  <span className="h-2 w-2 rounded-full border border-muted-foreground/40" />
                )}
              </span>
              <span className="text-sm font-semibold leading-none">
                {currentStatusOption?.label ?? ALL_STATUSES_LABEL}
              </span>
              <ChevronDown
                className={cn(
                  "ml-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  "group-data-[state=open]:rotate-180",
                )}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Item Status
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setSelectedItemStatus(null)}
              className="flex items-center justify-between gap-2 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full border border-muted-foreground/40" />
                {ALL_STATUSES_LABEL}
              </span>
              {selectedItemStatus === null && (
                <Check className="h-3.5 w-3.5 text-primary" />
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS.map((option) => {
              const statusValue: ApprovalQueueStatusFilter = option.value;
              const isSelected = selectedItemStatus === statusValue;

              return (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSelectedItemStatus(statusValue)}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        APPROVAL_QUEUE_STATUS_STYLES[statusValue]?.dot,
                      )}
                    />
                    {option.label}
                  </span>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Agent filter + per-agent settings. This trigger is deliberately
            heavier than the Status filter because it doubles as a quick
            read-out of the agent fleet and as the entry point to configure
            individual agents. */}
        <DropdownMenu open={isAgentMenuOpen} onOpenChange={setIsAgentMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "group flex items-center gap-3 rounded-lg border bg-card px-3 py-1.5 text-left shadow-sm transition-colors",
                "hover:border-primary/40 hover:bg-muted/40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isAgentActive && "border-primary/40 bg-primary/5",
              )}
              aria-label={`${currentAgentOption?.label ?? "All agents"}, ${enabledAgentCount} of ${totalAgentCount} enabled. Tap to filter or configure agents.`}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  isAgentActive && ActiveAgentIcon
                    ? cn(
                        AGENT_METADATA_MAP[
                          activeAgentCategory as AgentCategory
                        ]?.bgColor,
                        AGENT_METADATA_MAP[
                          activeAgentCategory as AgentCategory
                        ]?.textColor,
                      )
                    : "bg-primary/10 text-primary",
                )}
              >
                {ActiveAgentIcon ? (
                  <ActiveAgentIcon className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </span>

              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="flex items-center gap-2">
                  <span className="text-sm font-semibold leading-none">
                    {currentAgentOption?.label}
                  </span>
                  <span
                    className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted/70 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground"
                    aria-label={`${enabledAgentCount} of ${totalAgentCount} agents enabled`}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        enabledAgentCount > 0
                          ? "bg-emerald-500"
                          : "bg-muted-foreground/40",
                      )}
                    />
                    {enabledAgentCount}/{totalAgentCount}
                  </span>
                </span>
                <span className="hidden text-[11px] leading-none text-muted-foreground sm:inline">
                  {helperText}
                </span>
              </span>

              <span
                className="ml-2 hidden items-center gap-1 border-l border-border/60 pl-3 md:flex"
                aria-hidden
              >
                {visibleAgentOptions.map((option) => {
                  const category = option.value;
                  const agentMeta = AGENT_METADATA_MAP[category];
                  const isEnabled =
                    !option.isUnavailable &&
                    (aiAgentsSettings[toAgentEnum(category)]?.isEnabled ??
                      false);
                  const isFiltered = activeAgentCategory === category;
                  const AgentIcon = agentMeta.icon;
                  const titleSuffix = option.isUnavailable
                    ? "Coming soon"
                    : isEnabled
                      ? "On"
                      : "Off";
                  return (
                    <span
                      key={category}
                      title={`${agentMeta.agentName} \u00b7 ${titleSuffix}`}
                      className={cn(
                        "relative flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                        option.isUnavailable
                          ? "border-dashed border-rose-200 bg-rose-50/60 text-rose-400"
                          : isEnabled
                            ? cn(
                                agentMeta.bgColor,
                                agentMeta.textColor,
                                "border-transparent",
                              )
                            : "border-border/60 bg-muted text-muted-foreground/60",
                        isFiltered && "ring-2 ring-primary/50 ring-offset-1",
                      )}
                    >
                      <AgentIcon className="h-2.5 w-2.5" />
                      {option.isUnavailable && (
                        <Ban className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-background text-rose-500" />
                      )}
                    </span>
                  );
                })}
              </span>

              <ChevronDown
                className={cn(
                  "ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  "group-data-[state=open]:rotate-180",
                )}
              />
            </button>
          </DropdownMenuTrigger>
          {/* Dropdown width is capped so it never overlaps the 16rem-wide
              sidebar (visible at md+). Below md the sidebar is off-canvas,
              so we only cap against the viewport. `collisionPadding` keeps
              the menu away from edges if a future layout change moves the
              trigger closer to the viewport edge. */}
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            collisionPadding={{ top: 16, right: 16, bottom: 16, left: 16 }}
            className="w-[min(560px,calc(100vw-2rem))] p-3 md:w-[min(580px,calc(100vw-18rem))]"
          >
            {/* Header. Because this menu hosts toggles that intentionally
                keep it open, we also surface an explicit close affordance \u2014
                Escape and click-outside still work, but the X gives a
                visible, keyboard-reachable exit at any viewport. */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
              <div className="flex min-w-0 flex-col">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Filter &amp; configure agents
                </span>
                <span className="text-[11px] text-muted-foreground/80">
                  Tap an agent to filter, or use the switches to configure it.
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      enabledAgentCount > 0
                        ? "bg-emerald-500"
                        : "bg-muted-foreground/40",
                    )}
                  />
                  {enabledAgentCount}/{totalAgentCount} enabled
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setIsAgentMenuOpen(false)}
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors",
                        "hover:bg-muted hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                      )}
                      aria-label="Close agent filter"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={4}>
                    Close (Esc)
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* "All agents" stays a full-width filter row \u2014 no per-agent
                toggles. Keeps the clear-filter affordance one click away
                even when an agent is selected. */}
            <DropdownMenuItem
              onClick={() =>
                handleSelectAgent(ApprovalQueueAgentCategory.ALL)
              }
              className={cn(
                "mt-1 flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-sm",
                !isAgentActive && "bg-primary/5",
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full",
                    !isAgentActive
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  <Bot className="h-3 w-3" />
                </span>
                <span className="font-medium">All agents</span>
                <span className="text-xs text-muted-foreground">
                  Show every category
                </span>
              </span>
              {!isAgentActive && (
                <Check className="h-3.5 w-3.5 text-primary" />
              )}
            </DropdownMenuItem>

            <DropdownMenuSeparator className="mt-2" />

            {/* Per-agent grid \u2014 1 / 2 / 3 columns depending on viewport so
                users never have to scroll to discover an agent. */}
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {visibleAgentOptions.map((option) => {
                const category = option.value;
                const isSelected = activeAgentCategory === option.value;

                return (
                  <AgentFilterRow
                    key={option.value}
                    category={category}
                    label={option.label}
                    isSelected={isSelected}
                    isUnavailable={option.isUnavailable}
                    onSelect={() => handleSelectAgent(option.value)}
                  />
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
