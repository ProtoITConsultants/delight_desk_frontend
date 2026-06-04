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
  ArrowLeft,
  CheckCircle2,
  Clock,
  Loader2,
  RotateCcw,
  User,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const normalizeStatus = (status: string) =>
  status === "in_progress" ? "progress" : status;

const parseFromAddress = (raw: string | null | undefined) => {
  if (!raw) return { name: null as string | null, email: null as string | null };
  const match = raw.match(/^\s*"?([^"<]+?)"?\s*<([^>]+)>\s*$/);
  if (match) return { name: match[1].trim(), email: match[2].trim() };
  return { name: null, email: raw.trim() };
};

const EmailPreviewHeader = () => {
  const { selectedEscalationDetails, setSelectedEscalationForPreview } =
    useAiAssistant();
  const { isPending, updateEscalationStatus } = useUpdateEscalationStatus();
  const router = useRouter();
  const searchParams = useSearchParams();

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

  // Mobile-only back affordance. We clear both the local selection AND the
  // deep-link query param so the user can't bounce right back to the same
  // detail on the next render (the provider re-syncs from the URL).
  const onBackToInbox = () => {
    setSelectedEscalationForPreview(null);
    if (searchParams.has("escalationId") || searchParams.has("email")) {
      router.replace("/ai-assistant", { scroll: false });
    }
  };

  return (
    <div className="sticky top-0 z-10 border-b bg-background/95 px-5 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Back-to-inbox is the user's primary navigation handle on small
          screens. We use a solid charcoal fill (bg-foreground / text-
          background via design tokens) because:
            • the inverse contrast pops on the white card without competing
              with brand-blue primary CTAs like "Send response",
            • the rectangular shape + drop shadow reads as a structural
              button rather than a tag/chip,
            • the arrow slides left on hover for a "swipe-back" affordance. */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onBackToInbox}
        aria-label="Back to inbox"
        className="group mb-3 h-9 gap-2 rounded-md bg-foreground px-3.5 text-sm font-semibold text-background shadow-sm transition-all hover:bg-foreground/90 hover:text-background hover:shadow active:bg-foreground/85 lg:hidden"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to inbox
      </Button>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          {/* Subject is the single highest-context line in the entire panel,
              so it never truncates. `break-words` keeps URL-like tokens from
              overflowing the panel; the action buttons sit at `lg:items-start`
              so they keep their top-right anchor as the subject grows. */}
          <h2 className="text-lg font-semibold capitalize text-foreground break-words">
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
