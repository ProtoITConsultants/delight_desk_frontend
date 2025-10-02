type ESCALATED_EMAIL_TYPE = {
  id: string;
  emailId: string;
  userId: string;
  subject: string;
  customerEmail: string;
  body: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "resolved" | "closed";
  classification: string;
  reason: string;
  assignedTo?: string;
  notes?: string;
  aiSuggestedResponse?: string;
  aiConfidence?: number;
  createdAt: string;
  resolvedAt?: string;
};

export type { ESCALATED_EMAIL_TYPE };
