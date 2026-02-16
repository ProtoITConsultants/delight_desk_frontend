import {
  EscalationPriority,
  EscalationStatus,
  EscalationType,
  HTML_ESCALATION_EMAIL_SIGNATURE,
  PaginationType,
  STRUCTURED_ESCALATION_EMAIL_SIGNATURE,
} from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";

export interface GetEscalationListParams {
  page: number;
  limit: number;
  status?: EscalationStatus;
  priority?: EscalationPriority;
  search?: string;
}

export interface GET_ESCALATION_LIST_RESPONSE {
  data: EscalationType[];
  pagination: PaginationType;
}

export interface ESCALATION_STATS {
  total: number;
  byStatus: {
    pending: number;
    progress: number;
    resolved: number;
  };
  byPriority: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
}

export interface UPDATE_ESCALATION_STATUS_PARAMS {
  escalationId: string;
  status: EscalationStatus;
}

export interface BULK_UPDATE_ESCALATION_STATUS_PARAMS {
  escalationIds: string[];
  status: EscalationStatus;
}

export interface SEND_ESCALATION_RESPONSE_PARAMS {
  escalationId: string;
  message: string;
  includeEmailSignature: boolean;
}

export interface ESCALATION_EMAIL_SIGNATURE {
  structured: STRUCTURED_ESCALATION_EMAIL_SIGNATURE;
  html: HTML_ESCALATION_EMAIL_SIGNATURE;
}

export type UPDATE_STRUCTURED_EMAIL_SIGNATURE_PARAMS =
  STRUCTURED_ESCALATION_EMAIL_SIGNATURE;

export type UPDATE_HTML_EMAIL_SIGNATURE_PARAMS =
  HTML_ESCALATION_EMAIL_SIGNATURE;

export interface GENERATE_AI_RESPONSE_PARAMS {
  escalationId: string;
  instruction: string;
}

export interface GENERATE_AI_RESPONSE_RESPONSE {
  response: string;
}
