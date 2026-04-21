"use client";
import { CheckCircle } from "lucide-react";
import DashboardHeader from "@/modules/protected-routes/dashboard/components/DashboardHeader";
import { useState } from "react";
import DASHBOARD from "@/constants/dashboard";
import StatCard from "@/modules/protected-routes/dashboard/components/StatCard";
import AIAgents from "@/modules/protected-routes/dashboard/components/AIAgents";
import DashboardCardsRoot from "@/modules/protected-routes/dashboard/components/DashboardCardsRoot";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AIAssistantQueue from "@/modules/protected-routes/dashboard/components/AIAssistantQueue";
import { useAiAgents } from "@/providers/ai-agents";
import { useUpdateSpecificAIAgentSettings } from "@/hooks/services/ai-agents/use-update-specific-ai-agent-settings";
import { useAiAssistant } from "@/providers/ai-assistant";

const Dashboard = () => {
  // Local States
  const [queuePriorityFilter, setQueuePriorityFilter] = useState("all");

  const { aiAgentsSettings, isFetchingAgentsSettings } = useAiAgents();
  const { updateAIAgentSettings, isUpdating } =
    useUpdateSpecificAIAgentSettings();

  const { escalationList, isPending: isFetchingEscalationList } =
    useAiAssistant();

  const dashboardAgents = DASHBOARD.AI_AGENTS.map((agent) => ({
    ...agent,
    agentType: agent.id,
    apiId:
      aiAgentsSettings[agent.id as keyof typeof aiAgentsSettings]?.id ?? "",
    isEnabled:
      aiAgentsSettings[agent.id as keyof typeof aiAgentsSettings]?.isEnabled ??
      false,
  }));
  const filteredEscalations = (escalationList ?? []).filter(
    (escalation) =>
      queuePriorityFilter === "all" ||
      escalation.priority === queuePriorityFilter,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <DashboardHeader
        title="Mission Control"
        description=" Advanced command center for intelligent email automation and
          escalation management"
      />

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DASHBOARD.STAT_CARDS.map((card, index) => (
          <StatCard
            key={index}
            label={card.label}
            value={card.value}
            colorClass={card.colorClass}
            icon={<card.icon className={`h-8 w-8 ${card.colorClass}`} />}
          />
        ))}
      </div>

      {/* AI Agents - Quick Actions */}
      <AIAgents.Root>
        {isFetchingAgentsSettings ? (
          <AIAgents.AgentsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardAgents.map((agent) => {
              return (
                <AIAgents.AgentCard
                  key={agent.agentType}
                  id={agent.agentType}
                  name={agent.name}
                  Icon={agent.icon}
                  isEnabled={agent.isEnabled}
                  onChangeAgentStatus={() =>
                    agent.apiId &&
                    updateAIAgentSettings({
                      params: {
                        agentId: agent.apiId,
                        isEnabled: !agent.isEnabled,
                      },
                    })
                  }
                  isToggling={isUpdating}
                  configurationLink={agent.href}
                />
              );
            })}
          </div>
        )}
      </AIAgents.Root>

      {/* AI Assistant Queue */}
      <DashboardCardsRoot
        title={
          <>
            <span>AI Assistant Queue</span>
            <Badge variant="secondary" className="rounded-full">
              {escalationList?.length ?? 0}
            </Badge>
          </>
        }
        description="Items requiring human attention"
        headerRightSection={
          <Select
            value={queuePriorityFilter}
            onValueChange={setQueuePriorityFilter}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="urgent">🔴 Urgent</SelectItem>
              <SelectItem value="high">🟠 High</SelectItem>
              <SelectItem value="medium">🟡 Medium</SelectItem>
              <SelectItem value="low">🔵 Low</SelectItem>
            </SelectContent>
          </Select>
        }
      >
        {isFetchingEscalationList ? (
          <AIAssistantQueue.EmailCardsSkeleton />
        ) : filteredEscalations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            All caught up!
          </div>
        ) : (
          <div className="space-y-3 p-4">
            {filteredEscalations.map((escalation) => (
              <AIAssistantQueue.EmailCard
                key={escalation.id}
                escalationQueueId={escalation.id}
                priority={escalation.priority}
                customerEmailSubject={escalation.email.subject}
                customerEmail={escalation.email.fromEmail}
                customerEmailBody={
                  escalation.reason || escalation.email.snippet
                }
                createdAt={escalation.createdAt}
              />
            ))}
          </div>
        )}
      </DashboardCardsRoot>

      {/* AI Assistant Queue & Activity Log */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCardsRoot
          title={
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Activity Log
            </>
          }
          description="Real-time ticket processing activity"
        >
          {escalationsLoading ? (
            <ActivityLog.ActivityLogSkeleton />
          ) : ACTIVIY_LOGS_TEMP.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No recent activity
            </div>
          ) : (
            <div className="space-y-3 p-4">
              {ACTIVIY_LOGS_TEMP.slice(0, 10).map((activity) => (
                <ActivityLog.ItemCard key={activity.id} {...activity} />
              ))}
            </div>
          )}
        </DashboardCardsRoot>
      </div> */}
    </div>
  );
};

export default Dashboard;
