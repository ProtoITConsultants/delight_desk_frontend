import type { ApprovalQueueStreamQueueUpdatedEvent } from "@/services/approval-queue/utils/approval-queue-stream";
import { APPROVAL_QUEUE_ENDPOINTS } from "@/services/approval-queue/constants";
import { NAV_BADGE_COUNTS_QUERY_KEY } from "@/hooks/services/dashboard/use-nav-badge-counts";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { APPROVAL_QUEUE_WORKFLOWS_QUERY_PREFIX } from "../use-agent-workflow-progress";
import { APPROVAL_QUEUE_STATS_QUERY_KEY } from "../use-approval-queue-stats";

/**
 * One `EventSource` to `/approval-queue/stream` with `withCredentials: true`.
 * Only the `queue_updated` event refetches data (main list: GET /approval-queue).
 * `connected` and `heartbeat` are not handled. Close on unmount.
 */
export function useApprovalQueueStreamSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) return;

    const url = `${String(baseUrl).replace(/\/$/, "")}${
      APPROVAL_QUEUE_ENDPOINTS.GET_APPROVAL_QUEUE_STREAM
    }`;

    const stream = new EventSource(url, { withCredentials: true });

    const onQueueUpdated = (event: MessageEvent) => {
      let payload: unknown;
      try {
        payload = JSON.parse(event.data);
      } catch {
        return;
      }
      if (
        !payload ||
        typeof payload !== "object" ||
        (payload as ApprovalQueueStreamQueueUpdatedEvent).type !== "queue_updated"
      ) {
        return;
      }

      void queryClient.invalidateQueries({ queryKey: ["approval-queue-items"] });
      void queryClient.invalidateQueries({
        queryKey: [...APPROVAL_QUEUE_WORKFLOWS_QUERY_PREFIX],
      });
      void queryClient.invalidateQueries({
        queryKey: [...APPROVAL_QUEUE_STATS_QUERY_KEY],
      });
      void queryClient.invalidateQueries({
        queryKey: [...NAV_BADGE_COUNTS_QUERY_KEY],
      });
    };

    stream.addEventListener("queue_updated", onQueueUpdated);

    return () => {
      stream.close();
    };
  }, [queryClient]);
}
