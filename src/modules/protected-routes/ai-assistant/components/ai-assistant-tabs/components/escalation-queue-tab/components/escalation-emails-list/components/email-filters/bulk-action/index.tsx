"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAiAssistant } from "@/providers/ai-assistant";
import { useUpdateEscalationStatus } from "@/hooks/services/ai-assistant/use-update-escalation-status";
import { EscalationStatus } from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";

const BulkActionTab = () => {
  const {
    selectedEmailsForBulkAction,
    setSelectedEmailsForBulkAction,
    escalationStatus,
  } = useAiAssistant();
  const { isPending, updateEscalationStatus } = useUpdateEscalationStatus();
  return (
    <div
      className={cn(
        "bg-blue-50 p-3 rounded-lg border border-blue-200",
        !selectedEmailsForBulkAction.size && "hidden",
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-900">
          {selectedEmailsForBulkAction.size} items selected
        </span>
        <Button
          size="sm"
          variant="link"
          onClick={() => setSelectedEmailsForBulkAction(new Set())}
          className="text-blue-600 hover:text-blue-800 h-6 px-2"
        >
          Clear
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {escalationStatus !== EscalationStatus.PENDING && (
          <Button
            size="sm"
            onClick={() =>
              updateEscalationStatus({
                type: "bulk",
                escalationIds: Array.from(selectedEmailsForBulkAction),
                status: EscalationStatus.PENDING,
              })
            }
            disabled={isPending}
            className="bg-orange-500 hover:bg-orange-600 text-xs"
          >
            Mark as Pending
          </Button>
        )}
        {escalationStatus !== EscalationStatus.IN_PROGRESS && (
          <Button
            size="sm"
            onClick={() =>
              updateEscalationStatus({
                type: "bulk",
                escalationIds: Array.from(selectedEmailsForBulkAction),
                status: EscalationStatus.IN_PROGRESS,
              })
            }
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-xs"
          >
            Mark In Progress
          </Button>
        )}
        {escalationStatus !== EscalationStatus.RESOLVED && (
          <Button
            size="sm"
            onClick={() =>
              updateEscalationStatus({
                type: "bulk",
                escalationIds: Array.from(selectedEmailsForBulkAction),
                status: EscalationStatus.RESOLVED,
              })
            }
            disabled={isPending}
            className="bg-green-600 hover:bg-green-700 text-xs"
          >
            Mark Resolved
          </Button>
        )}
      </div>
    </div>
  );
};

export default BulkActionTab;
