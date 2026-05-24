import { ApprovalQueueWorkflowActionStatus } from "@/modules/protected-routes/approval-queue/utils/constants";
import { ApprovalQueueWorkflowAction } from "@/modules/protected-routes/approval-queue/utils/types";
import {
  ACTION_STATUS_COLOR_FAMILY,
  STATUS_COLOR_PALETTE,
} from "../../utils";
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

// Text colors for the secondary status label rendered under an action's
// name. We derive each entry from the canonical palette so a "Cancelled"
// step's label uses the same rose hue as the Cancelled stats tile, the
// Cancelled filter dot, and the Cancelled workflow card pill.
const labelClassFor = (status: ApprovalQueueWorkflowActionStatus): string =>
  STATUS_COLOR_PALETTE[ACTION_STATUS_COLOR_FAMILY[status]].labelText;

const ACTION_STATUS_LABELS: Partial<
  Record<ApprovalQueueWorkflowActionStatus, { text: string; className: string }>
> = {
  [ApprovalQueueWorkflowActionStatus.ESCALATED]: {
    text: "Escalated",
    className: labelClassFor(ApprovalQueueWorkflowActionStatus.ESCALATED),
  },
  [ApprovalQueueWorkflowActionStatus.REJECTED]: {
    text: "Rejected",
    className: labelClassFor(ApprovalQueueWorkflowActionStatus.REJECTED),
  },
  [ApprovalQueueWorkflowActionStatus.FAILED]: {
    // Backend says `failed`; user-facing copy says "Couldn't complete".
    // The hue (rose) is unchanged so the visual signal still reads as a
    // negative terminal state — we're just removing the implication that
    // the agent itself is broken. Same wording as the activity log badge.
    text: "Couldn't complete",
    className: labelClassFor(ApprovalQueueWorkflowActionStatus.FAILED),
  },
  [ApprovalQueueWorkflowActionStatus.CANCELLED]: {
    text: "Cancelled",
    className: labelClassFor(ApprovalQueueWorkflowActionStatus.CANCELLED),
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

// Glyph used per action status. The color is derived from the canonical
// palette below so we only define the icon here.
const ACTION_STATUS_ICONS: Record<ApprovalQueueWorkflowActionStatus, LucideIcon> = {
  [ApprovalQueueWorkflowActionStatus.EXECUTED]: Check,
  [ApprovalQueueWorkflowActionStatus.ESCALATED]: AlertTriangle,
  [ApprovalQueueWorkflowActionStatus.REJECTED]: XCircle,
  [ApprovalQueueWorkflowActionStatus.FAILED]: XCircle,
  [ApprovalQueueWorkflowActionStatus.PENDING_APPROVAL]: Clock,
  [ApprovalQueueWorkflowActionStatus.APPROVED]: Check,
  [ApprovalQueueWorkflowActionStatus.EXECUTING]: Loader2,
  [ApprovalQueueWorkflowActionStatus.AWAITING_CUSTOMER_REPLY]: Clock,
  [ApprovalQueueWorkflowActionStatus.CANCELLED]: CircleStop,
};

// A subset of statuses animate the "in progress" indicator with the
// `Loader2` spinner; the rest reuse their completed glyph.
const SPINNER_PROGRESS_STATUSES = new Set<ApprovalQueueWorkflowActionStatus>([
  ApprovalQueueWorkflowActionStatus.APPROVED,
  ApprovalQueueWorkflowActionStatus.EXECUTING,
]);

const buildStepVisuals = (
  status: ApprovalQueueWorkflowActionStatus,
): WorkflowActionStepVisuals => {
  const Icon = ACTION_STATUS_ICONS[status];
  return {
    // Mantine name pulled from the canonical palette. The Mantine
    // `<Stepper />` colors each step's circle by name, so this is how the
    // step inside a card ends up in the same hue family as the matching
    // status tile/filter/pill elsewhere on the page.
    color: STATUS_COLOR_PALETTE[ACTION_STATUS_COLOR_FAMILY[status]].mantine,
    completedIcon: renderStepIcon(Icon),
    progressIcon: SPINNER_PROGRESS_STATUSES.has(status)
      ? renderStepIcon(Loader2)
      : renderStepIcon(Icon),
  };
};

const WORKFLOW_ACTION_STEP_VISUALS: Record<
  ApprovalQueueWorkflowActionStatus,
  WorkflowActionStepVisuals
> = {
  [ApprovalQueueWorkflowActionStatus.EXECUTED]: buildStepVisuals(
    ApprovalQueueWorkflowActionStatus.EXECUTED,
  ),
  [ApprovalQueueWorkflowActionStatus.ESCALATED]: buildStepVisuals(
    ApprovalQueueWorkflowActionStatus.ESCALATED,
  ),
  [ApprovalQueueWorkflowActionStatus.REJECTED]: buildStepVisuals(
    ApprovalQueueWorkflowActionStatus.REJECTED,
  ),
  [ApprovalQueueWorkflowActionStatus.FAILED]: buildStepVisuals(
    ApprovalQueueWorkflowActionStatus.FAILED,
  ),
  [ApprovalQueueWorkflowActionStatus.PENDING_APPROVAL]: buildStepVisuals(
    ApprovalQueueWorkflowActionStatus.PENDING_APPROVAL,
  ),
  [ApprovalQueueWorkflowActionStatus.APPROVED]: buildStepVisuals(
    ApprovalQueueWorkflowActionStatus.APPROVED,
  ),
  [ApprovalQueueWorkflowActionStatus.EXECUTING]: buildStepVisuals(
    ApprovalQueueWorkflowActionStatus.EXECUTING,
  ),
  [ApprovalQueueWorkflowActionStatus.AWAITING_CUSTOMER_REPLY]: buildStepVisuals(
    ApprovalQueueWorkflowActionStatus.AWAITING_CUSTOMER_REPLY,
  ),
  [ApprovalQueueWorkflowActionStatus.CANCELLED]: buildStepVisuals(
    ApprovalQueueWorkflowActionStatus.CANCELLED,
  ),
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
