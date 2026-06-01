"use client";

import { FC, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";
import { useApprovalQueueContext } from "@/providers/approval-queue";
import { useApprovalQueueStats } from "@/hooks/services/approval-queue/use-approval-queue-stats";
import {
  APPROVAL_QUEUE_PENDING_APPROVAL_FILTER,
  ApprovalQueueItemStatus,
  ApprovalQueueStatusFilter,
} from "@/modules/protected-routes/approval-queue/utils/constants";
import {
  APPROVAL_QUEUE_STATUS_STYLES,
  STATUS_COLOR_PALETTE,
  StatusColorVariants,
  WORKFLOW_STATUS_COLOR_FAMILY,
} from "../approval-queue-items-list/utils";

/**
 * Compact stats strip that sits between the page header and the filter row.
 *
 * Design notes:
 *  - Five equal-weight tiles: Awaiting Approval (hero), In Progress, Escalated,
 *    Completed, Cancelled. Pending is intentionally omitted from this surface
 *    — it's still filterable from the dropdown for power users, but the
 *    analytics view focuses on states the user actually acts on day-to-day.
 *  - The hero "Awaiting Approval" tile is the only one that ever uses orange.
 *    When its count drops to zero the orange treatment turns off so the page
 *    visibly relaxes — positive feedback for "all caught up" instead of a
 *    permanently-alarming UI.
 *  - Every tile is a filter shortcut. Clicking applies the matching status;
 *    clicking the already-active tile clears it. The dropdown still hosts
 *    the full list of statuses (including Pending) so this strip never has
 *    to be exhaustive — it just surfaces the high-traffic ones quickly.
 */

type StatTileConfig = {
  label: string;
  filterValue: ApprovalQueueStatusFilter;
  isHero?: boolean;
};

const PRIMARY_TILES: ReadonlyArray<StatTileConfig> = [
  {
    label: "Awaiting Approval",
    filterValue: APPROVAL_QUEUE_PENDING_APPROVAL_FILTER,
    isHero: true,
  },
  {
    label: "In Progress",
    filterValue: ApprovalQueueItemStatus.IN_PROGRESS,
  },
  {
    label: "Escalated",
    filterValue: ApprovalQueueItemStatus.ESCALATED,
  },
  {
    label: "Completed",
    filterValue: ApprovalQueueItemStatus.COMPLETED,
  },
  {
    label: "Cancelled",
    filterValue: ApprovalQueueItemStatus.CANCELLED,
  },
];

/**
 * Per-tile color identity. We pull straight from the canonical
 * `STATUS_COLOR_PALETTE` — keyed by each tile's `filterValue` — so changing
 * a status hue in one place updates the stats tile, the filter dot, the
 * card pill, and the stepper step in lockstep.
 */
type StatTileColors = Pick<
  StatusColorVariants,
  "iconBg" | "iconColor" | "valueColor"
>;

const tileColorsFor = (filter: ApprovalQueueStatusFilter): StatTileColors => {
  const family = WORKFLOW_STATUS_COLOR_FAMILY[filter];
  const variants = STATUS_COLOR_PALETTE[family];
  return {
    iconBg: variants.iconBg,
    iconColor: variants.iconColor,
    valueColor: variants.valueColor,
  };
};

// Fallback palette used by the hero tile when its count is zero. The
// "calm-when-zero" rule deliberately strips both the color identity *and*
// the hero structural treatment so the page visibly relaxes when the user
// has no work to review.
const CALM_TILE_COLORS: StatTileColors = {
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
  colors: StatTileColors;
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
  // The hero treatment only "engages" when there's actually work to review.
  // A zero count returns the tile to both the calm palette and the calm
  // structural treatment so the page goes visibly quiet when the user is
  // caught up.
  const heroEngaged = isHero && count > 0;
  const effectiveColors = isHero && !heroEngaged ? CALM_TILE_COLORS : colors;

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
        // Stretch the lone orphan tile on mobile (5 items in 2 cols) so the
        // bottom row never has an awkward half-width tile. Snaps back to one
        // column from sm upwards.
        "last:col-span-2 sm:last:col-span-1",
        isActive && "border-primary/40 bg-primary/5",
        // Hero-only structural treatment: tinted card background + border
        // tint. This keeps the Awaiting tile dominant now that every tile
        // has a color identity of its own.
        heroEngaged && "border-orange-200/80 bg-orange-50/40",
        heroEngaged && isActive && "border-orange-300 bg-orange-50",
      )}
    >
      {/* Top row: label leads, icon trails. The label is the small
          contextual title ("what am I looking at?") and the icon is a
          quiet accent — together they form one semantic unit (Gestalt
          proximity) so the eye treats them as the card's "header". The
          label stays muted on every tile so the colored numeral below is
          the only color-coded data point — labels would otherwise compete
          with the value for chromatic attention. */}
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

      {/* Value anchored to the bottom via `mt-auto`. The numeral carries
          the per-status color so users can scan the strip by hue alone
          without reading any labels. */}
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

export const ApprovalQueueStats: FC = () => {
  const { data: stats, isPending, isError } = useApprovalQueueStats();
  const { selectedItemStatus, setSelectedItemStatus } =
    useApprovalQueueContext();

  const handleTileClick = (filterValue: ApprovalQueueStatusFilter) => {
    // Toggle: clicking the currently-active filter clears it. Anywhere else
    // swaps to the new filter. Same affordance the dropdown uses.
    if (selectedItemStatus === filterValue) {
      setSelectedItemStatus(null);
      return;
    }
    setSelectedItemStatus(filterValue);
  };

  const countsByFilter = useMemo(() => {
    if (!stats) return null;
    return {
      [APPROVAL_QUEUE_PENDING_APPROVAL_FILTER]: stats.pendingApproval,
      [ApprovalQueueItemStatus.IN_PROGRESS]: stats.inProgress,
      [ApprovalQueueItemStatus.ESCALATED]: stats.escalated,
      [ApprovalQueueItemStatus.COMPLETED]: stats.completed,
      [ApprovalQueueItemStatus.CANCELLED]: stats.cancelled,
    } satisfies Record<ApprovalQueueStatusFilter, number>;
  }, [stats]);

  // Failure mode: drop the strip entirely rather than render a noisy error
  // banner. The items list below is the primary surface and we don't want
  // a secondary aggregate to drag the user into incident-response mode.
  if (isError) return null;

  if (isPending || !countsByFilter) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
        {PRIMARY_TILES.map((tile) => (
          <Skeleton
            key={tile.filterValue}
            className="h-[88px] last:col-span-2 sm:last:col-span-1"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5"
      role="group"
      aria-label="Approval queue summary"
    >
      {PRIMARY_TILES.map((tile) => {
        const styles = APPROVAL_QUEUE_STATUS_STYLES[tile.filterValue];
        return (
          <StatTile
            key={tile.filterValue}
            label={tile.label}
            count={countsByFilter[tile.filterValue]}
            Icon={styles.icon}
            isHero={Boolean(tile.isHero)}
            isActive={selectedItemStatus === tile.filterValue}
            onClick={() => handleTileClick(tile.filterValue)}
            colors={tileColorsFor(tile.filterValue)}
          />
        );
      })}
    </div>
  );
};

export default ApprovalQueueStats;
