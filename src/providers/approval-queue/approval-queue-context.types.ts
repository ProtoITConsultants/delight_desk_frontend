import {
  ApprovalQueueItemStatus,
  ApprovalQueueAgentCategory,
} from "@/modules/protected-routes/approval-queue/utils/constants";
import { GET_APPROVAL_QUEUE_ITEMS_RESPONSE } from "@/services/approval-queue/types";

export interface ApprovalQueueContextType {
  selectedItemStatus: ApprovalQueueItemStatus;
  setSelectedItemStatus: React.Dispatch<
    React.SetStateAction<ApprovalQueueItemStatus>
  >;
  activeAgentCategory: ApprovalQueueAgentCategory;
  setActiveAgentCategory: React.Dispatch<
    React.SetStateAction<ApprovalQueueAgentCategory>
  >;
  approvalQueueItems: GET_APPROVAL_QUEUE_ITEMS_RESPONSE["data"];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  refetch: () => Promise<unknown>;
  isRefetching: boolean;
}
