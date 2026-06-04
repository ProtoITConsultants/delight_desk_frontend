/**
 * Shapes of SSE data payloads (JSON in `event.data` for custom event types).
 * Only `escalations_updated` should drive UI refetches; ignore `connected` and `heartbeat` listeners.
 */
export type EscalationsUpdatedReason =
  | "escalation_created"
  | "escalation_status_updated"
  | "escalations_bulk_status_updated"
  | "escalation_response_sent"
  | "incoming_email_received"
  | "outgoing_email_recorded";

export type AiAssistantStreamConnectedEvent = {
  type: "connected";
  timestamp: string;
  reconnectInMs: number;
};

export type AiAssistantStreamEscalationsUpdatedEvent = {
  type: "escalations_updated";
  reason: EscalationsUpdatedReason;
  timestamp: string;
};

export type AiAssistantStreamHeartbeatEvent = {
  type: "heartbeat";
  timestamp: string;
};

export type AiAssistantStreamEventData =
  | AiAssistantStreamConnectedEvent
  | AiAssistantStreamEscalationsUpdatedEvent
  | AiAssistantStreamHeartbeatEvent;
