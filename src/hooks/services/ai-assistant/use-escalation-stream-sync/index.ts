import {
  EscalationPriority,
  EscalationStatus,
} from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import type { AiAssistantStreamEscalationsUpdatedEvent } from "@/services/ai-assistant/utils/escalation-stream";
import AI_ASSISTANT_ENDPOINTS from "@/services/ai-assistant/utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

/**
 * One EventSource to `/escalations/stream` with `withCredentials: true`.
 * Only the named SSE event `escalations_updated` invalidates the escalation list + stats
 * (not `connected` or `heartbeat`). Browser will reconnect; close on unmount.
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
  const searchQueryRef = useRef(searchQuery);
  const escalationStatusRef = useRef(escalationStatus);
  const escalationPriorityRef = useRef(escalationPriority);
  searchQueryRef.current = searchQuery;
  escalationStatusRef.current = escalationStatus;
  escalationPriorityRef.current = escalationPriority;

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

      void queryClient.invalidateQueries({
        queryKey: [
          "escalation-list",
          searchQueryRef.current,
          escalationStatusRef.current,
          escalationPriorityRef.current,
        ],
      });
      void queryClient.invalidateQueries({ queryKey: ["escalation-stats"] });
    };

    stream.addEventListener("escalations_updated", onEscalationsUpdated);

    return () => {
      stream.close();
    };
  }, [queryClient]);
}
