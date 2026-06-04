import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Bot } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type AgentCardProps = {
  id: string;
  name: string;
  Icon: React.ElementType;
  isEnabled: boolean;
  onChangeAgentStatus: () => void;
  isToggling: boolean;
  configurationLink: string;
  /** Disables the enable switch and shows a Coming soon badge (dashboard only). */
  comingSoon?: boolean;
};

const AgentsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} className="h-[122px] w-full rounded-lg" />
    ))}
  </div>
);

const Root = ({ children }: { children: React.ReactNode }) => (
  <Card className="rounded-lg">
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl">
          <Bot className="h-5 w-5" />
          AI Agents
        </div>
      </CardTitle>
      <CardDescription>
        Manage your specialized AI agents for automated customer support
      </CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const AgentCard = ({
  id,
  Icon,
  name,
  isEnabled,
  onChangeAgentStatus,
  isToggling,
  configurationLink,
  comingSoon = false,
}: AgentCardProps) => (
  <Card
    id={id}
    className={`rounded-lg relative gap-3 py-6 ${
      isEnabled && !comingSoon ? "ring-2 ring-primary/20" : ""
    }`}
  >
    <CardHeader className="gap-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center space-x-3 min-w-0">
          <div
            className={`p-2 rounded-lg shrink-0 ${
              isEnabled && !comingSoon ? "bg-primary/10" : "bg-gray-100"
            }`}
          >
            <Icon
              className={`h-5 w-5 ${
                isEnabled && !comingSoon ? "text-primary" : "text-gray-400"
              }`}
            />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <CardTitle className="text-lg">{name}</CardTitle>
            {comingSoon && (
              <Badge variant="secondary" className="w-fit text-xs">
                Coming soon
              </Badge>
            )}
          </div>
        </div>
        <Switch
          checked={isEnabled}
          onCheckedChange={() => onChangeAgentStatus()}
          disabled={isToggling || comingSoon}
          data-testid={`switch-${id}`}
          className={comingSoon ? "opacity-60" : "hover:cursor-pointer"}
        />
      </div>
    </CardHeader>
    <CardContent>
      <Link href={configurationLink}>
        <span className="text-sm text-primary hover:text-primary/80 cursor-pointer">
          Configure →
        </span>
      </Link>
    </CardContent>
  </Card>
);

const AIAgents = { Root, AgentsSkeleton, AgentCard };

export default AIAgents;
