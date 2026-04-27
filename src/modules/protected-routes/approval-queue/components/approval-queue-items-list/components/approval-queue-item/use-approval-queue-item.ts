import { api } from "@/lib/api";
import { APPROVAL_QUEUE_WORKFLOWS_QUERY_PREFIX } from "@/hooks/services/approval-queue/use-agent-workflow-progress";
import { ApprovalQueueWorkflowActionStatus } from "@/modules/protected-routes/approval-queue/utils/constants";
import { ApprovalQueueWorkflowAction } from "@/modules/protected-routes/approval-queue/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseGetApprovalQueueItemParams {
  approvalQueueId: string;
  workflowActions: ApprovalQueueWorkflowAction[];
}

const invalidateApprovalQueries = (
  queryClient: ReturnType<typeof useQueryClient>,
  approvalQueueId: string,
) => {
  void queryClient.invalidateQueries({
    queryKey: ["approval-queue-item-details", approvalQueueId],
  });
  void queryClient.invalidateQueries({ queryKey: ["approval-queue-items"] });
  void queryClient.invalidateQueries({
    queryKey: [...APPROVAL_QUEUE_WORKFLOWS_QUERY_PREFIX],
  });
};

export const useGetApprovalQueueItem = ({
  approvalQueueId,
  workflowActions,
}: UseGetApprovalQueueItemParams) => {
  const queryClient = useQueryClient();
  const { mutate: approveAction, isPending: isApprovingAction } = useMutation({
    mutationFn: (actionId: string) =>
      api.approval_queue_service.approveApprovalQueueWorkflowAction(actionId),
    onSuccess: () => {
      invalidateApprovalQueries(queryClient, approvalQueueId);
      toast.success("Action approved successfully");
    },
    onError: () => {
      toast.error("Failed to approve action");
    },
  });

  const { mutate: editAndApproveAction, isPending: isEditApprovingAction } =
    useMutation({
      mutationFn: (params: { actionId: string; editedResponse: string }) =>
        api.approval_queue_service.editAndApproveApprovalQueueWorkflowAction({
          id: params.actionId,
          editedResponse: params.editedResponse,
        }),
      onSuccess: () => {
        invalidateApprovalQueries(queryClient, approvalQueueId);
        toast.success("Response updated and approved");
      },
      onError: (error) => {
        toast.error("Failed to save and approve", {
          description: error instanceof Error ? error.message : undefined,
        });
      },
    });

  const { mutate: rejectAction, isPending: isRejectingAction } = useMutation({
    mutationFn: (actionId: string) =>
      api.approval_queue_service.rejectApprovalQueueWorkflowAction(actionId),
    onSuccess: () => {
      invalidateApprovalQueries(queryClient, approvalQueueId);
      toast.success("Action rejected successfully");
    },
    onError: () => {
      toast.error("Failed to reject action");
    },
  });

  const pendingWorkflowAction = workflowActions.find(
    (action) =>
      action.status === ApprovalQueueWorkflowActionStatus.PENDING_APPROVAL,
  );

  const shouldShowActionButtons = !!pendingWorkflowAction;

  const pendingWorkflowActionIndex = workflowActions.findIndex(
    (action) =>
      action.status === ApprovalQueueWorkflowActionStatus.PENDING_APPROVAL,
  );

  return {
    pendingWorkflowAction,
    shouldShowActionButtons,
    pendingWorkflowActionIndex,
    approveAction,
    isApprovingAction,
    editAndApproveAction,
    isEditApprovingAction,
    rejectAction,
    isRejectingAction,
    disableActionButtons:
      isApprovingAction || isEditApprovingAction || isRejectingAction,
  };
};
