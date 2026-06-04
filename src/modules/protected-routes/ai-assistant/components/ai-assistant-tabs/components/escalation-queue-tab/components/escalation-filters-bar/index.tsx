"use client";
import { FC } from "react";
import {
  Search,
  Calendar,
  X,
  ChevronDown,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAiAssistant } from "@/providers/ai-assistant";
import { EscalationPriority } from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import {
  ESCALATION_PRIORITY_COLOR_FAMILY,
  ESCALATION_PRIORITY_LABEL,
  ESCALATION_STATUS_LABEL,
  ESCALATION_PRIORITY_ICON,
} from "@/modules/protected-routes/ai-assistant/utils/palette";
import { STATUS_COLOR_PALETTE } from "@/lib/status-palette";

/* --------------------------------------------------------------------- *
 *  Date range presets — kept short and operational. ISO bounds are
 *  computed at click time so refreshes still resolve to "today/yesterday"
 *  accurately even if the strip stayed mounted across midnight.
 * --------------------------------------------------------------------- */

type DatePreset = {
  id: string;
  label: string;
  /** Returns ISO `from` / `to` (or null `to` for "from this point forward"). */
  compute: () => { from: string | null; to: string | null };
};

const startOfDay = (d: Date) => {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  return out;
};
const endOfDay = (d: Date) => {
  const out = new Date(d);
  out.setHours(23, 59, 59, 999);
  return out;
};
const addDays = (d: Date, days: number) => {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
};

const DATE_PRESETS: ReadonlyArray<DatePreset> = [
  {
    id: "today",
    label: "Today",
    compute: () => {
      const now = new Date();
      return {
        from: startOfDay(now).toISOString(),
        to: endOfDay(now).toISOString(),
      };
    },
  },
  {
    id: "yesterday",
    label: "Yesterday",
    compute: () => {
      const y = addDays(new Date(), -1);
      return {
        from: startOfDay(y).toISOString(),
        to: endOfDay(y).toISOString(),
      };
    },
  },
  {
    id: "7d",
    label: "Last 7 days",
    compute: () => ({
      from: startOfDay(addDays(new Date(), -6)).toISOString(),
      to: endOfDay(new Date()).toISOString(),
    }),
  },
  {
    id: "30d",
    label: "Last 30 days",
    compute: () => ({
      from: startOfDay(addDays(new Date(), -29)).toISOString(),
      to: endOfDay(new Date()).toISOString(),
    }),
  },
  {
    id: "this-month",
    label: "This month",
    compute: () => {
      const now = new Date();
      const first = new Date(now.getFullYear(), now.getMonth(), 1);
      return {
        from: startOfDay(first).toISOString(),
        to: endOfDay(now).toISOString(),
      };
    },
  },
];

const PRIORITY_ORDER: ReadonlyArray<EscalationPriority> = [
  EscalationPriority.URGENT,
  EscalationPriority.HIGH,
  EscalationPriority.MEDIUM,
  EscalationPriority.LOW,
];

const formatRangeLabel = (
  from: string | null,
  to: string | null,
): string | null => {
  if (!from && !to) return null;
  // Try to match a preset for the cleanest label.
  for (const preset of DATE_PRESETS) {
    const { from: pf, to: pt } = preset.compute();
    if (pf === from && pt === to) return preset.label;
  }
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  if (from && to) return `${fmt(from)} – ${fmt(to)}`;
  if (from) return `Since ${fmt(from)}`;
  if (to) return `Until ${fmt(to)}`;
  return null;
};

const EscalationFiltersBar: FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    escalationPriority,
    setEscalationPriority,
    escalationStatus,
    setEscalationStatus,
    dateRange,
    setDateRange,
    setCurrentPage,
    setSelectedEscalationForPreview,
  } = useAiAssistant();

  const onChangePriority = (next: EscalationPriority | null) => {
    setEscalationPriority(next);
    setCurrentPage(1);
    setSelectedEscalationForPreview(null);
  };

  const onSelectDatePreset = (preset: DatePreset) => {
    const { from, to } = preset.compute();
    setDateRange({ from, to });
    setCurrentPage(1);
    setSelectedEscalationForPreview(null);
  };

  const clearDate = () => {
    setDateRange({ from: null, to: null });
    setCurrentPage(1);
  };

  const dateLabel = formatRangeLabel(dateRange.from, dateRange.to);
  const hasActiveFilters =
    !!searchQuery ||
    !!escalationStatus ||
    !!escalationPriority ||
    !!dateRange.from ||
    !!dateRange.to;

  // Selected priority label for the compact dropdown trigger shown below xl.
  // Falls back to a generic "Priority" so the trigger never collapses to a
  // bare icon on tiny widths.
  const activePriorityKey =
    escalationPriority &&
    (escalationPriority as keyof typeof ESCALATION_PRIORITY_LABEL);
  const activePriorityLabel = activePriorityKey
    ? ESCALATION_PRIORITY_LABEL[activePriorityKey]
    : null;
  const ActivePriorityIcon = activePriorityKey
    ? ESCALATION_PRIORITY_ICON[activePriorityKey]
    : SlidersHorizontal;

  return (
    <div className="flex flex-col gap-3">
      {/* Top row: search + priority chips + date range */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap">
        <div className="relative w-full sm:max-w-sm sm:flex-1 xl:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by subject, sender, or content..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>

        {/* Compact priority dropdown — visible below xl where the chip strip
            would otherwise crowd the search input. */}
        <div className="flex items-center gap-1.5 sm:ml-auto xl:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 gap-1.5",
                  escalationPriority &&
                    "border-primary/40 bg-primary/5 text-primary",
                )}
              >
                <ActivePriorityIcon className="h-3.5 w-3.5" />
                <span>{activePriorityLabel ?? "All priorities"}</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Filter by priority
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => onChangePriority(null)}>
                <span className="flex flex-1 items-center gap-2">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>All priorities</span>
                </span>
                {escalationPriority === null && (
                  <Check className="ml-2 h-3.5 w-3.5 text-primary" />
                )}
              </DropdownMenuItem>
              {PRIORITY_ORDER.map((priority) => {
                const key = priority as keyof typeof ESCALATION_PRIORITY_LABEL;
                const Icon = ESCALATION_PRIORITY_ICON[key];
                const isActive = escalationPriority === priority;
                return (
                  <DropdownMenuItem
                    key={priority}
                    onSelect={() =>
                      onChangePriority(isActive ? null : priority)
                    }
                  >
                    <span className="flex flex-1 items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{ESCALATION_PRIORITY_LABEL[key]}</span>
                    </span>
                    {isActive && (
                      <Check className="ml-2 h-3.5 w-3.5 text-primary" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <DateRangeDropdown
            dateLabel={dateLabel}
            onSelectDatePreset={onSelectDatePreset}
            onClearDate={clearDate}
          />
        </div>

        {/* Power-user priority chip strip — only at xl+ where the row has the
            horizontal budget to render all 5 chips alongside the search input
            and the date button without wrapping. */}
        <div className="hidden xl:ml-auto xl:flex xl:flex-wrap xl:items-center xl:gap-1.5">
          <PriorityChip
            label="All priorities"
            isActive={escalationPriority === null}
            onClick={() => onChangePriority(null)}
            family={null}
          />
          {PRIORITY_ORDER.map((priority) => {
            const key = priority as keyof typeof ESCALATION_PRIORITY_LABEL;
            const Icon = ESCALATION_PRIORITY_ICON[key];
            return (
              <PriorityChip
                key={priority}
                label={ESCALATION_PRIORITY_LABEL[key]}
                isActive={escalationPriority === priority}
                onClick={() =>
                  onChangePriority(
                    escalationPriority === priority ? null : priority,
                  )
                }
                family={ESCALATION_PRIORITY_COLOR_FAMILY[key]}
                icon={<Icon className="h-3 w-3" />}
              />
            );
          })}

          <DateRangeDropdown
            dateLabel={dateLabel}
            onSelectDatePreset={onSelectDatePreset}
            onClearDate={clearDate}
          />
        </div>
      </div>

      {/* Active filter chips row. Only renders when there's at least one
          filter to show — empty space stays out of the layout. */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          {searchQuery && (
            <ActiveFilterChip
              label={`Search: "${searchQuery}"`}
              onClear={() => setSearchQuery("")}
            />
          )}
          {escalationStatus && (
            <ActiveFilterChip
              label={`Status: ${
                ESCALATION_STATUS_LABEL[
                  escalationStatus as keyof typeof ESCALATION_STATUS_LABEL
                ] ?? escalationStatus
              }`}
              onClear={() => setEscalationStatus(null)}
            />
          )}
          {escalationPriority && (
            <ActiveFilterChip
              label={`Priority: ${
                ESCALATION_PRIORITY_LABEL[
                  escalationPriority as keyof typeof ESCALATION_PRIORITY_LABEL
                ] ?? escalationPriority
              }`}
              onClear={() => setEscalationPriority(null)}
            />
          )}
          {dateLabel && (
            <ActiveFilterChip label={dateLabel} onClear={clearDate} />
          )}
        </div>
      )}
    </div>
  );
};

export default EscalationFiltersBar;

/* ----------------------- Sub-components ----------------------- */

type PriorityChipProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  family: string | null;
  icon?: React.ReactNode;
};

const PriorityChip: FC<PriorityChipProps> = ({
  label,
  isActive,
  onClick,
  family,
  icon,
}) => {
  const activeStyles =
    family && family in STATUS_COLOR_PALETTE
      ? STATUS_COLOR_PALETTE[family as keyof typeof STATUS_COLOR_PALETTE]
          .chipActiveBg
      : "bg-primary/10 text-primary border-primary/30";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs font-medium transition-colors cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive
          ? activeStyles
          : "border-border bg-background text-muted-foreground hover:bg-muted",
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

type DateRangeDropdownProps = {
  dateLabel: string | null;
  onSelectDatePreset: (preset: DatePreset) => void;
  onClearDate: () => void;
};

const DateRangeDropdown: FC<DateRangeDropdownProps> = ({
  dateLabel,
  onSelectDatePreset,
  onClearDate,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "h-8 gap-1.5",
          dateLabel && "border-primary/40 bg-primary/5 text-primary",
        )}
      >
        <Calendar className="h-3.5 w-3.5" />
        <span>{dateLabel ?? "Any time"}</span>
        <ChevronDown className="h-3 w-3 opacity-60" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-44">
      <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
        Filter by created date
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {DATE_PRESETS.map((preset) => (
        <DropdownMenuItem
          key={preset.id}
          onSelect={() => onSelectDatePreset(preset)}
        >
          {preset.label}
        </DropdownMenuItem>
      ))}
      {dateLabel && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={onClearDate}>
            Clear date filter
          </DropdownMenuItem>
        </>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
);

type ActiveFilterChipProps = {
  label: string;
  onClear: () => void;
};

const ActiveFilterChip: FC<ActiveFilterChipProps> = ({ label, onClear }) => (
  <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 py-1 pl-2 pr-1 text-xs text-foreground">
    <span className="font-medium">{label}</span>
    <button
      type="button"
      onClick={onClear}
      className="ml-0.5 rounded-sm p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
      aria-label={`Clear ${label}`}
    >
      <X className="h-3 w-3" />
    </button>
  </span>
);
