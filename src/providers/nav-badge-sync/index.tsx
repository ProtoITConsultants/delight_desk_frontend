"use client";

import { useApprovalQueueStreamSync } from "@/hooks/services/approval-queue/use-approval-queue-stream-sync";
import { useEscalationStreamSync } from "@/hooks/services/ai-assistant/use-escalation-stream-sync";
import { FC } from "react";

/**
 * Owns the two long-lived SSE connections (`/approval-queue/stream` and
 * `/escalations/stream`) for the whole authenticated app. Each stream's handler
 * invalidates both the page-level queries (lists/stats/workflows) and the
 * sidebar `nav-badge-counts` query, so:
 *
 * - Sidebar badges stay live on every protected route.
 * - Pages that render the corresponding lists (e.g. `/approval-queue`,
 *   `/dashboard`, `/ai-assistant`) get live list/stats updates for free.
 * - Pages that don't render those lists pay nothing extra: invalidating a
 *   query that no component observes is a no-op until something mounts that
 *   reads it.
 */
export const NavBadgeSyncProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useApprovalQueueStreamSync();
  useEscalationStreamSync();

  return <>{children}</>;
};
