import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Zap } from "lucide-react";

type CARD_TYPE = "active-workflow" | "completed-workflow";

interface EmptyWorkflowCardProps {
  workflowType: CARD_TYPE;
}

const EmptyWorkflowCard = ({ workflowType }: EmptyWorkflowCardProps) => {
  return (
    <Card>
      <CardContent className="text-center py-8 flex flex-col gap-2 items-center">
        {workflowType === "active-workflow" ? (
          <Zap className="h-12 w-12 mx-auto text-gray-400 mb-2" />
        ) : (
          <CheckCircle className="h-12 w-12 mx-auto text-gray-400 mb-2" />
        )}
        <h3 className="text-lg font-semibold">
          No {workflowType === "active-workflow" ? "Active" : "Completed"}{" "}
          Workflows
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {workflowType === "active-workflow"
            ? "Order cancellation automation is running in the background. New workflows will appear here when customers request cancellations."
            : "No Order Cancellation workflows have been completed yet. Once a workflow is completed, it will appear here."}
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyWorkflowCard;
