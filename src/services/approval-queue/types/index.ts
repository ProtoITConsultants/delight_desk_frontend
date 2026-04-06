import {
  ApprovalQueueAgentCategory,
  ApprovalQueueItemStatus,
  ApprovalQueuePriority,
} from "@/modules/protected-routes/approval-queue/utils/constants";
import { ApprovalQueueItemData } from "@/modules/protected-routes/approval-queue/utils/types";

export type GET_APPROVAL_QUEUE_ITEMS_PARAMS = {
  page: number;
  limit: number;
  status?: ApprovalQueueItemStatus;
  category?: ApprovalQueueAgentCategory;
  priority?: ApprovalQueuePriority;
};

export type GET_APPROVAL_QUEUE_ITEMS_RESPONSE = {
  data: ApprovalQueueItemData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type GET_APPROVAL_QUEUE_ITEM_BY_ID_PARAMS = {
  id: string;
};

export type EDIT_AND_APPROVE_WORKFLOW_ACTION_PARAMS = {
  id: string;
  editedResponse: string;
};
