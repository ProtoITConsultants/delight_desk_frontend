import {
  ApprovalQueueAgentCategory,
  ApprovalQueueItemStatus,
} from "@/modules/protected-routes/approval-queue/utils/constants";
import { APPROVAL_QUEUE_ENDPOINTS } from "@/services/approval-queue/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

function isSseCommentOrHeartbeatBlock(block: string): boolean {
  return block.split("\n").every((line) => {
    const t = line.trim();
    return t === "" || t.startsWith(":");
  });
}

type Params = {
  selectedItemStatus: ApprovalQueueItemStatus;
  activeAgentCategory: ApprovalQueueAgentCategory;
};

/**
 * Subscribes to the approval queue SSE while the provider is mounted; on each
 * real event, invalidates the active infinite query for the current filters
 * (latest status + category via refs so the stream is not tied to filter changes).
 */
export function useApprovalQueueStreamSync({
  selectedItemStatus,
  activeAgentCategory,
}: Params) {
  const queryClient = useQueryClient();
  const statusRef = useRef(selectedItemStatus);
  const categoryRef = useRef(activeAgentCategory);
  statusRef.current = selectedItemStatus;
  categoryRef.current = activeAgentCategory;

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) return;

    const url = `${String(baseUrl).replace(/\/$/, "")}${
      APPROVAL_QUEUE_ENDPOINTS.GET_APPROVAL_QUEUE_STREAM
    }`;

    const abortController = new AbortController();
    let cancelled = false;

    const invalidateActiveQuery = () => {
      void queryClient.invalidateQueries({
        queryKey: [
          "approval-queue-items",
          statusRef.current,
          categoryRef.current,
        ],
      });
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
                invalidateActiveQuery();
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
