import { Badge } from "@/components/ui/badge";
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

type AgentCardProps = {
  id: string;
  name: string;
  Icon: React.ElementType;
  isEnabled: boolean;
  onChangeAgentStatus: () => void;
  isToggling: boolean;
  configurationLink: string;
  ruleCount: number;
};

const AgentsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} className="h-[122px] w-full rounded-lg" />
    ))}
  </div>
);

const Root = ({
  children,
  pendingApprovals,
}: {
  children: React.ReactNode;
  pendingApprovals: number;
}) => (
  <Card className="rounded-lg">
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl">
          <Bot className="h-5 w-5" />
          AI Agents
        </div>
        <Badge variant="secondary" className="rounded-full">
          {pendingApprovals}
        </Badge>
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
  ruleCount,
}: AgentCardProps) => (
  <Card
    id={id}
    className={`rounded-lg relative gap-3 py-6 ${
      isEnabled ? "ring-2 ring-primary/20" : ""
    }`}
  >
    <CardHeader className="gap-0">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg ${
              isEnabled ? "bg-primary/10" : "bg-gray-100"
            }`}
          >
            <Icon
              className={`h-5 w-5 ${
                isEnabled ? "text-primary" : "text-gray-400"
              }`}
            />
          </div>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
          </div>
        </div>
        <Switch
          checked={isEnabled}
          onCheckedChange={() => onChangeAgentStatus()}
          disabled={isToggling}
          data-testid={`switch-${id}`}
          className="hover:cursor-pointer"
        />
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {ruleCount > 0 && (
            <Badge variant="secondary" className="text-xs rounded-full">
              {ruleCount} rules
            </Badge>
          )}
        </div>
        <Link href={configurationLink}>
          <span className="text-sm text-primary hover:text-primary/80 cursor-pointer">
            Configure →
          </span>
        </Link>
      </div>
    </CardContent>
  </Card>
);

const AIAgents = { Root, AgentsSkeleton, AgentCard };

export default AIAgents;
