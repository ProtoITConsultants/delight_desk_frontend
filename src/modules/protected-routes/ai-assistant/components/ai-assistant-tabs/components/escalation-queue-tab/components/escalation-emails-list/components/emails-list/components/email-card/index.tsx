"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EscalationType } from "@/modules/protected-routes/ai-assistant/types/ai-assistant-header";
import { useAiAssistant } from "@/providers/ai-assistant";
import {
  getPriorityVariants,
  getStatusVariants,
  getPriorityIcon,
  getPriorityLabel,
  getStatusLabel,
} from "@/modules/protected-routes/ai-assistant/utils/palette";
import { formatRelativeTime } from "@/modules/protected-routes/ai-assistant/utils/format-escalation-date";
import { Sparkles } from "lucide-react";

const normalizeStatus = (status: string) =>
  status === "in_progress" ? "progress" : status;

const getConfidenceTone = (confidence: number) => {
  if (confidence >= 80) return "text-emerald-600";
  if (confidence >= 60) return "text-amber-600";
  return "text-rose-600";
};

const EscalationEmailCard = (escalation: EscalationType) => {
  const {
    id,
    priority,
    status,
    createdAt,
    reason,
    email,
    aiSuggestedResponseConfidence,
  } = escalation;

  const {
    selectedEmailsForBulkAction,
    setSelectedEmailsForBulkAction,
    selectedEscalationForPreview,
    setSelectedEscalationForPreview,
  } = useAiAssistant();

  const isPreviewed = selectedEscalationForPreview === id;
  const isSelected = selectedEmailsForBulkAction.has(id);

  const priorityVariants = getPriorityVariants(priority);
  const statusVariants = getStatusVariants(normalizeStatus(status));
  const PriorityIcon = getPriorityIcon(priority);

  // Customer "name" — backend ships fromEmail like `"Super StrikeR"
  // <super@gmail.com>`. Pull the quoted display name out so we can lead
  // with a friendly label, falling back to the bare address.
  const { displayName, addressEmail } = parseFromAddress(email?.fromEmail);

  const toggleSelected = (next: boolean) => {
    setSelectedEmailsForBulkAction((prev) => {
      const set = new Set(prev);
      if (next) {
        set.add(id);
      } else {
        set.delete(id);
      }
      return set;
    });
  };

  const confidence = Math.round(aiSuggestedResponseConfidence ?? 0);
  const hasConfidence = confidence > 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setSelectedEscalationForPreview(id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setSelectedEscalationForPreview(id);
        }
      }}
      className={cn(
        "group relative flex cursor-pointer items-stretch gap-3 border-b border-border/60 px-3 py-3 transition-colors last:border-b-0",
        "hover:bg-muted/40",
        isPreviewed && "bg-primary/5 hover:bg-primary/10",
        isSelected && "bg-primary/[0.03]",
      )}
    >
      {/* Priority accent bar — scan the list by hue alone. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-2 left-0 w-0.5 rounded-r-full",
          priorityVariants.accentBar,
        )}
      />

      {/* Checkbox slot — quiet until you hover, full-strength once one row
          is checked (the user is now in "bulk mode"). */}
      <div
        className={cn(
          "flex items-start pt-0.5 transition-opacity",
          isSelected
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => toggleSelected(Boolean(checked))}
          aria-label="Select escalation for bulk action"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <p className="min-w-0 flex-1 truncate text-sm font-medium text-foreground capitalize">
            {email?.subject || "(No subject)"}
          </p>
          <span className="shrink-0 text-[11px] text-muted-foreground tabular-nums">
            {formatRelativeTime(createdAt)}
          </span>
        </div>

        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">
            {displayName ?? addressEmail ?? "Unknown sender"}
          </span>
          {displayName && addressEmail && (
            <span className="ml-1 text-muted-foreground">{addressEmail}</span>
          )}
        </p>

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
            {getStatusLabel(normalizeStatus(status))}
          </Badge>
          {hasConfidence && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[10px] font-medium tabular-nums",
                getConfidenceTone(confidence),
              )}
              title={`AI confidence ${confidence}%`}
            >
              <Sparkles className="h-2.5 w-2.5" />
              AI {confidence}%
            </span>
          )}
        </div>

        {reason && (
          <p className="mt-1.5 line-clamp-1 text-[11px] italic text-muted-foreground">
            {reason}
          </p>
        )}
      </div>
    </div>
  );
};

export default EscalationEmailCard;

/* ----------------------- Helpers ----------------------- */

/**
 * Splits `"Super StrikeR" <super@example.com>` into its display name and
 * email parts. Falls back gracefully when the input is just an address.
 */
const parseFromAddress = (
  raw: string | null | undefined,
): { displayName: string | null; addressEmail: string | null } => {
  if (!raw) return { displayName: null, addressEmail: null };
  const match = raw.match(/^\s*"?([^"<]+?)"?\s*<([^>]+)>\s*$/);
  if (match) {
    return {
      displayName: match[1].trim() || null,
      addressEmail: match[2].trim() || null,
    };
  }
  return { displayName: null, addressEmail: raw.trim() };
};
