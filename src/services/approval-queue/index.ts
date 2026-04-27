import { apiService } from "@/lib/api-service";
import {
  ApprovalQueueItemData,
  ApprovalQueueStats,
} from "@/modules/protected-routes/approval-queue/utils/types";
import { APPROVAL_QUEUE_ENDPOINTS } from "./constants";
import {
  EDIT_AND_APPROVE_WORKFLOW_ACTION_PARAMS,
  GET_APPROVAL_QUEUE_ITEM_BY_ID_PARAMS,
  GET_APPROVAL_QUEUE_ITEMS_PARAMS,
  GET_APPROVAL_QUEUE_ITEMS_RESPONSE,
} from "./types";
import {
  GetWorkflowProgressParams,
  GetWorkflowProgressResponse,
} from "./utils/workflow-progress";

export class ApprovalQueueService {
  // Get Approval Queue Statistics
  getApprovalQueueStatistics = async () => {
    const response = await apiService.get<ApprovalQueueStats>(
      APPROVAL_QUEUE_ENDPOINTS.GET_APPROVAL_QUEUE_STATS,
    );

    return response;
  };
  // Get Approval Queue Items
  getApprovalQueueItems = async (params: GET_APPROVAL_QUEUE_ITEMS_PARAMS) => {
    const response = await apiService.get<GET_APPROVAL_QUEUE_ITEMS_RESPONSE>(
      APPROVAL_QUEUE_ENDPOINTS.GET_APPROVAL_QUEUE_ITEMS,
      {
        params,
      },
    );

    return response;
  };

  /** GET /approval-queue/workflows — workflow list with optional category/status filters. */
  getWorkflowProgress = async (params: GetWorkflowProgressParams) => {
    const response = await apiService.get<GetWorkflowProgressResponse>(
      APPROVAL_QUEUE_ENDPOINTS.GET_APPROVAL_QUEUE_WORKFLOWS,
      { params },
    );
    return response;
  };
  // Get Approval Queue Item by ID
  getApprovalQueueItemById = async ({
    id,
  }: GET_APPROVAL_QUEUE_ITEM_BY_ID_PARAMS) => {
    const response = await apiService.get<ApprovalQueueItemData>(
      APPROVAL_QUEUE_ENDPOINTS.GET_APPROVAL_QUEUE_ITEM_BY_ID({
        itemId: id,
      }),
    );

    return response;
  };
  // Cancel Approval Queue Workflow by Id
  cancelApprovalQueueWorkflowById = async (id: string) => {
    const response = await apiService.post(
      APPROVAL_QUEUE_ENDPOINTS.CANCEL_APPROVAL_QUEUE_ITEM_WORKFLOW,
      {
        workflowId: id,
      },
    );

    return response;
  };
  // Approve Approval Queue Workflow action
  approveApprovalQueueWorkflowAction = async (actionId: string) => {
    const response = await apiService.post(
      APPROVAL_QUEUE_ENDPOINTS.APPROVE_APPROVAL_QUEUE_ACTION({
        actionId,
      }),
    );

    return response;
  };
  // Edit and Approve Approval Queue Workflow Action
  editAndApproveApprovalQueueWorkflowAction = async ({
    id,
    editedResponse,
  }: EDIT_AND_APPROVE_WORKFLOW_ACTION_PARAMS) => {
    const res = await apiService.post(
      APPROVAL_QUEUE_ENDPOINTS.EDIT_AND_APPROVE_APPROVAL_QUEUE_ACTION({
        actionId: id,
      }),
      { editedResponse },
    );

    return res;
  };
  // Rejects Approval Queue Workflow Action
  rejectApprovalQueueWorkflowAction = async (actionId: string) => {
    const response = await apiService.post(
      APPROVAL_QUEUE_ENDPOINTS.REJECT_APPROVAL_QUEUE_ACTION({
        actionId,
      }),
    );

    return response;
  };
}
