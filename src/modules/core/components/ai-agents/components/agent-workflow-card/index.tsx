import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AGENT_WORKFLOW_PROPS } from "./types";
import STATUS_CONFIG from "./constants/status-config";
import FULLFILLMENT_METHODS from "./constants/fullfilement-methods";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import OrderCancellationWorkflowOutcomeBanner from "./components/outcome-banner/order-cancellation-agent";
import { Button } from "@/components/ui/button";
import { Eye, RefreshCw } from "lucide-react";
import OrderCancellationWorkflowTimeline from "./components/workflow-timeline/order-cancellation-agent";

const AgentWorkflowCard = ({
  workflowStatus,
  fulfillmentMethod,
  orderNumber,
  customerEmail,
  createdAt,
  workflowCancelled,
  refundProcessed,
  refundAmount,
  failingReason,
  workflowId,
  agentType,
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
                <h3 className="font-semibold">Order #{orderNumber}</h3>
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
        {agentType === "order-cancellation-agent" ? (
          <>
            {/* Workflow Timeline */}
            <OrderCancellationWorkflowTimeline
              fulfillmentMethod={fulfillmentMethod}
              workflowStatus={workflowStatus}
              workflowId={workflowId}
            />

            {/* Final Outcome Banner */}
            {["completed", "canceled", "cannot_cancel"].includes(
              workflowStatus
            ) && (
              <OrderCancellationWorkflowOutcomeBanner
                workflowCancelled={workflowCancelled}
                refundProcessed={refundProcessed}
                refundAmount={refundAmount}
                failingReason={failingReason}
              />
            )}
          </>
        ) : (
          <></>
        )}

        {/* Retry Button */}
        {workflowStatus === "failed" && (
          <div className="mt-4 flex space-x-2">
            <Button size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-1" />
              Retry
            </Button>
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentWorkflowCard;
