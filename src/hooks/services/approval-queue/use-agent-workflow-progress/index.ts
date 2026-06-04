import { api } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { WorkflowProgressItem } from "@/services/approval-queue/utils/workflow-progress";

export type AgentWorkflowProgressCategory =
  | "order_cancellation"
  | "address_change";

const LIMIT = 100;

const dedupeById = (items: WorkflowProgressItem[]) => {
  const seen = new Set<string>();
  const out: WorkflowProgressItem[] = [];
  for (const it of items) {
    if (seen.has(it.id)) continue;
    seen.add(it.id);
    out.push(it);
  }
  return out;
};

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
 * Paginated fetch (no `status` param) with `limit` per page. Merges all loaded
 * pages, dedupes by id, then client-splits `completed` vs active.
 */
export const useAgentWorkflowProgress = (
  category: AgentWorkflowProgressCategory,
) => {
  const baseKey = workflowListQueryKey(category);

  const {
    data,
    isPending,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [...baseKey, { limit: LIMIT, noStatus: true }],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      api.approval_queue_service.getWorkflowProgress({
        category,
        page: pageParam,
        limit: LIMIT,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.currentPage + 1
        : undefined,
  });

  const items = useMemo(() => {
    const flat = data?.pages.flatMap((p) => p.data) ?? [];
    return dedupeById(flat);
  }, [data]);

  const { activeItems, completedItems } = useMemo(
    () => splitByStatus(items),
    [items],
  );

  const refetchAll = useCallback(
    () => refetch().then(() => undefined),
    [refetch],
  );

  return {
    activeItems,
    completedItems,
    isLoading: isPending,
    isRefetching,
    refetch: refetchAll,
    fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
  };
};

export const useOrderCancellationWorkflowProgress = () =>
  useAgentWorkflowProgress("order_cancellation");

export const useAddressChangeWorkflowProgress = () =>
  useAgentWorkflowProgress("address_change");
