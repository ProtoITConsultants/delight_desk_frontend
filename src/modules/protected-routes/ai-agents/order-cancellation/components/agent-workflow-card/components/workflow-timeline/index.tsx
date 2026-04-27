import { CheckCircle, XCircle } from "lucide-react";
import getCurrentWorkflowStep from "../../services/get-current-step";
import getWorkflowStepConfig from "../../services/get-workflow-step-config";
import { WORKFLOW_TIMELINE_PROPS } from "../../types/workflow-timeline";
import type { ApprovalProgressStage } from "@/services/approval-queue/utils/workflow-progress";

const stageStatusHelpText: Record<ApprovalProgressStage["status"], string> = {
  pending: "Pending",
  in_progress: "In progress",
  completed: "Completed",
  blocked: "Needs attention",
  cancelled: "Cancelled",
};

const OrderCancellationWorkflowTimeline = ({
  fulfillmentMethod,
  workflowStatus,
  workflowId,
  actionProgress,
}: WORKFLOW_TIMELINE_PROPS) => {
  if (actionProgress?.timeline?.length) {
    const steps = [...actionProgress.timeline].sort(
      (a, b) => a.order - b.order,
    );
    const currentLabel =
      actionProgress.currentStep?.label ||
      steps.find((s) => s.status === "in_progress")?.label ||
      "Processing";
    return (
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Current step: {currentLabel}
        </div>
        <div className="relative max-w-[calc(100dvw-96px)] lg:max-w-[calc(100dvw-366.5px)] overflow-x-auto">
          <div className="relative flex justify-between items-start gap-4 px-4 py-2 min-w-max">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
            {steps.map((step) => {
              const isCompleted = step.status === "completed";
              const isInProgress = step.status === "in_progress";
              const isBlocked = step.status === "blocked";
              const isCancelled = step.status === "cancelled";
              return (
                <div
                  key={`${workflowId}-api-step-${step.key}`}
                  className="flex flex-col items-center relative"
                >
                  <div
                    className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold border-2 relative z-10
                        ${
                          isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : isInProgress
                              ? "bg-blue-500 border-blue-500 text-white animate-pulse"
                              : isBlocked
                                ? "bg-red-500 border-red-500 text-white"
                                : isCancelled
                                  ? "bg-gray-400 border-gray-400 text-white"
                                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                        }
                      `}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : isBlocked || isCancelled ? (
                      <XCircle className="h-5 w-5" />
                    ) : (
                      <span>{step.order}</span>
                    )}
                  </div>
                  <div className="mt-3 text-center max-w-24">
                    <div
                      className={`text-xs font-medium ${
                        isCompleted || isInProgress || isBlocked
                          ? "text-gray-900 dark:text-gray-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {step.label}
                    </div>
                    <div className="text-xs mt-1 text-gray-500 dark:text-gray-400 leading-tight">
                      {stageStatusHelpText[step.status]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Workflow Steps Config
  const workflowStepConfig = getWorkflowStepConfig({
    fulfillmentMethod,
    worflowStatus: workflowStatus,
    workflowCancelled: false,
  });

  // Workflow Steps
  const workflowSteps = Object.values(workflowStepConfig).sort(
    (a, b) => a.order - b.order
  );
  const currentStep = getCurrentWorkflowStep({
    fulfillmentMethod,
    workflowStatus,
    customerAcknowledgmentSent: false,
    warehouseReplyReceived: false,
    workflowStep: workflowSteps[0].id,
  });

  return (
    <div className="flex flex-col gap-3">
      {/* Current Step Heading */}
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Current Step: {workflowSteps[currentStep - 1]?.label || "Processing"}
      </div>
      {/* Timeline Steps */}
      <div className="relative max-w-[calc(100dvw-96px)] lg:max-w-[calc(100dvw-366.5px)] overflow-x-auto">
        <div className="relative flex justify-between items-start gap-4 px-4 py-2 min-w-max">
          {/* Timeline line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
          {/* Steps */}
          {workflowSteps.map((step) => {
            const stepNumber = step.order;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isFailed =
              (workflowStatus === "failed" || workflowStatus === "escalated") &&
              stepNumber === currentStep;

            return (
              <div
                key={`${workflowId}-step-${step.order}`}
                className="flex flex-col items-center relative"
              >
                {/* Step circle */}
                <div
                  className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold border-2 relative z-10
                        ${
                          isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : isCurrent && !isFailed
                            ? "bg-blue-500 border-blue-500 text-white animate-pulse"
                            : isFailed
                            ? "bg-red-500 border-red-500 text-white"
                            : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                        }
                      `}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : isFailed ? (
                    <XCircle className="h-5 w-5" />
                  ) : (
                    <span>{step.order}</span>
                  )}
                </div>

                {/* Step content */}
                <div className="mt-3 text-center max-w-24">
                  <div
                    className={`text-xs font-medium ${
                      isCompleted || isCurrent
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.label}
                  </div>
                  <div
                    className={`text-xs mt-1 leading-tight ${
                      isCompleted || isCurrent
                        ? "text-gray-600 dark:text-gray-300"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderCancellationWorkflowTimeline;
