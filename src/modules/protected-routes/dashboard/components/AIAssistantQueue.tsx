import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getEmailPriorityColor } from "@/utils/getEmailPriorityColor";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type EscalationCardProps = {
  escalationQueueId: string;
  priority: string;
  customerEmailSubject: string;
  customerEmail: string;
  customerEmailBody: string;
  createdAt: string;
};

const EmailCard = ({
  escalationQueueId,
  priority,
  customerEmailSubject,
  customerEmail,
  customerEmailBody,
  createdAt,
}: EscalationCardProps) => (
  <div className="p-3 border rounded-lg bg-white">
    <div className="flex items-center justify-between mb-2">
      <Badge
        className={cn(
          "rounded-full uppercase",
          getEmailPriorityColor(priority)
        )}
      >
        {priority}
      </Badge>
      <Button size="sm" variant="outline" asChild>
        <Link href={`/ai-assistant?email=${escalationQueueId}`}>
          <ExternalLink className="h-4 w-4 mr-1" />
          Reply in AI Assistant
        </Link>
      </Button>
    </div>
    <p className="text-sm font-medium text-gray-900 mb-1">
      {customerEmailSubject}
    </p>
    <p className="text-xs text-gray-600 mb-2">{customerEmail}</p>
    <p className="text-xs text-gray-500">{customerEmailBody}</p>
    <p className="text-xs text-gray-400 mt-2">
      {new Date(createdAt).toLocaleString()}
    </p>
  </div>
);

const EmailCardsSkeleton = () => (
  <div className="space-y-3 p-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className="h-[120px] w-full rounded-lg" />
    ))}
  </div>
);

const AIAssistantQueue = { EmailCard, EmailCardsSkeleton };

export default AIAssistantQueue;
