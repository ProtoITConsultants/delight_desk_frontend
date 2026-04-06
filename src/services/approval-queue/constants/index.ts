const GET_APPROVAL_QUEUE_STATS = "/approval-queue/stats";
const GET_APPROVAL_QUEUE_ITEMS = "/approval-queue";
const GET_APPROVAL_QUEUE_ITEM_BY_ID = ({ itemId }: { itemId: string }) =>
  `/approval-queue/${encodeURIComponent(itemId)}`;
const CANCEL_APPROVAL_QUEUE_ITEM_WORKFLOW = "approval-queue/cancel";
const APPROVE_APPROVAL_QUEUE_ACTION = ({ actionId }: { actionId: string }) =>
  `/approval-queue/actions/${encodeURIComponent(actionId)}/approve`;
const REJECT_APPROVAL_QUEUE_ACTION = ({ actionId }: { actionId: string }) =>
  `/approval-queue/actions/${encodeURIComponent(actionId)}/reject`;
const EDIT_AND_APPROVE_APPROVAL_QUEUE_ACTION = ({
  actionId,
}: {
  actionId: string;
}) =>
  `/approval-queue/actions/${encodeURIComponent(actionId)}/edit-and-approve`;

export const APPROVAL_QUEUE_ENDPOINTS = {
  GET_APPROVAL_QUEUE_STATS,
  GET_APPROVAL_QUEUE_ITEMS,
  GET_APPROVAL_QUEUE_ITEM_BY_ID,
  CANCEL_APPROVAL_QUEUE_ITEM_WORKFLOW,
  APPROVE_APPROVAL_QUEUE_ACTION,
  REJECT_APPROVAL_QUEUE_ACTION,
  EDIT_AND_APPROVE_APPROVAL_QUEUE_ACTION,
};
