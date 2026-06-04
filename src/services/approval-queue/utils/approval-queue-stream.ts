/**
 * JSON payloads in `event.data` for the approval queue SSE. Only `queue_updated`
 * should trigger refetches; ignore `connected` and `heartbeat` for UI.
 */
export type ApprovalQueueUpdatedReason =
  | "workflow_created"
  | "workflow_updated"
  | "workflow_status_updated"
  | "workflow_cancelled"
  | "action_created"
  | "action_updated"
  | "action_executed"
  | "action_escalated"
  | "action_approved"
  | "action_rejected"
  | "action_edited_and_approved";

export type ApprovalQueueStreamConnectedEvent = {
  type: "connected";
  timestamp: string;
  reconnectInMs: number;
};

export type ApprovalQueueStreamQueueUpdatedEvent = {
  type: "queue_updated";
  reason: ApprovalQueueUpdatedReason | string;
  timestamp: string;
};

export type ApprovalQueueStreamHeartbeatEvent = {
  type: "heartbeat";
  timestamp: string;
};
