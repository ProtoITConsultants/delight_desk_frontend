"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAiAssistant } from "@/providers/ai-assistant";
import { useUpdateEscalationStatus } from "@/hooks/services/ai-assistant/use-update-escalation-status";
import { EscalationStatus } from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import {
  getPriorityVariants,
  getStatusVariants,
  getPriorityIcon,
  getPriorityLabel,
  getStatusLabel,
} from "@/modules/protected-routes/ai-assistant/utils/palette";
import {
  formatAbsoluteDateTime,
  formatRelativeTime,
} from "@/modules/protected-routes/ai-assistant/utils/format-escalation-date";
import {
  CheckCircle2,
  Clock,
  Loader2,
  RotateCcw,
  User,
} from "lucide-react";

const normalizeStatus = (status: string) =>
  status === "in_progress" ? "progress" : status;

const parseFromAddress = (raw: string | null | undefined) => {
  if (!raw) return { name: null as string | null, email: null as string | null };
  const match = raw.match(/^\s*"?([^"<]+?)"?\s*<([^>]+)>\s*$/);
  if (match) return { name: match[1].trim(), email: match[2].trim() };
  return { name: null, email: raw.trim() };
};

const EmailPreviewHeader = () => {
  const { selectedEscalationDetails } = useAiAssistant();
  const { isPending, updateEscalationStatus } = useUpdateEscalationStatus();

  if (!selectedEscalationDetails) return null;

  const {
    id,
    priority,
    status,
    createdAt,
    email,
  } = selectedEscalationDetails;
  const normalizedStatus = normalizeStatus(status);
  const PriorityIcon = getPriorityIcon(priority);
  const priorityVariants = getPriorityVariants(priority);
  const statusVariants = getStatusVariants(normalizedStatus);

  const { name, email: address } = parseFromAddress(email?.fromEmail);

  const onUpdate = (next: EscalationStatus) =>
    updateEscalationStatus({
      type: "single",
      escalationIds: [id],
      status: next,
    });

  return (
    <div className="sticky top-0 z-10 border-b bg-background/95 px-5 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-semibold capitalize text-foreground">
            {email?.subject || "(No subject)"}
          </h2>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <User className="h-3 w-3" />
              {name ? (
                <>
                  <span className="font-medium text-foreground">{name}</span>
                  {address && <span>{address}</span>}
                </>
              ) : (
                <span className="font-medium text-foreground">
                  {address ?? "Unknown sender"}
                </span>
              )}
            </span>
            <span aria-hidden>·</span>
            <span
              title={formatAbsoluteDateTime(createdAt)}
              className="tabular-nums"
            >
              {formatRelativeTime(createdAt)}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <Badge
              variant="outline"
              className={cn(
                "gap-1 px-1.5 py-0 text-[10px] font-medium",
                priorityVariants.softPill,
              )}
            >
              <PriorityIcon className="h-2.5 w-2.5" />
              <span>{getPriorityLabel(priority)}</span>
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "px-1.5 py-0 text-[10px] font-medium",
                statusVariants.softPill,
              )}
            >
              {getStatusLabel(normalizedStatus)}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {isPending && (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
          )}
          {normalizedStatus === EscalationStatus.PENDING && (
            <Button
              size="sm"
              variant="outline"
              disabled={isPending}
              onClick={() => onUpdate(EscalationStatus.IN_PROGRESS)}
              className="h-8 gap-1 px-2 text-xs"
            >
              <Clock className="h-3 w-3" />
              Mark in progress
            </Button>
          )}
          {(normalizedStatus === EscalationStatus.PENDING ||
            normalizedStatus === EscalationStatus.IN_PROGRESS) && (
            <Button
              size="sm"
              disabled={isPending}
              onClick={() => onUpdate(EscalationStatus.RESOLVED)}
              className="h-8 gap-1 px-2 text-xs"
            >
              <CheckCircle2 className="h-3 w-3" />
              Resolve
            </Button>
          )}
          {normalizedStatus === EscalationStatus.RESOLVED && (
            <Button
              size="sm"
              variant="outline"
              disabled={isPending}
              onClick={() => onUpdate(EscalationStatus.PENDING)}
              className="h-8 gap-1 px-2 text-xs"
            >
              <RotateCcw className="h-3 w-3" />
              Reopen
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailPreviewHeader;
