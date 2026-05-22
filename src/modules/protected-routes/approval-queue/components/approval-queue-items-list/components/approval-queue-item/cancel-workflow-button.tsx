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
import {
  approvalQueueActionPillBaseClass,
  approvalQueueActionPillIconClass,
  approvalQueueActionPillTextClass,
} from "./action-pill-styles";

type CancelWorkflowButtonProps = {
  disabled?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  className?: string;
};

const stopTriggerPropagation = (event: SyntheticEvent) => {
  event.stopPropagation();
};

export const CancelWorkflowButton: FC<CancelWorkflowButtonProps> = ({
  disabled = false,
  open,
  onOpenChange,
  onCancel,
  className,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            approvalQueueActionPillBaseClass,
            approvalQueueActionPillTextClass,
            "appearance-none border-0 bg-destructive text-white hover:bg-destructive/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30 focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            className,
          )}
          onPointerDown={stopTriggerPropagation}
          onClick={stopTriggerPropagation}
        >
          <span className={approvalQueueActionPillIconClass}>
            <CircleStop className="size-4 shrink-0" />
          </span>
          <span className={approvalQueueActionPillTextClass}>Cancel workflow</span>
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
