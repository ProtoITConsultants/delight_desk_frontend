import { AI_AGENT_HEADER_PROPS } from "../../utils/types";
import { cn } from "@/lib/utils";

const AiAgentHeader = ({
  className,
  Icon,
  title,
  description,
  hasRightSection,
  rightSection,
  rightSectionClassName,
}: AI_AGENT_HEADER_PROPS) => {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-3">
        {Icon}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      {hasRightSection && (
        <div className={cn("flex flex-col gap-2", rightSectionClassName)}>
          {rightSection}
        </div>
      )}
    </div>
  );
};

export default AiAgentHeader;
