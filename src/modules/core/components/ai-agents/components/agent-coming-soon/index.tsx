import AiAgentRoot from "@/modules/core/components/ai-agents/components/ai-agent-root";
import { cn } from "@/lib/utils";
import { Construction } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AgentComingSoonPageProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
};

const AgentComingSoonPage = ({
  title,
  description,
  icon: Icon,
  iconClassName,
}: AgentComingSoonPageProps) => {
  return (
    <AiAgentRoot>
      <div
        className="flex flex-col items-center justify-center text-center py-16 px-4 border border-dashed border-muted-foreground/25 rounded-2xl bg-muted/30"
        role="status"
        aria-live="polite"
      >
        <div
          className={cn(
            "mb-6 p-4 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400",
            iconClassName,
          )}
        >
          <Icon className="h-10 w-10" strokeWidth={1.5} />
        </div>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          <Construction className="h-3.5 w-3.5" />
          Coming soon
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground max-w-md text-balance leading-relaxed">
          {description}
        </p>
      </div>
    </AiAgentRoot>
  );
};

export default AgentComingSoonPage;
