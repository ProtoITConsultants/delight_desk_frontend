type EmailPriority = "low" | "medium" | "high";
type EmailStatus = "pending" | "resolved" | "in_progress" | "closed";

// Email Object Type
type ESCALATED_EMAIL_TYPE = {
  id: string;
  emailId: string;
  userId: string;
  subject: string;
  customerEmail: string;
  body: string;
  priority: EmailPriority;
  status: EmailStatus;
  classification: string;
  reason: string; // Escalation reason
  assignedTo?: string;
  notes?: string;
  aiSuggestedResponse?: string;
  aiConfidence?: number;
  createdAt: string;
  resolvedAt?: string;
};

// Email Card Props
type ESCALATION_EMAIL_CARD_PROPS = Pick<
  ESCALATED_EMAIL_TYPE,
  | "id"
  | "subject"
  | "customerEmail"
  | "priority"
  | "status"
  | "reason"
  | "createdAt"
>;

export type { ESCALATED_EMAIL_TYPE, ESCALATION_EMAIL_CARD_PROPS };
