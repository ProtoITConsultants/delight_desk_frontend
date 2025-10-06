import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WHAT_AGENT_HANDLES_PROPS } from "../../utils/types";
import { cn } from "@/lib/utils";

const WhatAgentHandles = ({
  className,
  agentFeatures,
}: WHAT_AGENT_HANDLES_PROPS) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="gap-0">
        <CardTitle className="text-2xl">What this agent handles</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {agentFeatures.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 capitalize">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WhatAgentHandles;
