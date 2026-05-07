import {
  ApprovalQueueItemStatus,
  ApprovalQueueAgentCategory,
} from "@/modules/protected-routes/approval-queue/utils/constants";
import { GET_APPROVAL_QUEUE_ITEMS_RESPONSE } from "@/services/approval-queue/types";

export interface ApprovalQueueContextType {
  selectedItemStatus: ApprovalQueueItemStatus | null;
  setSelectedItemStatus: React.Dispatch<
    React.SetStateAction<ApprovalQueueItemStatus | null>
  >;
  activeAgentCategory: ApprovalQueueAgentCategory;
  setActiveAgentCategory: React.Dispatch<
    React.SetStateAction<ApprovalQueueAgentCategory>
  >;
  approvalQueueItems: GET_APPROVAL_QUEUE_ITEMS_RESPONSE["data"];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  refetch: () => Promise<unknown>;
  isRefetching: boolean;
}
