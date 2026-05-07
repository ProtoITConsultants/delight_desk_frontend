"use client";

import { useApprovalQueueContext } from "@/providers/approval-queue";
import {
  APPROVAL_QUEUE_ITEMS_FILTER_OPTIONS,
  APPROVAL_QUEUE_AGENT_FILTER_OPTIONS,
} from "../../utils/constants";
import {
  ApprovalQueueAgentCategory,
  ApprovalQueueItemStatus,
} from "@/modules/protected-routes/approval-queue/utils/constants";
import {
  AGENT_METADATA_MAP,
  APPROVAL_QUEUE_STATUS_STYLES,
} from "../../utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, X } from "lucide-react";

const ALL_STATUSES_LABEL = "All Statuses";
const DEFAULT_AGENT = ApprovalQueueAgentCategory.ALL;

export const ApprovalQueueItemsFilter = () => {
  const {
    selectedItemStatus,
    setSelectedItemStatus,
    activeAgentCategory,
    setActiveAgentCategory,
  } = useApprovalQueueContext();

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

  const handleClearFilters = () => {
    setSelectedItemStatus(null);
    setActiveAgentCategory(DEFAULT_AGENT);
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

        {/* Status filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 gap-2 px-2.5 text-xs font-normal",
                isStatusActive && "border-primary/40 bg-primary/5",
              )}
            >
              {selectedItemStatus ? (
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full",
                    APPROVAL_QUEUE_STATUS_STYLES[selectedItemStatus]?.dot,
                  )}
                />
              ) : (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-muted-foreground/40" />
              )}
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium text-foreground">
                {currentStatusOption?.label ?? ALL_STATUSES_LABEL}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
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
              const statusValue = option.value as ApprovalQueueItemStatus;
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

        {/* Agent filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 gap-2 px-2.5 text-xs font-normal",
                isAgentActive && "border-primary/40 bg-primary/5",
              )}
            >
              {ActiveAgentIcon ? (
                <ActiveAgentIcon className="h-3.5 w-3.5 text-muted-foreground" />
              ) : null}
              <span className="text-muted-foreground">Agent:</span>
              <span className="font-medium text-foreground">
                {currentAgentOption?.label}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Agent Category
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {APPROVAL_QUEUE_AGENT_FILTER_OPTIONS.map((option) => {
              const isSelected = activeAgentCategory === option.value;
              const AgentIcon =
                option.value !== ApprovalQueueAgentCategory.ALL
                  ? AGENT_METADATA_MAP[option.value]?.icon
                  : null;

              return (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setActiveAgentCategory(option.value)}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <span className="flex items-center gap-2">
                    {AgentIcon ? (
                      <AgentIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <span className="h-3.5 w-3.5" />
                    )}
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
      </div>
    </div>
  );
};

export default ApprovalQueueItemsFilter;
