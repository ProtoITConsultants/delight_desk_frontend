import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

/**
 * Query key used for the approval queue stats endpoint. Exported so mutations
 * and the SSE stream sync can invalidate it alongside the items list and the
 * workflow progress queries.
 */
export const APPROVAL_QUEUE_STATS_QUERY_KEY = ["approval-queue-stats"] as const;

/**
 * Fetches /approval-queue/stats. The endpoint returns counts split across
 * workflow statuses plus an action-level `pendingApproval` count. The stats
 * surface in the page header strip and double as quick filters.
 *
 * We deliberately keep this query separate from the items list query so:
 *  - the stats stay accurate even while the list is filtered to a subset
 *  - the items list keeps its `keepPreviousData` swap without flashing the
 *    stats during filter changes
 */
export const useApprovalQueueStats = () => {
  return useQuery({
    queryKey: APPROVAL_QUEUE_STATS_QUERY_KEY,
    queryFn: () => api.approval_queue_service.getApprovalQueueStatistics(),
    // Stats are derived data — a brief staleness window prevents a refetch
    // storm when a mutation invalidates both stats and the items list in
    // quick succession.
    staleTime: 5_000,
  });
};
