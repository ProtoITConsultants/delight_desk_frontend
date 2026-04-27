import { api } from "@/lib/api";
import { ApprovalQueueWorkflowActionStatus } from "@/modules/protected-routes/approval-queue/utils/constants";
import { ApprovalQueueWorkflowAction } from "@/modules/protected-routes/approval-queue/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseGetApprovalQueueItemParams {
  approvalQueueId: string;
  workflowActions: ApprovalQueueWorkflowAction[];
}

export const useGetApprovalQueueItem = ({
  approvalQueueId,
  workflowActions,
}: UseGetApprovalQueueItemParams) => {
  const queryClient = useQueryClient();
  const { mutate: approveAction, isPending: isApprovingAction } = useMutation({
    mutationFn: (actionId: string) =>
      api.approval_queue_service.approveApprovalQueueWorkflowAction(actionId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["approval-queue-item-details", approvalQueueId],
      });
      void queryClient.invalidateQueries({ queryKey: ["approval-queue-items"] });
      toast.success("Action approved successfully");
    },
    onError: () => {
      toast.error("Failed to approve action");
    },
  });

  const { mutate: rejectAction, isPending: isRejectingAction } = useMutation({
    mutationFn: (actionId: string) =>
      api.approval_queue_service.rejectApprovalQueueWorkflowAction(actionId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["approval-queue-item-details", approvalQueueId],
      });
      void queryClient.invalidateQueries({ queryKey: ["approval-queue-items"] });
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
    rejectAction,
    isRejectingAction,
    disableActionButtons: isApprovingAction || isRejectingAction,
  };
};
