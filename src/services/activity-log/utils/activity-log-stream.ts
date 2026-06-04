/**
 * Payloads in `event.data` for the activity log SSE. Only `activity_updated`
 * should drive refetches; do not use `connected` or `heartbeat` for UI.
 */
export type ActivityUpdatedReason =
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

export type ActivityLogStreamConnectedEvent = {
  type: "connected";
  timestamp: string;
  reconnectInMs: number;
};

export type ActivityLogStreamActivityUpdatedEvent = {
  type: "activity_updated";
  reason: ActivityUpdatedReason | string;
  timestamp: string;
};

export type ActivityLogStreamHeartbeatEvent = {
  type: "heartbeat";
  timestamp: string;
};
