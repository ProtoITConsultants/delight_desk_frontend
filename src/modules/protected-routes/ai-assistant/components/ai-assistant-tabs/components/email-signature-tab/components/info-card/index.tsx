"use client";
import { Info, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Collapsible "how this works" callout. Defaults to collapsed because
 * returning users don't need the explanation every time — but the trigger
 * makes the info one click away. Inline label means screen readers still
 * get a heading without sacrificing vertical density.
 */
const EmailSignatureInfoCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-md border border-border bg-muted/30">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-3 px-4 py-3 text-left cursor-pointer"
      >
        <Info className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="flex-1 text-sm font-medium text-foreground">
          How email signatures are used
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
          Your signature is automatically appended to every response sent from
          AI Assistant — both AI drafts and manually composed replies. You can
          toggle it off per-email from the response composer.
        </div>
      )}
    </div>
  );
};

export default EmailSignatureInfoCard;
