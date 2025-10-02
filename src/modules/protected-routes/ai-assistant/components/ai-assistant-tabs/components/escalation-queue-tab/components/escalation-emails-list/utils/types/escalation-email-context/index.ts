import { ESCALATED_EMAIL_TYPE } from "../escalation-email";

type ESCALATION_EMAILS_FILTERS_CONTEXT_TYPE = {
  // Search Bar
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  // Status Tabs
  emailStatus: string;
  setEmailStatus: React.Dispatch<React.SetStateAction<string>>;
  // Priority Tabs
  emailPriority: string;
  setEmailPriority: React.Dispatch<React.SetStateAction<string>>;
  // Selected Email
  selectedEmailForPreview: string | null;
  setSelectedEmailForPreview: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  // Selected Emails
  selectedEmails: Set<string>;
  setSelectedEmails: React.Dispatch<React.SetStateAction<Set<string>>>;
  // Filtered Emails Array
  FILTERED_EMAILS: ESCALATED_EMAIL_TYPE[];
};

export type { ESCALATION_EMAILS_FILTERS_CONTEXT_TYPE };
