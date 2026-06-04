"use client";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAiAssistant } from "@/providers/ai-assistant";
import EscalationEmailCard from "./components/email-card";
import EscalationEmailsSkeleton from "./components/emails-skeleton";

const EscalationEmailsList = () => {
  const {
    escalationList,
    isPending,
    searchQuery,
    escalationStatus,
    escalationPriority,
    dateRange,
    clearAllFilters,
  } = useAiAssistant();

  if (isPending) {
    return <EscalationEmailsSkeleton />;
  }

  const hasFiltersApplied =
    !!searchQuery ||
    !!escalationStatus ||
    !!escalationPriority ||
    !!dateRange.from ||
    !!dateRange.to;

  if (!escalationList || escalationList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
        <div className="rounded-full bg-muted p-3">
          <Inbox className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            {hasFiltersApplied
              ? "No escalations match these filters"
              : "All caught up"}
          </p>
          <p className="text-xs text-muted-foreground">
            {hasFiltersApplied
              ? "Try clearing a filter or expanding the date range."
              : "New escalations will appear here in real time."}
          </p>
        </div>
        {hasFiltersApplied && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={clearAllFilters}
            className="h-8 text-xs"
          >
            Clear all filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      {escalationList.map((escalation) => (
        <EscalationEmailCard key={escalation.id} {...escalation} />
      ))}
    </div>
  );
};

export default EscalationEmailsList;
