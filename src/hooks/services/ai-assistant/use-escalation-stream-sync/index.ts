import {
  EscalationPriority,
  EscalationStatus,
} from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import AI_ASSISTANT_ENDPOINTS from "@/services/ai-assistant/utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function isSseCommentOrHeartbeatBlock(block: string): boolean {
  return block.split("\n").every((line) => {
    const t = line.trim();
    return t === "" || t.startsWith(":");
  });
}

/**
 * Subscribes to the escalations SSE stream (logged-in layout) and
 * revalidates escalation list + stats when a non-heartbeat event arrives.
 * Reconnects on disconnect with backoff until unmount.
 */
export function useEscalationStreamSync({
  searchQuery,
  escalationStatus,
  escalationPriority,
}: {
  searchQuery: string;
  escalationStatus: EscalationStatus | null;
  escalationPriority: EscalationPriority | null;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) return;

    const url = `${String(baseUrl).replace(/\/$/, "")}${
      AI_ASSISTANT_ENDPOINTS.GET_ESCALATION_STREAM
    }`;

    const abortController = new AbortController();
    let cancelled = false;

    const invalidateEscalationQueries = () => {
      void queryClient.invalidateQueries({
        queryKey: [
          "escalation-list",
          searchQuery,
          escalationStatus,
          escalationPriority,
        ],
      });
      void queryClient.invalidateQueries({ queryKey: ["escalation-stats"] });
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
              setTimeout(r, Math.min(errorBackoffMs, maxErrorBackoff)),
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
                invalidateEscalationQueries();
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
  }, [queryClient, searchQuery, escalationStatus, escalationPriority]);
}
