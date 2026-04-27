import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { WorkflowProgressItem } from "@/services/approval-queue/utils/workflow-progress";

export type AgentWorkflowProgressCategory =
  | "order_cancellation"
  | "address_change";

const PAGE = 1;
const LIMIT = 100;

const splitByStatus = (items: WorkflowProgressItem[]) => {
  const active: WorkflowProgressItem[] = [];
  const completed: WorkflowProgressItem[] = [];
  for (const item of items) {
    if (item.status === "completed") {
      completed.push(item);
    } else {
      active.push(item);
    }
  }
  return { activeItems: active, completedItems: completed };
};

export const APPROVAL_QUEUE_WORKFLOWS_QUERY_PREFIX = [
  "approval-queue",
  "workflows",
] as const;

const workflowListQueryKey = (category: AgentWorkflowProgressCategory) =>
  [...APPROVAL_QUEUE_WORKFLOWS_QUERY_PREFIX, category] as const;

/**
 * Single fetch (no `status` param) with `limit: 100`. Client-splits
 * `completed` vs active (all other workflow statuses, including `cancelled`).
 */
export const useAgentWorkflowProgress = (
  category: AgentWorkflowProgressCategory,
) => {
  const baseKey = workflowListQueryKey(category);

  const { data, isPending, isRefetching, refetch } = useQuery({
    queryKey: [...baseKey, { page: PAGE, limit: LIMIT, noStatus: true }],
    queryFn: () =>
      api.approval_queue_service.getWorkflowProgress({
        category,
        page: PAGE,
        limit: LIMIT,
      }),
  });

  const items = data?.data ?? [];
  const { activeItems, completedItems } = useMemo(
    () => splitByStatus(items),
    [items],
  );

  return {
    activeItems,
    completedItems,
    isLoading: isPending,
    isRefetching,
    refetch: () => refetch().then(() => undefined),
  };
};

export const useOrderCancellationWorkflowProgress = () =>
  useAgentWorkflowProgress("order_cancellation");

export const useAddressChangeWorkflowProgress = () =>
  useAgentWorkflowProgress("address_change");
