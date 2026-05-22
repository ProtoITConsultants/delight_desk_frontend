import { ApprovalQueueWorkflowActionStatus } from "@/modules/protected-routes/approval-queue/utils/constants";
import { ApprovalQueueWorkflowAction } from "@/modules/protected-routes/approval-queue/utils/types";
import {
  AlertTriangle,
  Check,
  CircleStop,
  Clock,
  Loader2,
  LucideIcon,
  XCircle,
} from "lucide-react";
import { createElement, ReactNode } from "react";

const TERMINAL_ACTION_STATUSES: ApprovalQueueWorkflowActionStatus[] = [
  ApprovalQueueWorkflowActionStatus.ESCALATED,
  ApprovalQueueWorkflowActionStatus.REJECTED,
  ApprovalQueueWorkflowActionStatus.FAILED,
  ApprovalQueueWorkflowActionStatus.CANCELLED,
];

const IN_PROGRESS_ACTION_STATUSES: ApprovalQueueWorkflowActionStatus[] = [
  ApprovalQueueWorkflowActionStatus.PENDING_APPROVAL,
  ApprovalQueueWorkflowActionStatus.EXECUTING,
  ApprovalQueueWorkflowActionStatus.AWAITING_CUSTOMER_REPLY,
];

const ACTION_STATUS_LABELS: Partial<
  Record<ApprovalQueueWorkflowActionStatus, { text: string; className: string }>
> = {
  [ApprovalQueueWorkflowActionStatus.ESCALATED]: {
    text: "Escalated",
    className: "text-amber-700",
  },
  [ApprovalQueueWorkflowActionStatus.REJECTED]: {
    text: "Rejected",
    className: "text-rose-700",
  },
  [ApprovalQueueWorkflowActionStatus.FAILED]: {
    text: "Failed",
    className: "text-rose-700",
  },
  [ApprovalQueueWorkflowActionStatus.CANCELLED]: {
    text: "Cancelled",
    className: "text-slate-600",
  },
};

type WorkflowActionStepVisuals = {
  color: string;
  completedIcon: ReactNode;
  progressIcon: ReactNode;
};

const renderStepIcon = (Icon: LucideIcon) =>
  createElement(Icon, {
    className: "size-[60%]",
    strokeWidth: 2.5,
  });

const WORKFLOW_ACTION_STEP_VISUALS: Record<
  ApprovalQueueWorkflowActionStatus,
  WorkflowActionStepVisuals
> = {
  [ApprovalQueueWorkflowActionStatus.EXECUTED]: {
    color: "teal",
    completedIcon: renderStepIcon(Check),
    progressIcon: renderStepIcon(Check),
  },
  [ApprovalQueueWorkflowActionStatus.ESCALATED]: {
    color: "yellow",
    completedIcon: renderStepIcon(AlertTriangle),
    progressIcon: renderStepIcon(AlertTriangle),
  },
  [ApprovalQueueWorkflowActionStatus.REJECTED]: {
    color: "red",
    completedIcon: renderStepIcon(XCircle),
    progressIcon: renderStepIcon(XCircle),
  },
  [ApprovalQueueWorkflowActionStatus.FAILED]: {
    color: "red",
    completedIcon: renderStepIcon(XCircle),
    progressIcon: renderStepIcon(XCircle),
  },
  [ApprovalQueueWorkflowActionStatus.PENDING_APPROVAL]: {
    color: "blue",
    completedIcon: renderStepIcon(Clock),
    progressIcon: renderStepIcon(Clock),
  },
  [ApprovalQueueWorkflowActionStatus.APPROVED]: {
    color: "blue",
    completedIcon: renderStepIcon(Check),
    progressIcon: renderStepIcon(Loader2),
  },
  [ApprovalQueueWorkflowActionStatus.EXECUTING]: {
    color: "blue",
    completedIcon: renderStepIcon(Loader2),
    progressIcon: renderStepIcon(Loader2),
  },
  [ApprovalQueueWorkflowActionStatus.AWAITING_CUSTOMER_REPLY]: {
    color: "blue",
    completedIcon: renderStepIcon(Clock),
    progressIcon: renderStepIcon(Clock),
  },
  [ApprovalQueueWorkflowActionStatus.CANCELLED]: {
    color: "gray",
    completedIcon: renderStepIcon(CircleStop),
    progressIcon: renderStepIcon(CircleStop),
  },
};

const findLastActionIndexByStatus = (
  workflowActions: ApprovalQueueWorkflowAction[],
  statuses: ApprovalQueueWorkflowActionStatus[],
): number =>
  workflowActions.reduce(
    (lastIndex, action, index) =>
      statuses.includes(action.status) ? index : lastIndex,
    -1,
  );

export const getWorkflowStepperActiveIndex = (
  workflowActions: ApprovalQueueWorkflowAction[],
  pendingWorkflowActionIndex: number,
): number => {
  if (pendingWorkflowActionIndex >= 0) {
    return pendingWorkflowActionIndex;
  }

  const inProgressActionIndex = findLastActionIndexByStatus(
    workflowActions,
    IN_PROGRESS_ACTION_STATUSES,
  );

  if (inProgressActionIndex >= 0) {
    return inProgressActionIndex;
  }

  const terminalActionIndex = findLastActionIndexByStatus(
    workflowActions,
    TERMINAL_ACTION_STATUSES,
  );

  if (terminalActionIndex >= 0) {
    return workflowActions.length;
  }

  return workflowActions.length;
};

export const getWorkflowActionStepVisuals = (
  status: ApprovalQueueWorkflowActionStatus,
): WorkflowActionStepVisuals =>
  WORKFLOW_ACTION_STEP_VISUALS[status] ??
  WORKFLOW_ACTION_STEP_VISUALS[ApprovalQueueWorkflowActionStatus.EXECUTED];

export const getWorkflowActionStepLabel = (
  action: ApprovalQueueWorkflowAction,
  index: number,
): ReactNode => {
  const actionName = action.name || `Workflow Action ${index + 1}`;
  const statusLabel = ACTION_STATUS_LABELS[action.status];

  if (!statusLabel) {
    return actionName;
  }

  return createElement(
    "span",
    { className: "flex flex-col gap-0.5" },
    createElement("span", null, actionName),
    createElement(
      "span",
      { className: `text-xs font-semibold ${statusLabel.className}` },
      statusLabel.text,
    ),
  );
};

export const getWorkflowActionStepDescription = (
  action: ApprovalQueueWorkflowAction,
): ReactNode => action.description;
