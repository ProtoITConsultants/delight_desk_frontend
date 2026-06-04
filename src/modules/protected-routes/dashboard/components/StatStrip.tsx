import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import TimeRangeSelector from "@/modules/protected-routes/dashboard/components/TimeRangeSelector";
import { DASHBOARD_ANALYTICS_RANGE } from "@/services/dashboard/types";
import { Activity } from "lucide-react";

type StatStripItem = {
  label: string;
  value: number | string;
  hint?: string;
  iconBgClass: string;
  iconColorClass: string;
  icon: React.ComponentType<{ className?: string }>;
};

type StatStripProps = {
  items: StatStripItem[];
  timeRange: DASHBOARD_ANALYTICS_RANGE;
  setTimeRange: (range: DASHBOARD_ANALYTICS_RANGE) => void;
  isLoading?: boolean;
};

const StatStrip = ({
  items,
  timeRange,
  setTimeRange,
  isLoading = false,
}: StatStripProps) => {
  return (
    <Card className="overflow-hidden p-0 gap-0 rounded-lg">
      <div className="flex flex-col gap-2 border-b bg-gray-50/60 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <Activity className="h-4 w-4" />
            Performance Overview
          </div>
          <p className="text-muted-foreground mt-0.5 text-sm">
            Track key metrics across your AI agents and assistant
          </p>
        </div>
        <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
      </div>

      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="bg-card flex items-center gap-3 px-4 py-5"
              >
                <Skeleton className="h-11 w-11 shrink-0 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-7 w-24" />
                </div>
              </div>
            ))
          : items.map(
              ({
                label,
                value,
                hint,
                iconBgClass,
                iconColorClass,
                icon: Icon,
              }) => (
                <div
                  key={label}
                  title={hint}
                  className="bg-card flex items-center gap-3 px-4 py-5 transition-colors hover:bg-gray-50/60"
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
                      iconBgClass,
                    )}
                  >
                    <Icon className={cn("h-5 w-5", iconColorClass)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-tight text-gray-800">
                      {label}
                    </p>
                    <p
                      className={cn(
                        "mt-1 truncate text-2xl font-semibold tabular-nums",
                        iconColorClass,
                      )}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              ),
            )}
      </div>
    </Card>
  );
};

export default StatStrip;
