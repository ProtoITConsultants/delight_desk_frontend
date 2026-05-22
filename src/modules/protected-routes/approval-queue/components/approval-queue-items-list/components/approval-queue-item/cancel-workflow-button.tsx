"use client";

import { FC, SyntheticEvent } from "react";
import { CircleStop } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type CancelWorkflowButtonVariant = "ghost" | "solid";

type CancelWorkflowButtonProps = {
  disabled?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  className?: string;
  /**
   * `ghost` is the calm, low-attention variant used inline in the card's
   * action row. `solid` keeps the older bright red pill for places that need
   * higher visual weight (kept for backwards compatibility).
   */
  variant?: CancelWorkflowButtonVariant;
  label?: string;
};

const stopTriggerPropagation = (event: SyntheticEvent) => {
  event.stopPropagation();
};

const VARIANT_CLASSES: Record<CancelWorkflowButtonVariant, string> = {
  ghost: cn(
    "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium",
    "text-muted-foreground hover:bg-muted hover:text-destructive transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ),
  solid: cn(
    "inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold shadow-sm transition-colors",
    "appearance-none border-0 bg-destructive text-white hover:bg-destructive/90",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ),
};

export const CancelWorkflowButton: FC<CancelWorkflowButtonProps> = ({
  disabled = false,
  open,
  onOpenChange,
  onCancel,
  className,
  variant = "ghost",
  label = "Cancel workflow",
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(VARIANT_CLASSES[variant], className)}
          onPointerDown={stopTriggerPropagation}
          onClick={stopTriggerPropagation}
        >
          <CircleStop className="size-3.5 shrink-0" />
          <span>{label}</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent onPointerDown={stopTriggerPropagation}>
        <AlertDialogHeader>
          <AlertDialogTitle>Stop this workflow?</AlertDialogTitle>
          <AlertDialogDescription>
            The workflow will be cancelled and will no longer continue processing
            this item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go back</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={onCancel}
          >
            Yes, cancel workflow
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
