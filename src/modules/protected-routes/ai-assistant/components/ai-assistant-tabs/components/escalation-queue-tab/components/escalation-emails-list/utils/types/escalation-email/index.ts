type EmailPriority = "low" | "medium" | "high" | "urgent";
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

export type { ESCALATED_EMAIL_TYPE };
