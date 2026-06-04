import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HOW_AGENT_WORKS_PROPS } from "../../utils/types";

const HowAgentWorks = ({
  className,
  agentWorkflowSteps,
  agentWorkflowClassName,
  agentRequiresModeration,
}: HOW_AGENT_WORKS_PROPS) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="gap-0">
        <CardTitle className="text-2xl">How It Works</CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm",
          agentWorkflowClassName
        )}
      >
        {agentWorkflowSteps.map((step, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="font-medium flex items-center gap-2">
              {step.icon}
              <span>
                {index + 1}. {step.title}
              </span>
            </div>
            <p className="text-gray-600">
              {agentRequiresModeration && step.moderationDescription
                ? step.moderationDescription
                : step.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default HowAgentWorks;
