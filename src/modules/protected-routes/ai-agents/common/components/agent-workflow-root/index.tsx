import { cn } from "@/lib/utils";
import { WORKFLOW_ROOT_PROPS } from "../../types/agent-workflow-root";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const AgentWorkflowRoot = ({
  rootClassName,
  headerClassName,
  WrokflowCardsSectionClassName,
  workflowType,
  activeWorkflowsCount,
  sectionHeading,
  onRefresh,
  children,
}: WORKFLOW_ROOT_PROPS) => {
  return (
    <div className={cn("flex flex-col gap-4", rootClassName)}>
      <div className={cn("flex items-center justify-between", headerClassName)}>
        <h2 className="text-xl font-semibold">{sectionHeading}</h2>
        {workflowType === "active" && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-gray-200/70">
              {activeWorkflowsCount} in progress
            </Badge>
            <Button onClick={onRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        )}
      </div>
      <div
        className={cn(
          "flex flex-col gap-4 max-h-[600px] overflow-auto",
          WrokflowCardsSectionClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default AgentWorkflowRoot;
