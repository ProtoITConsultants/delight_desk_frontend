import { AlertCircle, CheckCircle } from "lucide-react";
import { WORKFLOW_OUTCOME_BANNER_PROPS } from "../../types/outcome-banner";

const OrderCancellationWorkflowOutcomeBanner = ({
  workflowCancelled,
  refundProcessed,
  refundAmount,
  failingReason,
}: WORKFLOW_OUTCOME_BANNER_PROPS) => {
  return workflowCancelled ? (
    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
      <div className="flex items-center space-x-3">
        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
        <div>
          <div className="font-medium text-green-900 dark:text-green-100">
            Order Successfully Cancelled
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">
            {refundProcessed
              ? `Refund of $${refundAmount} has been processed`
              : "Order cancelled, refund will be processed separately"}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
      <div className="flex items-center space-x-3">
        <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
        <div>
          <div className="font-medium text-orange-900 dark:text-orange-100">
            Cancellation Not Possible
          </div>
          <div className="text-sm text-orange-700 dark:text-orange-300">
            {failingReason
              ? `Warehouse response: ${failingReason}`
              : "Order could not be cancelled due to fulfillment timing"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCancellationWorkflowOutcomeBanner;
