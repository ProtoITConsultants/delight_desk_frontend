"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  BellRing,
  Calendar,
  ChevronDown,
  ExternalLink,
  Mail,
  Pencil,
  User,
} from "lucide-react";
import { Stepper } from "@mantine/core";
import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ApprovalQueueItemData } from "@/modules/protected-routes/approval-queue/utils/types";
import {
  APPROVAL_QUEUE_PENDING_APPROVAL_FILTER,
  ApprovalQueueItemStatus,
} from "@/modules/protected-routes/approval-queue/utils/constants";
import {
  AGENT_METADATA_MAP,
  APPROVAL_QUEUE_STATUS_STYLES,
  ApprovalQueueItemsFilterLabelMap,
  hasPendingApprovalAction,
} from "../../utils";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useGetApprovalQueueItem } from "./use-approval-queue-item";
import { htmlToPlainText } from "@/modules/protected-routes/approval-queue/utils/html-to-plain-text";
import { CancelWorkflowButton } from "./cancel-workflow-button";
import Link from "next/link";
import {
  getWorkflowActionStepDescription,
  getWorkflowActionStepLabel,
  getWorkflowActionStepVisuals,
  getWorkflowStepperActiveIndex,
} from "./workflow-action-step";

const PROPOSED_EMAIL_HTML_RE = /<[a-z][^>]*>/i;

const ProposedEmailBodyPreview = ({ body }: { body: string }) => {
  const asHtml = PROPOSED_EMAIL_HTML_RE.test(body);
  if (asHtml) {
    return (
      <div
        className="w-full break-words rounded-lg border border-primary/15 bg-primary/5 px-4 py-3 text-sm"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    );
  }
  return (
    <div className="w-full whitespace-pre-wrap break-words rounded-lg border border-primary/15 bg-primary/5 px-4 py-3 text-sm">
      {body}
    </div>
  );
};

export const ApprovalQueueItem: FC<ApprovalQueueItemData> = ({
  id,
  status,
  category,
  customerEmail,
  customerName,
  emailSubject,
  createdAt,
  originalCustomerEmailBody,
  workflowActions,
}) => {
  const {
    approveAction,
    editAndApproveAction,
    rejectAction,
    disableActionButtons,
    pendingWorkflowAction,
    escalationId,
    pendingWorkflowActionIndex,
    shouldShowActionButtons,
    isApprovingAction,
    isEditApprovingAction,
    isRejectingAction,
    cancelWorkflow,
  } = useGetApprovalQueueItem({
    approvalQueueId: id,
    workflowActions,
  });

  const [isEditingProposedEmail, setIsEditingProposedEmail] = useState(false);
  const [editedEmailBody, setEditedEmailBody] = useState("");
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const suppressActionsToggleRef = useRef(false);

  const handleCancelDialogOpenChange = (open: boolean) => {
    if (!open) {
      suppressActionsToggleRef.current = true;
      requestAnimationFrame(() => {
        suppressActionsToggleRef.current = false;
      });
    }
    setIsCancelDialogOpen(open);
  };

  const handleActionsOpenChange = (open: boolean) => {
    if (isCancelDialogOpen || suppressActionsToggleRef.current) return;
    setIsActionsOpen(open);
  };

  useEffect(() => {
    setIsEditingProposedEmail(false);
  }, [pendingWorkflowAction?.id]);

  useEffect(() => {
    if (!pendingWorkflowAction) {
      setIsEditingProposedEmail(false);
    }
  }, [pendingWorkflowAction]);

  const stepperActive = getWorkflowStepperActiveIndex(
    workflowActions,
    pendingWorkflowActionIndex,
  );

  const isActionButtonBusy =
    isApprovingAction || isEditApprovingAction || isRejectingAction;

  const hasProposedEmailBody = Boolean(
    pendingWorkflowAction?.proposedEmailBody?.trim(),
  );

  const openEditMode = () => {
    const raw = pendingWorkflowAction?.proposedEmailBody ?? "";
    setEditedEmailBody(htmlToPlainText(raw));
    setIsEditingProposedEmail(true);
  };

  const {
    icon: AgentIcon,
    agentName,
    bgColor,
    textColor,
  } = AGENT_METADATA_MAP[category];

  const statusStyles = APPROVAL_QUEUE_STATUS_STYLES[status];
  const StatusIcon = statusStyles?.icon;
  const isInProgress = status === ApprovalQueueItemStatus.IN_PROGRESS;
  const isEscalated = status === ApprovalQueueItemStatus.ESCALATED;

  const isAwaitingApproval = hasPendingApprovalAction(workflowActions);
  const pendingApprovalStyles =
    APPROVAL_QUEUE_STATUS_STYLES[APPROVAL_QUEUE_PENDING_APPROVAL_FILTER];

  return (
    <Card
      className={cn(
        "relative gap-0 overflow-hidden py-0 transition-shadow",
        isAwaitingApproval && "ring-1 ring-orange-200/70",
      )}
    >
      <Collapsible
        open={isActionsOpen}
        onOpenChange={handleActionsOpenChange}
        className="group"
      >
        <div className="flex flex-col gap-4 p-5">
          {/* Meta row: agent chip + status + date */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                  bgColor,
                  textColor,
                )}
              >
                <AgentIcon className="h-3.5 w-3.5" />
                <span>{agentName}</span>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
                  statusStyles?.softPill,
                )}
              >
                {StatusIcon && <StatusIcon className="h-3.5 w-3.5" />}
                <span>{ApprovalQueueItemsFilterLabelMap[status]}</span>
              </span>
              {isAwaitingApproval && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
                    pendingApprovalStyles.softPill,
                  )}
                  title="At least one action is awaiting your approval"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
                  </span>
                  Needs your approval
                </span>
              )}
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(new Date(createdAt), "MMM d, yyyy")}</span>
            </div>
          </div>

          {/* Subject + customer */}
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex w-full flex-col gap-1.5 rounded-md text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <h3
                  className="min-w-0 flex-1 break-words text-base font-semibold leading-snug sm:text-lg"
                  title={emailSubject}
                >
                  {emailSubject}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 pl-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  <span className="font-medium text-foreground/80">
                    {customerName || "Unknown customer"}
                  </span>
                </span>
                <span className="text-muted-foreground/60">·</span>
                <span
                  className="break-all"
                  title={customerEmail}
                >
                  {customerEmail}
                </span>
              </div>
            </button>
          </CollapsibleTrigger>

          {/* Action row */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
            {isEscalated && escalationId && (
              <Button
                asChild
                type="button"
                size="sm"
                variant="outline"
                className="inline-flex items-center gap-1.5"
              >
                <Link
                  href={`/ai-assistant?escalationId=${encodeURIComponent(
                    escalationId,
                  )}&source=approval-queue`}
                  aria-label={`View escalated ticket "${emailSubject}" in AI Assistant`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View in AI Assistant
                </Link>
              </Button>
            )}
            {isInProgress && (
              <CancelWorkflowButton
                disabled={disableActionButtons}
                open={isCancelDialogOpen}
                onOpenChange={handleCancelDialogOpenChange}
                onCancel={() => {
                  cancelWorkflow(undefined, {
                    onSuccess: () => setIsCancelDialogOpen(false),
                  });
                }}
              />
            )}
            <CollapsibleTrigger asChild>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="inline-flex items-center gap-1.5"
              >
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    "group-data-[state=open]:rotate-180",
                  )}
                />
                <span className="group-data-[state=open]:hidden">
                  {isAwaitingApproval
                    ? "Review & approve agent actions"
                    : "View agent actions"}
                </span>
                <span className="hidden group-data-[state=open]:inline">
                  Hide agent actions
                </span>
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent>
          <CardContent className="border-t bg-muted/20 px-5 py-5">
            <div className="flex flex-col gap-5">
              {/* Inciting customer message — rendered full-width as
                  background context. The proposed AI response used to
                  live here in a side-by-side grid, but it's now part of
                  the "Awaiting your approval" panel below so the thing
                  being approved sits adjacent to its Approve / Reject
                  buttons (Fitts's Law + Gestalt proximity). */}
              <section className="flex flex-col gap-2">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Original email
                </h4>
                <div
                  className="w-full break-words rounded-lg border bg-card px-4 py-3 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: originalCustomerEmailBody || "",
                  }}
                />
              </section>

              {/* Workflow progress — shows where we are in the lifecycle.
                  The active step matches the orange "Awaiting" panel below
                  when a step is pending approval. */}
              <section className="flex flex-col gap-3">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Workflow
                </h4>
                <Stepper
                  active={stepperActive}
                  orientation="vertical"
                  iconSize={32}
                >
                  {workflowActions.map((action, index) => {
                    const stepVisuals = getWorkflowActionStepVisuals(
                      action.status,
                    );

                    return (
                      <Stepper.Step
                        key={action.id}
                        label={getWorkflowActionStepLabel(action, index)}
                        description={getWorkflowActionStepDescription(action)}
                        color={stepVisuals.color}
                        completedIcon={stepVisuals.completedIcon}
                        progressIcon={stepVisuals.progressIcon}
                        loading={
                          isActionButtonBusy &&
                          pendingWorkflowAction?.id === action.id
                        }
                      />
                    );
                  })}
                </Stepper>
              </section>

              {/* "Awaiting your approval" panel.
               *
               *  Co-locates everything the user needs to make a decision:
               *    - What this action will do (action details)
               *    - What we're about to send (proposed email + edit)
               *    - The decision itself (Approve / Reject)
               *
               *  The orange treatment is intentional — it matches the
               *  accent bar at the top of the card and the "Needs your
               *  approval" pill in the header, so the page's hero color
               *  travels from "spot it" → "expand it" → "act on it".
               */}
              {shouldShowActionButtons && pendingWorkflowAction && (
                <section
                  className="flex flex-col gap-4 rounded-lg border border-orange-200 bg-orange-50/40 p-4"
                  aria-label="Action awaiting your approval"
                >
                  <header className="flex items-center gap-2">
                    <BellRing
                      className="h-4 w-4 text-orange-600"
                      aria-hidden
                    />
                    <h4 className="text-sm font-semibold text-orange-700">
                      Awaiting your approval
                    </h4>
                  </header>

                  {pendingWorkflowAction.actionDetails && (
                    <div className="flex flex-col gap-2">
                      <h5 className="text-xs font-semibold uppercase tracking-wide text-orange-700/80">
                        What this action will do
                      </h5>
                      <div className="rounded-md border border-orange-100 bg-card px-3 py-2.5 text-sm">
                        {pendingWorkflowAction.actionDetails}
                      </div>
                    </div>
                  )}

                  {pendingWorkflowAction.proposedEmailBody && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-xs font-semibold uppercase tracking-wide text-orange-700/80">
                          Proposed email response
                        </h5>
                        {hasProposedEmailBody && !isEditingProposedEmail && (
                          <button
                            type="button"
                            onClick={openEditMode}
                            disabled={disableActionButtons}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-orange-700 transition-colors hover:bg-orange-100 hover:text-orange-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>
                        )}
                      </div>
                      {isEditingProposedEmail ? (
                        <Textarea
                          value={editedEmailBody}
                          onChange={(e) => setEditedEmailBody(e.target.value)}
                          className="min-h-[160px] w-full text-sm"
                          disabled={disableActionButtons}
                        />
                      ) : (
                        <ProposedEmailBodyPreview
                          body={pendingWorkflowAction.proposedEmailBody}
                        />
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 border-t border-orange-200/60 pt-4">
                    {hasProposedEmailBody && isEditingProposedEmail ? (
                      <>
                        <Button
                          onClick={() => {
                            const text = editedEmailBody.trim();
                            if (!text) return;
                            editAndApproveAction({
                              actionId: pendingWorkflowAction?.id ?? "",
                              editedResponse: text,
                            });
                          }}
                          disabled={
                            disableActionButtons || !editedEmailBody.trim()
                          }
                        >
                          Save and approve
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditingProposedEmail(false)}
                          disabled={disableActionButtons}
                        >
                          Discard changes
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          approveAction(pendingWorkflowAction?.id ?? "");
                        }}
                        disabled={disableActionButtons}
                      >
                        Approve
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        rejectAction(pendingWorkflowAction?.id ?? "");
                      }}
                      disabled={disableActionButtons}
                    >
                      Reject
                    </Button>
                  </div>
                </section>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
