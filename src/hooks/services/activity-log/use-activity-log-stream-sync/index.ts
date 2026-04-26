import ACTIVITY_LOG_ENDPOINTS from "@/services/activity-log/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function isSseCommentOrHeartbeatBlock(block: string): boolean {
  return block.split("\n").every((line) => {
    const t = line.trim();
    return t === "" || t.startsWith(":");
  });
}

/**
 * Subscribes to the activity log SSE while mounted; on each non-heartbeat
 * event, invalidates the `activity-log` infinite query. Reconnects on
 * disconnect with backoff until unmount.
 */
export function useActivityLogStreamSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) return;

    const url = `${String(baseUrl).replace(/\/$/, "")}${
      ACTIVITY_LOG_ENDPOINTS.GET_ACTIVITY_LOG_STREAM
    }`;

    const abortController = new AbortController();
    let cancelled = false;

    const invalidateActivityLog = () => {
      void queryClient.invalidateQueries({ queryKey: ["activity-log"] });
    };

    (async function streamLoop() {
      let errorBackoffMs = 1000;
      const maxErrorBackoff = 30_000;

      while (!cancelled) {
        try {
          const response = await fetch(url, {
            credentials: "include",
            signal: abortController.signal,
            headers: { Accept: "text/event-stream" },
          });

          if (!response.ok) {
            await new Promise((r) =>
              setTimeout(
                r,
                Math.min(errorBackoffMs, maxErrorBackoff),
              ),
            );
            errorBackoffMs = Math.min(errorBackoffMs * 2, maxErrorBackoff);
            continue;
          }

          errorBackoffMs = 1000;
          if (!response.body) {
            await new Promise((r) => setTimeout(r, 5000));
            continue;
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";

          while (!cancelled) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const parts = buffer.split("\n\n");
            buffer = parts.pop() ?? "";
            for (const part of parts) {
              if (part && !isSseCommentOrHeartbeatBlock(part)) {
                invalidateActivityLog();
              }
            }
          }
          if (cancelled) break;
          await new Promise((r) => setTimeout(r, 1000));
        } catch (e) {
          if (cancelled) return;
          if (e instanceof Error && e.name === "AbortError") return;
          await new Promise((r) =>
            setTimeout(r, Math.min(errorBackoffMs, maxErrorBackoff)),
          );
          errorBackoffMs = Math.min(errorBackoffMs * 2, maxErrorBackoff);
        }
      }
    })();

    return () => {
      cancelled = true;
      abortController.abort();
    };
  }, [queryClient]);
}
