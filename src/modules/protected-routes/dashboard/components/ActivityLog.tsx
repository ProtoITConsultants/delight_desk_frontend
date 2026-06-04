import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type {
  ActivityLogItem,
  ActivityLogItemStatus,
} from "@/services/activity-log";
import {
  AGENT_METADATA_MAP,
  STATUS_COLOR_PALETTE,
  type StatusColorFamily,
} from "@/modules/protected-routes/approval-queue/components/approval-queue-items-list/utils";
import {
  differenceInCalendarDays,
  differenceInMinutes,
  format,
  formatDistanceToNowStrict,
  isToday,
  isYesterday,
} from "date-fns";
import { Bot, Inbox, Mail, User, type LucideIcon } from "lucide-react";
import { useMemo, type FC } from "react";

/**
 * Map the simplified activity-log status (the only thing the API returns)
 * into both:
 *  - a user-facing label, and
 *  - a hue from the canonical `STATUS_COLOR_PALETTE`.
 *
 * "Failed" is deliberately re-labelled to "Couldn't complete" — the
 * activity log is one of the most user-facing surfaces in the product
 * and "failed" reads as "your AI agent is broken." Same wording as the
 * approval queue stepper so the user sees consistent language.
 */
const ACTIVITY_LOG_STATUS_STYLES: Record<
  ActivityLogItemStatus,
  { label: string; family: StatusColorFamily }
> = {
  completed: { label: "Completed", family: "emerald" },
  pending: { label: "In progress", family: "sky" },
  failed: { label: "Couldn't complete", family: "rose" },
};

/**
 * Reverse lookup from `agentName` (free-text the backend sends down) to
 * the canonical agent metadata. We use the metadata for both the badge
 * colors AND the icon, so an entry from "Wismo Agent" renders with the
 * truck glyph rather than a generic bot — making the feed scannable by
 * shape alone, not just by reading text.
 */
const AGENT_NAME_LOOKUP = new Map(
  Object.values(AGENT_METADATA_MAP).map((meta) => [
    meta.agentName.toLowerCase(),
    meta,
  ]),
);

const NEUTRAL_AGENT_STYLE = {
  bgColor: "bg-slate-100",
  textColor: "text-slate-700",
} as const;

/* -------------------------------------------------------------------------- *
 *  Date & time formatting
 *
 *  - Group header: "Today" / "Yesterday" / "Tuesday" (within a week) / full
 *    date for anything older. Same convention as Slack / Gmail / Linear.
 *  - Per-item time: relative for fresh items so recency reads at a glance
 *    ("Just now", "5m ago", "2h ago"), absolute time for anything older
 *    inside today, and absolute time for everything in past days (the date
 *    header already gives the date so we don't repeat it on each row).
 * -------------------------------------------------------------------------- */

const formatDateHeading = (date: Date): string => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  const daysAgo = differenceInCalendarDays(new Date(), date);
  if (daysAgo > 0 && daysAgo < 7) return format(date, "EEEE");
  return format(date, "MMM d, yyyy");
};

const formatRowTime = (date: Date): string => {
  const minutesAgo = differenceInMinutes(new Date(), date);
  if (minutesAgo < 1) return "Just now";
  if (isToday(date) && minutesAgo < 60) {
    return formatDistanceToNowStrict(date, { addSuffix: true });
  }
  return format(date, "h:mm a");
};

const formatFullTimestamp = (date: Date): string =>
  format(date, "EEEE, MMM d, yyyy 'at' h:mm a");

/* -------------------------------------------------------------------------- *
 *  Item card
 * -------------------------------------------------------------------------- */

const ItemCard: FC<ActivityLogItem> = ({
  id,
  message,
  actionName,
  customerEmail,
  agentName,
  status,
  timestamp,
}) => {
  const isExecutedByAi = /ai|automation|bot/i.test(agentName);

  const agentMeta = AGENT_NAME_LOOKUP.get(agentName.toLowerCase());
  const agentBadgeStyle = agentMeta ?? NEUTRAL_AGENT_STYLE;
  // Prefer the agent's own glyph so each row carries a recognizable
  // shape; fall back to Bot/User when the agent name doesn't match a
  // known category (e.g., "AI Automation", "System").
  const ActorIcon: LucideIcon =
    agentMeta?.icon ?? (isExecutedByAi ? Bot : User);

  const statusStyle = ACTIVITY_LOG_STATUS_STYLES[status];
  const statusVariants = statusStyle
    ? STATUS_COLOR_PALETTE[statusStyle.family]
    : null;

  const occurredAt = useMemo(() => new Date(timestamp), [timestamp]);
  const normalizedMessage = message.trim().toLowerCase();
  const normalizedActionName = actionName.trim().toLowerCase();
  const shouldShowMessage =
    normalizedMessage.length > 0 && normalizedMessage !== normalizedActionName;

  return (
    <div
      id={id}
      className="group flex items-start gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100/70"
    >
      <div
        className={cn(
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          agentMeta ? agentMeta.bgColor : "bg-slate-100",
        )}
        aria-hidden
      >
        <ActorIcon
          className={cn(
            "h-4 w-4",
            agentMeta ? agentMeta.textColor : "text-slate-600",
          )}
        />
      </div>
      <div className="min-w-0 flex-1">
        {/* Row 1 — badges on the left, time on the right.
            The right-aligned timestamp gives the feed a clean vertical
            column for "when", which is how every modern activity feed
            (Slack, Linear, GitHub) aligns this. */}
        <div className="mb-1 flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                "rounded-full border-transparent",
                agentBadgeStyle.bgColor,
                agentBadgeStyle.textColor,
              )}
            >
              {agentName}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "rounded-full",
                statusVariants?.softPill ?? "bg-muted text-foreground",
              )}
            >
              {statusStyle?.label ?? status}
            </Badge>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <time
                dateTime={occurredAt.toISOString()}
                className="mt-0.5 shrink-0 cursor-default text-xs tabular-nums text-gray-500"
              >
                {formatRowTime(occurredAt)}
              </time>
            </TooltipTrigger>
            <TooltipContent>{formatFullTimestamp(occurredAt)}</TooltipContent>
          </Tooltip>
        </div>

        {actionName ? (
          <p className="text-sm font-medium text-gray-800">{actionName}</p>
        ) : null}
        {shouldShowMessage ? (
          <p className="break-words text-sm text-gray-900">{message}</p>
        ) : null}
        <p className="mt-1 inline-flex items-center gap-1 text-xs text-gray-500">
          <Mail className="h-3 w-3" aria-hidden />
          <span className="break-all">{customerEmail}</span>
        </p>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- *
 *  Grouped list with sticky date headers
 *
 *  Activities arrive newest-first. We walk them in order and emit a new
 *  group whenever the calendar day changes. The sticky header sits at
 *  `top: 0` of the scroll container so the user always knows which day
 *  they're reading without having to scroll back up.
 * -------------------------------------------------------------------------- */

type ActivityGroup = {
  dateKey: string;
  heading: string;
  items: ActivityLogItem[];
};

const groupActivitiesByDate = (
  activities: ActivityLogItem[],
): ActivityGroup[] => {
  const groups: ActivityGroup[] = [];
  for (const activity of activities) {
    const occurredAt = new Date(activity.timestamp);
    const dateKey = format(occurredAt, "yyyy-MM-dd");
    const last = groups[groups.length - 1];
    if (last && last.dateKey === dateKey) {
      last.items.push(activity);
    } else {
      groups.push({
        dateKey,
        heading: formatDateHeading(occurredAt),
        items: [activity],
      });
    }
  }
  return groups;
};

type ItemListProps = {
  activities: ActivityLogItem[];
};

const ItemList: FC<ItemListProps> = ({ activities }) => {
  const groups = useMemo(
    () => groupActivitiesByDate(activities),
    [activities],
  );

  return (
    <div className="flex flex-col pb-2">
      {groups.map((group) => (
        <section key={group.dateKey} aria-label={group.heading}>
          <h3 className="sticky top-0 z-10 border-b border-border/60 bg-background/95 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
            {group.heading}
          </h3>
          <div className="space-y-3 px-4 py-3">
            {group.items.map((item) => (
              <ItemCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- *
 *  States: loading, empty, partial-page loading
 * -------------------------------------------------------------------------- */

const ActivityLogSkeleton = () => (
  <div className="space-y-3 p-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className="h-[120px] w-full rounded-lg" />
    ))}
  </div>
);

const ActivityLogBottomSkeleton = () => (
  <div className="px-4 pb-4">
    <Skeleton className="h-[100px] w-full rounded-lg" />
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
      <Inbox className="h-5 w-5 text-muted-foreground" aria-hidden />
    </div>
    <p className="text-sm font-medium text-foreground">No recent activity</p>
    <p className="max-w-xs text-xs text-muted-foreground">
      When agents or teammates take action on a ticket, you&apos;ll see it
      show up here in real time.
    </p>
  </div>
);

export type { ActivityLogItem as ActivityLogCardProps } from "@/services/activity-log";

const ActivityLog = {
  ActivityLogSkeleton,
  ActivityLogBottomSkeleton,
  EmptyState,
  ItemCard,
  ItemList,
};
export default ActivityLog;
