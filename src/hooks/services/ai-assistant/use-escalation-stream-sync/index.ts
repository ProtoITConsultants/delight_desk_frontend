import type { AiAssistantStreamEscalationsUpdatedEvent } from "@/services/ai-assistant/utils/escalation-stream";
import AI_ASSISTANT_ENDPOINTS from "@/services/ai-assistant/utils/constants";
import { NAV_BADGE_COUNTS_QUERY_KEY } from "@/hooks/services/dashboard/use-nav-badge-counts";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

/**
 * One `EventSource` to `/escalations/stream` with `withCredentials: true`.
 * Only the named SSE event `escalations_updated` invalidates the escalation list + stats
 * (not `connected` or `heartbeat`). Browser will reconnect; close on unmount.
 *
 * Invalidates with prefix match so any active escalation-list/escalation-stats query
 * (regardless of filters) gets refetched. Queries that aren't observed by any
 * mounted component are simply marked stale and refetch lazily — no extra
 * HTTP requests are made on pages that don't render this data.
 */
export function useEscalationStreamSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) return;

    const url = `${String(baseUrl).replace(/\/$/, "")}${
      AI_ASSISTANT_ENDPOINTS.GET_ESCALATION_STREAM
    }`;

    const stream = new EventSource(url, { withCredentials: true });

    const onEscalationsUpdated = (event: MessageEvent) => {
      let payload: unknown;
      try {
        payload = JSON.parse(event.data);
      } catch {
        return;
      }
      if (
        !payload ||
        typeof payload !== "object" ||
        (payload as AiAssistantStreamEscalationsUpdatedEvent).type !==
          "escalations_updated"
      ) {
        return;
      }

      void queryClient.invalidateQueries({ queryKey: ["escalation-list"] });
      void queryClient.invalidateQueries({ queryKey: ["escalation-stats"] });
      void queryClient.invalidateQueries({
        queryKey: [...NAV_BADGE_COUNTS_QUERY_KEY],
      });
    };

    stream.addEventListener("escalations_updated", onEscalationsUpdated);

    return () => {
      stream.close();
    };
  }, [queryClient]);
}
