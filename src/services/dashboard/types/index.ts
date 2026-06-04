export type DASHBOARD_ANALYTICS_RANGE =
  | "today"
  | "last_7_days"
  | "last_30_days"
  | "last_365_days";

export type GET_DASHBOARD_ANALYTICS_PARAMS = {
  range: DASHBOARD_ANALYTICS_RANGE;
};

export type GET_DASHBOARD_ANALYTICS_RESPONSE = {
  range: DASHBOARD_ANALYTICS_RANGE;
  from: string;
  to: string;
  aiAgentActionsCompleted: number;
  aiAssistantTicketsResolved: number;
  totalEmailsReceived: number;
  timeSavedMinutes: number;
  averageActionsPerResolvedTicket: number;
};

export type NavBadgeCounts = {
  approvalQueuePendingApproval: number;
  aiAssistantPending: number;
};
