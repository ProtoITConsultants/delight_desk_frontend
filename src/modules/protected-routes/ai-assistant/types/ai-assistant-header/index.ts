export enum EscalationStatus {
  PENDING = "pending",
  IN_PROGRESS = "progress",
  RESOLVED = "resolved",
  ALL = "all",
}

export enum EscalationPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
  ALL = "all",
}

export interface PaginationType {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export enum EscalationEmailDirection {
  INCOMING = "incoming",
  OUTGOING = "outgoing",
}

interface EscalationEmailType {
  cc: string | null;
  id: string;
  bcc: string | null;
  body: string;
  userId: string;
  snippet: string;
  subject: string;
  toEmail: string;
  threadId: string;
  createdAt: string;
  direction: EscalationEmailDirection;
  fromEmail: string;
  messageId: string;
  internalDate: string;
}

export interface EscalationType {
  id: string;
  workflowId: string;
  threadId: string;
  userId: string;
  status: EscalationStatus;
  reason: string;
  email: EscalationEmailType;
  aiSuggestedResponse: string;
  aiSuggestedResponseConfidence: number;
  priority: string;
  createdAt: string;
  resolvedAt: string | null;
}

export interface STRUCTURED_ESCALATION_EMAIL_SIGNATURE {
  name: string | null;
  title: string | null;
  company: string | null;
  companyUrl: string | null;
  email: string | null;
  phoneNumber: string | null;
}

export interface HTML_ESCALATION_EMAIL_SIGNATURE {
  htmlSignature: string | null;
}
