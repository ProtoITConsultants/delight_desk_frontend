"use client";
import { AI_ASSISTANT_ICON } from "@/constants/product-icons";
import { useAiAssistant } from "@/providers/ai-assistant";
import { Radio } from "lucide-react";

const AiAssistantHeader = () => {
  const { escalationStats, isStatsPending } = useAiAssistant();

  // Live indicator copy: "Live · N escalations". When stats haven't arrived
  // yet the count is muted so the dot still telegraphs "we're connected".
  const totalLabel = isStatsPending
    ? "Connecting"
    : `${escalationStats?.total ?? 0} escalations`;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-foreground">
          <AI_ASSISTANT_ICON className="h-6 w-6 text-primary" />
          AI Assistant
        </h1>
        <p className="text-sm text-muted-foreground">
          Resolve complex cases with AI-powered assistance.
        </p>
      </div>

      <div className="flex items-center gap-2 self-start text-xs text-muted-foreground sm:self-end">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <Radio className="h-3 w-3" />
        <span className="font-medium text-foreground/80">Live</span>
        <span aria-hidden>·</span>
        <span>{totalLabel}</span>
      </div>
    </div>
  );
};

export default AiAssistantHeader;
