"use client";
import { cn } from "@/lib/utils";
import { useEscalationEmails } from "../../utils/context/escalation-emails-filters";
import { Button } from "@/components/ui/button";

const BulkActionTab = () => {
  const { selectedEmails, setSelectedEmails } = useEscalationEmails();
  return (
    <div
      className={cn(
        "bg-blue-50 p-3 rounded-lg border border-blue-200",
        !selectedEmails.size && "hidden"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-900">
          {selectedEmails.size} items selected
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setSelectedEmails(new Set())}
          className="text-blue-600 hover:text-blue-800 h-6 px-2"
        >
          Clear
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          size="sm"
          onClick={() => {}}
          //   disabled={bulkMarkInProgressMutation.isPending}
          className="bg-blue-600 hover:bg-blue-700 text-xs"
        >
          {/* {bulkMarkInProgressMutation.isPending
            ? "Updating..."
            : "Mark In Progress"} */}
          Mark In Progress
        </Button>
        <Button
          size="sm"
          //   onClick={handleBulkMarkResolved}
          //   disabled={bulkMarkResolvedMutation.isPending}
          className="bg-green-600 hover:bg-green-700 text-xs"
        >
          {/* {bulkMarkResolvedMutation.isPending
            ? "Resolving..."
            : "Mark Resolved"} */}
          Mark Resolved
        </Button>
      </div>
    </div>
  );
};

export default BulkActionTab;
