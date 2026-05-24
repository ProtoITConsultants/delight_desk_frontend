"use client";
import { FC, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon, BellRing, Clock, CheckCircle2, Inbox, Flame } from "lucide-react";
import { useAiAssistant } from "@/providers/ai-assistant";
import {
  EscalationPriority,
  EscalationStatus,
} from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import {
  STATUS_COLOR_PALETTE,
  StatusColorFamily,
  StatusColorVariants,
} from "@/lib/status-palette";
import {
  ESCALATION_PRIORITY_COLOR_FAMILY,
  ESCALATION_STATUS_COLOR_FAMILY,
} from "@/modules/protected-routes/ai-assistant/utils/palette";

/**
 * Five clickable stat tiles that double as primary status / priority filters.
 *
 *  - "Pending" is the hero tile and is the only one that ever paints the page
 *    a loud orange. When its count drops to zero the hero treatment turns off
 *    so the page visibly relaxes — positive feedback for "all caught up".
 *  - Every tile is a filter shortcut. Clicking applies the matching status /
 *    priority; clicking an active tile clears it. The "Total" tile clears
 *    every active filter (a quick "show everything" affordance).
 *  - The 5th tile surfaces the Urgent priority bucket so reviewers can jump
 *    straight to fires without scanning the priority chips.
 */

type TileKind = "status" | "priority" | "total";

type StatTileConfig = {
  key: string;
  label: string;
  kind: TileKind;
  filterValue?: EscalationStatus | EscalationPriority;
  family: StatusColorFamily;
  icon: LucideIcon;
  isHero?: boolean;
};

const TILES: ReadonlyArray<StatTileConfig> = [
  {
    key: "pending",
    label: "Pending",
    kind: "status",
    filterValue: EscalationStatus.PENDING,
    family: ESCALATION_STATUS_COLOR_FAMILY[EscalationStatus.PENDING],
    icon: BellRing,
    isHero: true,
  },
  {
    key: "in-progress",
    label: "In Progress",
    kind: "status",
    filterValue: EscalationStatus.IN_PROGRESS,
    family: ESCALATION_STATUS_COLOR_FAMILY[EscalationStatus.IN_PROGRESS],
    icon: Clock,
  },
  {
    key: "resolved",
    label: "Resolved",
    kind: "status",
    filterValue: EscalationStatus.RESOLVED,
    family: ESCALATION_STATUS_COLOR_FAMILY[EscalationStatus.RESOLVED],
    icon: CheckCircle2,
  },
  {
    key: "urgent",
    label: "Urgent",
    kind: "priority",
    filterValue: EscalationPriority.URGENT,
    family: ESCALATION_PRIORITY_COLOR_FAMILY[EscalationPriority.URGENT],
    icon: Flame,
  },
  {
    key: "total",
    label: "Total",
    kind: "total",
    family: "slate",
    icon: Inbox,
  },
];

const CALM_COLORS: Pick<
  StatusColorVariants,
  "iconBg" | "iconColor" | "valueColor"
> = {
  iconBg: "bg-muted",
  iconColor: "text-muted-foreground",
  valueColor: "text-foreground",
};

type StatTileProps = {
  label: string;
  count: number;
  Icon: LucideIcon;
  isHero: boolean;
  isActive: boolean;
  onClick: () => void;
  colors: Pick<StatusColorVariants, "iconBg" | "iconColor" | "valueColor">;
};

const StatTile: FC<StatTileProps> = ({
  label,
  count,
  Icon,
  isHero,
  isActive,
  onClick,
  colors,
}) => {
  const heroEngaged = isHero && count > 0;
  const effectiveColors = isHero && !heroEngaged ? CALM_COLORS : colors;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`${label}: ${count}. ${
        isActive ? "Currently filtering." : "Tap to filter."
      }`}
      className={cn(
        "group relative flex h-full flex-col gap-2 overflow-hidden rounded-lg border bg-card p-3 text-left shadow-sm transition-colors",
        "hover:border-primary/40 hover:bg-muted/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "last:col-span-2 sm:last:col-span-1",
        isActive && "border-primary/40 bg-primary/5",
        heroEngaged && "border-orange-200/80 bg-orange-50/40",
        heroEngaged && isActive && "border-orange-300 bg-orange-50",
      )}
    >
      {heroEngaged && (
        <span
          className="absolute inset-x-0 top-0 h-0.5 bg-orange-500"
          aria-hidden
        />
      )}

      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "text-xs font-medium leading-tight",
            heroEngaged ? "text-orange-700" : "text-muted-foreground",
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
            effectiveColors.iconBg,
            effectiveColors.iconColor,
          )}
        >
          <Icon className="h-3 w-3" />
        </span>
      </div>

      <span
        className={cn(
          "mt-auto text-2xl font-semibold leading-none tabular-nums",
          effectiveColors.valueColor,
        )}
      >
        {count}
      </span>
    </button>
  );
};

const EscalationStatsStrip: FC = () => {
  const {
    escalationStats,
    isStatsPending,
    escalationStatus,
    escalationPriority,
    setEscalationStatus,
    setEscalationPriority,
    setSelectedEmailsForBulkAction,
    setSelectedEscalationForPreview,
    clearAllFilters,
  } = useAiAssistant();

  const counts = useMemo(() => {
    if (!escalationStats) return null;
    return {
      pending: escalationStats.byStatus.pending,
      "in-progress": escalationStats.byStatus.progress,
      resolved: escalationStats.byStatus.resolved,
      urgent: escalationStats.byPriority.urgent,
      total: escalationStats.total,
    } as Record<string, number>;
  }, [escalationStats]);

  if (isStatsPending || !counts) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
        {TILES.map((tile) => (
          <Skeleton
            key={tile.key}
            className="h-[88px] last:col-span-2 sm:last:col-span-1"
          />
        ))}
      </div>
    );
  }

  const handleClick = (tile: StatTileConfig) => {
    setSelectedEmailsForBulkAction(new Set());
    setSelectedEscalationForPreview(null);

    if (tile.kind === "total") {
      clearAllFilters();
      return;
    }
    if (tile.kind === "status") {
      const next = tile.filterValue as EscalationStatus;
      setEscalationStatus((prev) => (prev === next ? null : next));
      return;
    }
    if (tile.kind === "priority") {
      const next = tile.filterValue as EscalationPriority;
      setEscalationPriority((prev) => (prev === next ? null : next));
    }
  };

  const isTileActive = (tile: StatTileConfig): boolean => {
    if (tile.kind === "total") {
      return (
        escalationStatus === null &&
        escalationPriority === null
      );
    }
    if (tile.kind === "status") {
      return escalationStatus === tile.filterValue;
    }
    if (tile.kind === "priority") {
      return escalationPriority === tile.filterValue;
    }
    return false;
  };

  return (
    <div
      className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5"
      role="group"
      aria-label="Escalation queue summary"
    >
      {TILES.map((tile) => (
        <StatTile
          key={tile.key}
          label={tile.label}
          count={counts[tile.key] ?? 0}
          Icon={tile.icon}
          isHero={Boolean(tile.isHero)}
          isActive={isTileActive(tile)}
          onClick={() => handleClick(tile)}
          colors={STATUS_COLOR_PALETTE[tile.family]}
        />
      ))}
    </div>
  );
};

export default EscalationStatsStrip;
