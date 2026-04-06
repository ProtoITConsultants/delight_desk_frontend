"use client";

import { Button } from "@/components/ui/button";
import { useAiAssistant } from "@/providers/ai-assistant";

const SelectAllEscalationEmailsButton = () => {
  const {
    escalationList,
    selectedEmailsForBulkAction,
    setSelectedEmailsForBulkAction,
  } = useAiAssistant();

  const handleSelectAllEmails = () => {
    const allIds = escalationList?.map((email) => email.id) || [];
    setSelectedEmailsForBulkAction(new Set(allIds));
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={handleSelectAllEmails}
        disabled={escalationList?.length === 0}
        className="flex-1 text-xs"
      >
        Select All ({escalationList?.length || 0})
      </Button>
      {selectedEmailsForBulkAction.size > 0 && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSelectedEmailsForBulkAction(new Set())}
          className="flex-1 text-xs"
        >
          Clear ({selectedEmailsForBulkAction.size})
        </Button>
      )}
    </div>
  );
};

export default SelectAllEscalationEmailsButton;
