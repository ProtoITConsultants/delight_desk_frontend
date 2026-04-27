import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AGENT_WORKFLOW_PROPS } from "./types";
import STATUS_CONFIG from "./constants/status-config";
import FULLFILLMENT_METHODS from "./constants/fullfilement-methods";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import OrderCancellationWorkflowOutcomeBanner from "./components/outcome-banner";
import OrderCancellationWorkflowTimeline from "./components/workflow-timeline";

const OrderCancellationAgentWorkflowCard = ({
  workflowStatus,
  fulfillmentMethod,
  orderNumber,
  customerEmail,
  createdAt,
  workflowId,
  actionProgress,
  hideCompletionOutcome,
  ...restProps
}: AGENT_WORKFLOW_PROPS) => {
  // Workflow Config (Status and Icon)
  const config =
    STATUS_CONFIG[workflowStatus as keyof typeof STATUS_CONFIG] ||
    STATUS_CONFIG.processing;
  const StatusIcon = config.icon;
  // Worflow Method Config
  const fullfillmentMethodConfig = FULLFILLMENT_METHODS.find(
    (m) => m.id === fulfillmentMethod
  );

  return (
    <Card>
      <CardHeader className="flex items-start flex-col sm:flex-row sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          {/* Mobile Version */}
          {fullfillmentMethodConfig && (
            <Badge
              variant="outline"
              className="text-xs items-center gap-1 flex sm:hidden mt-1"
            >
              <fullfillmentMethodConfig.icon className="h-3 w-3" />
              {fullfillmentMethodConfig.title}
            </Badge>
          )}

          <div className="flex items-center gap-2">
            <StatusIcon className="h-5 w-5 text-gray-500" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">
                Order #
                {orderNumber?.length ? orderNumber : "—"}
              </h3>
                {/* Big Screen */}
                {fullfillmentMethodConfig && (
                  <Badge
                    variant="outline"
                    className="text-xs  items-center gap-1 hidden sm:flex"
                  >
                    <fullfillmentMethodConfig.icon className="h-3 w-3" />
                    {fullfillmentMethodConfig.title}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {customerEmail}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={config.color}>{config.label}</Badge>
          <span className="text-xs text-gray-500">
            {createdAt
              ? formatDistanceToNow(new Date(createdAt), {
                  addSuffix: true,
                })
              : "Unknown"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        {/* Workflow Timeline */}
        <OrderCancellationWorkflowTimeline
          fulfillmentMethod={fulfillmentMethod}
          workflowStatus={workflowStatus}
          workflowId={workflowId}
          actionProgress={actionProgress}
        />

        {/* Final Outcome Banner */}
        {workflowStatus === "completed" &&
          !hideCompletionOutcome &&
          "workflowCancelled" in restProps &&
          (restProps.workflowCancelled ? (
            restProps.refundProcessed ? (
              <OrderCancellationWorkflowOutcomeBanner
                workflowCancelled={restProps.workflowCancelled}
                refundProcessed={restProps.refundProcessed}
                refundAmount={restProps.refundAmount}
              />
            ) : (
              <OrderCancellationWorkflowOutcomeBanner
                workflowCancelled={restProps.workflowCancelled}
                refundProcessed={restProps.refundProcessed}
              />
            )
          ) : (
            <OrderCancellationWorkflowOutcomeBanner
              workflowCancelled={restProps.workflowCancelled}
              failingReason={restProps.failingReason}
            />
          ))}
      </CardContent>
    </Card>
  );
};

export default OrderCancellationAgentWorkflowCard;
