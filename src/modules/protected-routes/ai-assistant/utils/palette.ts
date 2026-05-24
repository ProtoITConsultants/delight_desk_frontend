import {
  EscalationPriority,
  EscalationStatus,
} from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import {
  STATUS_COLOR_PALETTE,
  StatusColorFamily,
  StatusColorVariants,
} from "@/lib/status-palette";
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Clock,
  Flame,
  Inbox,
  LucideIcon,
  Minus,
} from "lucide-react";

/* Escalation status -> hue family. Pending is the "hero" orange tone so the
 * stats tile that surfaces unhandled work always reads as the page's one
 * loud color. The remaining statuses fall into calm families. */
export const ESCALATION_STATUS_COLOR_FAMILY: Record<
  EscalationStatus.PENDING | EscalationStatus.IN_PROGRESS | EscalationStatus.RESOLVED,
  StatusColorFamily
> = {
  [EscalationStatus.PENDING]: "orange",
  [EscalationStatus.IN_PROGRESS]: "sky",
  [EscalationStatus.RESOLVED]: "emerald",
};

export const ESCALATION_STATUS_LABEL: Record<
  EscalationStatus.PENDING | EscalationStatus.IN_PROGRESS | EscalationStatus.RESOLVED,
  string
> = {
  [EscalationStatus.PENDING]: "Pending",
  [EscalationStatus.IN_PROGRESS]: "In Progress",
  [EscalationStatus.RESOLVED]: "Resolved",
};

export const ESCALATION_STATUS_ICON: Record<
  EscalationStatus.PENDING | EscalationStatus.IN_PROGRESS | EscalationStatus.RESOLVED,
  LucideIcon
> = {
  [EscalationStatus.PENDING]: Clock,
  [EscalationStatus.IN_PROGRESS]: AlertCircle,
  [EscalationStatus.RESOLVED]: CheckCircle2,
};

/* Priority -> hue family. Urgent uses rose (saturated red) so it pops the
 * loudest, high uses amber, medium violet, low slate. */
export const ESCALATION_PRIORITY_COLOR_FAMILY: Record<
  | EscalationPriority.URGENT
  | EscalationPriority.HIGH
  | EscalationPriority.MEDIUM
  | EscalationPriority.LOW,
  StatusColorFamily
> = {
  [EscalationPriority.URGENT]: "rose",
  [EscalationPriority.HIGH]: "amber",
  [EscalationPriority.MEDIUM]: "violet",
  [EscalationPriority.LOW]: "slate",
};

export const ESCALATION_PRIORITY_LABEL: Record<
  | EscalationPriority.URGENT
  | EscalationPriority.HIGH
  | EscalationPriority.MEDIUM
  | EscalationPriority.LOW,
  string
> = {
  [EscalationPriority.URGENT]: "Urgent",
  [EscalationPriority.HIGH]: "High",
  [EscalationPriority.MEDIUM]: "Medium",
  [EscalationPriority.LOW]: "Low",
};

export const ESCALATION_PRIORITY_ICON: Record<
  | EscalationPriority.URGENT
  | EscalationPriority.HIGH
  | EscalationPriority.MEDIUM
  | EscalationPriority.LOW,
  LucideIcon
> = {
  [EscalationPriority.URGENT]: Flame,
  [EscalationPriority.HIGH]: ArrowUp,
  [EscalationPriority.MEDIUM]: Minus,
  [EscalationPriority.LOW]: ArrowDown,
};

const FALLBACK_VARIANTS: StatusColorVariants = STATUS_COLOR_PALETTE.slate;

export const getStatusVariants = (
  status: string | null | undefined,
): StatusColorVariants => {
  if (!status) return FALLBACK_VARIANTS;
  const family =
    ESCALATION_STATUS_COLOR_FAMILY[
      status as keyof typeof ESCALATION_STATUS_COLOR_FAMILY
    ];
  return family ? STATUS_COLOR_PALETTE[family] : FALLBACK_VARIANTS;
};

export const getPriorityVariants = (
  priority: string | null | undefined,
): StatusColorVariants => {
  if (!priority) return FALLBACK_VARIANTS;
  const family =
    ESCALATION_PRIORITY_COLOR_FAMILY[
      priority as keyof typeof ESCALATION_PRIORITY_COLOR_FAMILY
    ];
  return family ? STATUS_COLOR_PALETTE[family] : FALLBACK_VARIANTS;
};

export const getPriorityIcon = (
  priority: string | null | undefined,
): LucideIcon => {
  if (!priority) return AlertTriangle;
  return (
    ESCALATION_PRIORITY_ICON[
      priority as keyof typeof ESCALATION_PRIORITY_ICON
    ] ?? AlertTriangle
  );
};

export const getStatusIcon = (
  status: string | null | undefined,
): LucideIcon => {
  if (!status) return Inbox;
  return (
    ESCALATION_STATUS_ICON[
      status as keyof typeof ESCALATION_STATUS_ICON
    ] ?? Inbox
  );
};

export const getStatusLabel = (status: string | null | undefined): string => {
  if (!status) return "Unknown";
  return (
    ESCALATION_STATUS_LABEL[
      status as keyof typeof ESCALATION_STATUS_LABEL
    ] ?? status
  );
};

export const getPriorityLabel = (
  priority: string | null | undefined,
): string => {
  if (!priority) return "Unknown";
  return (
    ESCALATION_PRIORITY_LABEL[
      priority as keyof typeof ESCALATION_PRIORITY_LABEL
    ] ?? priority
  );
};
