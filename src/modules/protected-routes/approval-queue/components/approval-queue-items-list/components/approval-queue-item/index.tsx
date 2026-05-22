"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Calendar, ChevronDown, Mail, Pencil, User } from "lucide-react";
import { Stepper } from "@mantine/core";
import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ApprovalQueueItemData } from "@/modules/protected-routes/approval-queue/utils/types";
import {
  ApprovalQueueItemStatus,
} from "@/modules/protected-routes/approval-queue/utils/constants";
import {
  AGENT_METADATA_MAP,
  APPROVAL_QUEUE_STATUS_STYLES,
  ApprovalQueueItemsFilterLabelMap,
} from "../../utils";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useGetApprovalQueueItem } from "./use-approval-queue-item";
import { htmlToPlainText } from "@/modules/protected-routes/approval-queue/utils/html-to-plain-text";
import { AgentControls } from "./agent-controls";
import { CancelWorkflowButton } from "./cancel-workflow-button";
import { approvalQueueActionPillBaseClass, approvalQueueActionPillIconClass, approvalQueueActionPillTextClass } from "./action-pill-styles";
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
        className="py-4 px-5 bg-primary/10 w-full rounded-xl break-words text-sm"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    );
  }
  return (
    <div
      className="py-4 px-5 bg-primary/10 w-full rounded-xl text-sm break-words whitespace-pre-wrap"
    >
      {body}
    </div>
  );
};

export const ApprovalQueueItem: FC<ApprovalQueueItemData> = ({
  id,
  status,
  category,
  customerEmail,
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

  return (
    <Card
      className={cn(
        "gap-2 border-l-8",
        statusStyles?.leftBorder ?? "border-l-orange-500",
      )}
    >
      <CardHeader>
        <div className="flex flex-col items-start gap-3 min-[650px]:flex-row min-[650px]:items-center min-[650px]:justify-between">
          <div className="flex w-fit items-center overflow-hidden rounded-full border border-border/40 shadow-sm">
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-2",
                bgColor,
                textColor,
              )}
            >
              <AgentIcon className="h-5 w-5" />
              <span className="text-sm font-medium">{agentName}</span>
            </div>
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-2",
                statusStyles?.pill,
              )}
            >
              {StatusIcon && <StatusIcon className="h-5 w-5" />}
              <span className="text-sm font-medium">
                {ApprovalQueueItemsFilterLabelMap[status]}
              </span>
            </div>
          </div>
          <AgentControls category={category} agentName={agentName} />
        </div>
      </CardHeader>
      <CardContent>
        <Collapsible
          open={isActionsOpen}
          onOpenChange={handleActionsOpenChange}
          className="group"
        >
          <div className="flex w-full flex-col gap-2 rounded-lg p-2">
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex w-full flex-col gap-2 rounded-lg text-left hover:cursor-pointer hover:bg-secondary"
              >
                <div className="flex items-start gap-2 w-full min-w-0">
                  <Mail className="size-5 sm:size-6 mt-0.5 shrink-0" />
                  <p
                    className={cn(
                      "min-w-0 flex-1 font-semibold break-words",
                      "text-base sm:text-lg lg:text-xl",
                    )}
                    title={emailSubject}
                  >
                    {emailSubject}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 w-full">
                  <div className="flex items-center gap-2 min-w-0 max-w-full">
                    <User className="size-4 shrink-0" />
                    <p
                      className="text-sm sm:text-md text-secondary-foreground line-clamp-1 break-all"
                      title={customerEmail}
                    >
                      {customerEmail}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Calendar className="size-4 shrink-0" />
                    <p className="text-sm sm:text-md text-secondary-foreground line-clamp-1">
                      {format(new Date(createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              </button>
            </CollapsibleTrigger>
            <div className="ml-auto inline-flex w-max flex-col items-stretch gap-2 pt-1">
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
                <div
                  className={cn(
                    approvalQueueActionPillBaseClass,
                    "cursor-pointer border border-primary bg-primary text-primary-foreground shadow-md",
                    "hover:bg-primary/90 hover:border-primary",
                  )}
                >
                  <span className={approvalQueueActionPillIconClass}>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 transition-transform duration-200",
                        "group-data-[state=open]:rotate-180",
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      approvalQueueActionPillTextClass,
                      "group-data-[state=open]:hidden",
                    )}
                  >
                    View actions
                  </span>
                  <span
                    className={cn(
                      approvalQueueActionPillTextClass,
                      "hidden group-data-[state=open]:inline",
                    )}
                  >
                    Hide actions
                  </span>
                </div>
              </CollapsibleTrigger>
            </div>
          </div>
          <CollapsibleContent className="flex flex-col items-start gap-4 p-2.5 text-sm">
            <div className="flex flex-col gap-2 w-full">
              <p className="font-semibold">Original Email Content</p>
              <div
                className="py-4 px-5 bg-secondary w-full rounded-xl"
                dangerouslySetInnerHTML={{
                  __html: originalCustomerEmailBody || "",
                }}
              />
            </div>
            <Stepper
              active={stepperActive}
              orientation="vertical"
              iconSize={37}
            >
              {workflowActions.map((action, index) => {
                const stepVisuals = getWorkflowActionStepVisuals(action.status);

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
            <div className="ps-[49px] flex flex-col gap-3 items-start w-full">
              {pendingWorkflowAction?.actionDetails && (
                <div className="py-4 px-5 bg-secondary w-full rounded-xl">
                  <p>{pendingWorkflowAction?.actionDetails}</p>
                </div>
              )}
              {pendingWorkflowAction?.proposedEmailBody && (
                <div className="flex flex-col gap-2 w-full">
                  <p className="font-semibold">AI Response</p>
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

              {shouldShowActionButtons && (
                <div className="flex flex-wrap items-center gap-3">
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
                        Edit and approve
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditingProposedEmail(false)}
                        disabled={disableActionButtons}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          approveAction(pendingWorkflowAction?.id ?? "");
                        }}
                        disabled={disableActionButtons}
                      >
                        Approve
                      </Button>
                      {hasProposedEmailBody && (
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={openEditMode}
                          disabled={disableActionButtons}
                        >
                          <Pencil className="h-4 w-4 mr-1.5" />
                          Edit
                        </Button>
                      )}
                    </>
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
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
