import ACTIVITY_LOG_ENDPOINTS from "@/services/activity-log/constants";
import type { ActivityLogStreamActivityUpdatedEvent } from "@/services/activity-log/utils/activity-log-stream";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

/**
 * One `EventSource` to `/dashboard/activity-log/stream` with `withCredentials: true`.
 * Only the `activity_updated` event invalidates activity log queries; `connected` and
 * `heartbeat` are ignored. Close on unmount; browser will reconnect on drop.
 */
export function useActivityLogStreamSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) return;

    const url = `${String(baseUrl).replace(/\/$/, "")}${
      ACTIVITY_LOG_ENDPOINTS.GET_ACTIVITY_LOG_STREAM
    }`;

    const stream = new EventSource(url, { withCredentials: true });

    const onActivityUpdated = (event: MessageEvent) => {
      let payload: unknown;
      try {
        payload = JSON.parse(event.data);
      } catch {
        return;
      }
      if (
        !payload ||
        typeof payload !== "object" ||
        (payload as ActivityLogStreamActivityUpdatedEvent).type !==
          "activity_updated"
      ) {
        return;
      }

      void queryClient.invalidateQueries({ queryKey: ["activity-log"] });
    };

    stream.addEventListener("activity_updated", onActivityUpdated);

    return () => {
      stream.close();
    };
  }, [queryClient]);
}
