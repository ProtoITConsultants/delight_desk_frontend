"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useAiAssistant } from "@/providers/ai-assistant";
import { useUpdateEscalationStatus } from "@/hooks/services/ai-assistant/use-update-escalation-status";
import { EscalationStatus } from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import {
  CheckCircle2,
  Clock,
  Loader2,
  RotateCcw,
  X,
} from "lucide-react";

/**
 * Slides down between the toolbar and the list whenever the user has
 * selected at least one email. Keeps the surface quiet by default and
 * only paints chrome when there's work to do in bulk.
 */

const EscalationBulkActionBar: FC = () => {
  const {
    selectedEmailsForBulkAction,
    setSelectedEmailsForBulkAction,
    escalationStatus,
  } = useAiAssistant();
  const { isPending, updateEscalationStatus } = useUpdateEscalationStatus();

  const count = selectedEmailsForBulkAction.size;
  if (count === 0) return null;

  const ids = Array.from(selectedEmailsForBulkAction);
  const apply = (status: EscalationStatus) =>
    updateEscalationStatus({ type: "bulk", escalationIds: ids, status });

  return (
    <div className="flex flex-col gap-2 border-b border-primary/20 bg-primary/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm">
        {isPending && (
          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
        )}
        <span className="font-medium text-foreground">
          {count} selected
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {escalationStatus !== EscalationStatus.PENDING && (
          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            onClick={() => apply(EscalationStatus.PENDING)}
            className="h-7 gap-1 px-2 text-xs"
          >
            <RotateCcw className="h-3 w-3" />
            Pending
          </Button>
        )}
        {escalationStatus !== EscalationStatus.IN_PROGRESS && (
          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            onClick={() => apply(EscalationStatus.IN_PROGRESS)}
            className="h-7 gap-1 px-2 text-xs"
          >
            <Clock className="h-3 w-3" />
            In Progress
          </Button>
        )}
        {escalationStatus !== EscalationStatus.RESOLVED && (
          <Button
            size="sm"
            disabled={isPending}
            onClick={() => apply(EscalationStatus.RESOLVED)}
            className="h-7 gap-1 px-2 text-xs"
          >
            <CheckCircle2 className="h-3 w-3" />
            Resolve
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          disabled={isPending}
          onClick={() => setSelectedEmailsForBulkAction(new Set())}
          className="h-7 gap-1 px-2 text-xs"
          aria-label="Clear selection"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default EscalationBulkActionBar;
