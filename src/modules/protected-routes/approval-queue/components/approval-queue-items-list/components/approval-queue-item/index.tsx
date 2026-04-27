"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Calendar, Mail, Pencil, User } from "lucide-react";
import { Stepper } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ApprovalQueueItemData } from "@/modules/protected-routes/approval-queue/utils/types";
import {
  AGENT_METADATA_MAP,
  ApprovalQueueItemsFilterLabelMap,
} from "../../utils";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useGetApprovalQueueItem } from "./use-approval-queue-item";
import { htmlToPlainText } from "@/modules/protected-routes/approval-queue/utils/html-to-plain-text";

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
  } = useGetApprovalQueueItem({
    approvalQueueId: id,
    workflowActions,
  });

  const [isEditingProposedEmail, setIsEditingProposedEmail] = useState(false);
  const [editedEmailBody, setEditedEmailBody] = useState("");

  useEffect(() => {
    setIsEditingProposedEmail(false);
  }, [pendingWorkflowAction?.id]);

  useEffect(() => {
    if (!pendingWorkflowAction) {
      setIsEditingProposedEmail(false);
    }
  }, [pendingWorkflowAction]);

  const stepperActive =
    pendingWorkflowActionIndex >= 0
      ? pendingWorkflowActionIndex
      : workflowActions.length;

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

  return (
    <Card className="gap-2 border-l-8 border-l-orange-500">
      <CardHeader>
        <div
          className={cn(
            "p-2 rounded-full flex items-center gap-2 w-fit",
            bgColor,
            textColor,
          )}
        >
          <AgentIcon className="h-6 w-6" />
          <span className="text-sm font-medium">{agentName}</span>
        </div>
      </CardHeader>
      <CardContent>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="flex flex-col gap-2 w-full rounded-lg p-2 hover:cursor-pointer hover:bg-secondary">
              <div className="flex items-center gap-8 justify-between w-full">
                <div className="flex items-center gap-2">
                  <Mail />
                  <p className="text-xl font-semibold line-clamp-1">
                    {emailSubject}
                  </p>
                </div>
                <Badge>{ApprovalQueueItemsFilterLabelMap[status]}</Badge>
              </div>
              <div className="flex items-center gap-3 w-full">
                <div className="flex items-center gap-2">
                  <User className="size-4" />
                  <p className="text-md text-secondary-foreground line-clamp-1">
                    {customerEmail}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <p className="text-md text-secondary-foreground line-clamp-1">
                    {format(new Date(createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleTrigger>
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
              {workflowActions.map((action, index) => (
                <Stepper.Step
                  key={action.id}
                  label={action.name || `Workflow Action ${index + 1}`}
                  description={action.description}
                  loading={
                    isActionButtonBusy &&
                    pendingWorkflowAction?.id === action.id
                  }
                />
              ))}
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
