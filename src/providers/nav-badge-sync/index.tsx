"use client";

import { useApprovalQueueStreamSync } from "@/hooks/services/approval-queue/use-approval-queue-stream-sync";
import { FC } from "react";

/**
 * Keeps sidebar nav badge counts fresh by listening to approval-queue SSE
 * from the protected layout, not only while the approval-queue page is open.
 */
export const NavBadgeSyncProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useApprovalQueueStreamSync();

  return <>{children}</>;
};
