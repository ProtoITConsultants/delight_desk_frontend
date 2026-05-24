"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { CheckSquare, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAiAssistant } from "@/providers/ai-assistant";

/**
 * Compact header strip for the email list panel.
 *
 *  - Left: result count (clear feedback for filters).
 *  - Right: "Select all" toggle. Promotes bulk mode into a single
 *    affordance instead of always-on checkboxes. When at least one item
 *    is selected the button becomes "Clear N selected".
 */

const EscalationListToolbar: FC = () => {
  const {
    escalationList,
    totalItems,
    isPending,
    selectedEmailsForBulkAction,
    setSelectedEmailsForBulkAction,
  } = useAiAssistant();

  const visibleCount = escalationList?.length ?? 0;
  const selectedCount = selectedEmailsForBulkAction.size;
  const allVisibleSelected =
    visibleCount > 0 &&
    escalationList?.every((escalation) =>
      selectedEmailsForBulkAction.has(escalation.id),
    );

  const toggleSelectAll = () => {
    if (allVisibleSelected || selectedCount > 0) {
      setSelectedEmailsForBulkAction(new Set());
      return;
    }
    setSelectedEmailsForBulkAction(
      new Set((escalationList ?? []).map((escalation) => escalation.id)),
    );
  };

  return (
    <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-4 py-2.5">
      <div className="text-xs text-muted-foreground">
        {isPending ? (
          <span>Loading...</span>
        ) : visibleCount === 0 ? (
          <span>No results</span>
        ) : (
          <span>
            <span className="font-medium text-foreground tabular-nums">
              {visibleCount}
            </span>
            {totalItems > visibleCount && (
              <>
                {" "}
                of{" "}
                <span className="font-medium text-foreground tabular-nums">
                  {totalItems}
                </span>
              </>
            )}{" "}
            {totalItems === 1 ? "result" : "results"}
          </span>
        )}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={toggleSelectAll}
        disabled={visibleCount === 0}
        className={cn(
          "h-7 gap-1.5 px-2 text-xs",
          selectedCount > 0 && "text-primary hover:text-primary",
        )}
      >
        {selectedCount > 0 ? (
          <>
            <CheckSquare className="h-3.5 w-3.5" />
            <span>Clear {selectedCount} selected</span>
          </>
        ) : (
          <>
            <Square className="h-3.5 w-3.5" />
            <span>Select all</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default EscalationListToolbar;
