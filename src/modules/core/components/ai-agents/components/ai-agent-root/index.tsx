import { cn } from "@/lib/utils";
import { AI_AGENT_ROOT_PROPS } from "../../utils/types";

const AiAgentRoot = ({ className, children }: AI_AGENT_ROOT_PROPS) => {
  return (
    <div className={cn("max-w-6xl mx-auto p-6 flex flex-col gap-6", className)}>
      {children}
    </div>
  );
};

export default AiAgentRoot;
