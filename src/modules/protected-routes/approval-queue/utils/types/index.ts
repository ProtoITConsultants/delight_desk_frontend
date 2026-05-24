import { LucideIcon } from "lucide-react";
import {
  ApprovalQueueAgentCategory,
  ApprovalQueueItemStatus,
  ApprovalQueueWorkflowActionStatus,
} from "../constants";

export type APPROVAL_QUEUE_HEADER_PROPS = {
  className?: string;
  Icon?: React.ReactNode;
  title: string;
  description: string;
  hasRightSection?: boolean;
  rightSection?: React.ReactNode;
  rightSectionClassName?: string;
};

export type ApprovalQueueStats = {
  total: number;
  pending: number;
  inProgress: number;
  /**
   * Count of items with at least one workflow action in `pending_approval`.
   * Backed by `workflowActions[].status`, not the workflow-level `status`,
   * so it overlaps with `pending` / `inProgress` rather than partitioning
   * the queue.
   */
  pendingApproval: number;
  cancelled: number;
  completed: number;
  escalated: number;
};

export interface ApprovalQueueWorkflowAction {
  id: string;
  name: string;
  description: string;
  actionDetails: string;
  status: ApprovalQueueWorkflowActionStatus;
  step: string;
  createdAt: string;
  proposedEmailBody: string | null;
  escalationId: string | null;
  escalationReason: string | null;
}

export interface ApprovalQueueItemData {
  id: string;
  workflowId: string;
  status: ApprovalQueueItemStatus;
  category: Exclude<ApprovalQueueAgentCategory, ApprovalQueueAgentCategory.ALL>;
  customerEmail: string;
  customerName: string;
  emailSubject: string;
  createdAt: string;
  originalCustomerEmailBody: string;
  workflowActions: ApprovalQueueWorkflowAction[];
}

export interface AgentMetadata {
  agentName: string;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
}
