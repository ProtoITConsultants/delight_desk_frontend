import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

export type ActivityLogCardProps = {
  id: string;
  //   action: string;
  //   type: string;
  executedBy: "human" | "ai";
  customerEmail: string;
  details: string;
  status: "completed" | "pending" | "failed";
  createdAt: string;
};

const ItemCard = ({
  id,
  executedBy,
  customerEmail,
  details,
  status,
  createdAt,
}: ActivityLogCardProps) => (
  <div id={id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
    <div className="flex-shrink-0 mt-1">
      {executedBy === "ai" ? (
        <Bot className="h-4 w-4" />
      ) : (
        <User className="h-4 w-4" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <Badge
          variant="default"
          className={cn(
            "rounded-full",
            executedBy === "ai" ? "bg-[#2094f3]" : "bg-gray-500"
          )}
        >
          {executedBy === "ai" ? "AI" : "Human"}
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
      <p className="text-sm text-gray-900">{details}</p>
      <p className="text-xs text-gray-500 mt-1">
        {customerEmail} • {new Date(createdAt).toLocaleTimeString()}
      </p>
    </div>
  </div>
);

const ActivityLogSkeleton = () => (
  <div className="space-y-3 p-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className="h-[120px] w-full rounded-lg" />
    ))}
  </div>
);

const ActivityLog = { ActivityLogSkeleton, ItemCard };
export default ActivityLog;
