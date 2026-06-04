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
import { Button, buttonVariants } from "@/components/ui/button";

type CancelWorkflowButtonProps = {
  disabled?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  className?: string;
  label?: string;
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
  label = "Cancel workflow",
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={disabled}
          className={cn("inline-flex items-center gap-1.5", className)}
          onPointerDown={stopTriggerPropagation}
          onClick={stopTriggerPropagation}
        >
          <CircleStop className="size-3.5 shrink-0" />
          <span>{label}</span>
        </Button>
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
