import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ActivityLogItem } from "@/services/activity-log";
import { Bot, User } from "lucide-react";

const ItemCard = ({
  id,
  message,
  actionName,
  customerEmail,
  agentName,
  status,
  timestamp,
}: ActivityLogItem) => {
  const executedBy: "human" | "ai" = /ai|automation|bot/i.test(agentName)
    ? "ai"
    : "human";

  return (
    <div id={id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0 mt-1">
        {executedBy === "ai" ? (
          <Bot className="h-4 w-4" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <Badge
            variant="default"
            className={cn(
              "rounded-full",
              executedBy === "ai" ? "bg-[#2094f3]" : "bg-gray-500"
            )}
          >
            {agentName}
          </Badge>
          <Badge
            variant={status === "failed" ? "destructive" : "default"}
            className={cn(
              "rounded-full",
              status === "pending" ? "bg-yellow-500" : ""
            )}
          >
            {status}
          </Badge>
        </div>
        {actionName ? (
          <p className="text-sm font-medium text-gray-800">{actionName}</p>
        ) : null}
        <p className="text-sm text-gray-900">{message}</p>
        <p className="text-xs text-gray-500 mt-1">
          {customerEmail} •{" "}
          {new Date(timestamp).toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
};

export type { ActivityLogItem as ActivityLogCardProps } from "@/services/activity-log";

const ActivityLogSkeleton = () => (
  <div className="space-y-3 p-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className="h-[120px] w-full rounded-lg" />
    ))}
  </div>
);

const ActivityLogBottomSkeleton = () => (
  <Skeleton className="h-[100px] w-full rounded-lg" />
);

const ActivityLog = { ActivityLogSkeleton, ActivityLogBottomSkeleton, ItemCard };
export default ActivityLog;
