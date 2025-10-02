"use client";

import { Button } from "@/components/ui/button";
import { useEscalationEmails } from "../../utils/context/escalation-emails-filters";

const SelectAllEscalationEmailsButton = () => {
  const { FILTERED_EMAILS, selectedEmails, setSelectedEmails } =
    useEscalationEmails();

  const handleSelectAllEmails = () => {
    const allIds = FILTERED_EMAILS.map((email) => email.id);
    setSelectedEmails(new Set(allIds));
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={handleSelectAllEmails}
        disabled={FILTERED_EMAILS.length === 0}
        className="flex-1 text-xs"
      >
        Select All ({FILTERED_EMAILS.length})
      </Button>
      {selectedEmails.size > 0 && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSelectedEmails(new Set())}
          className="flex-1 text-xs"
        >
          Clear ({selectedEmails.size})
        </Button>
      )}
    </div>
  );
};

export default SelectAllEscalationEmailsButton;
