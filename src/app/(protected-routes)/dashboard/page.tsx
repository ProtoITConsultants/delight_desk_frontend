"use client";
import { CheckCircle } from "lucide-react";
import DashboardHeader from "@/modules/protected-routes/dashboard/components/DashboardHeader";
import { useMemo, useState } from "react";
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
import TimeRangeSelector from "@/modules/protected-routes/dashboard/components/TimeRangeSelector";
import { DASHBOARD_ANALYTICS_RANGE } from "@/services/dashboard/types";
import { useDashboardAnalytics } from "@/hooks/services/dashboard/use-dashboard-analytics";
import StatCardsSkeleton from "@/modules/protected-routes/dashboard/components/StatCardsSkeleton";

const Dashboard = () => {
  // Local States
  const [queuePriorityFilter, setQueuePriorityFilter] = useState("all");
  const [timeRange, setTimeRange] =
    useState<DASHBOARD_ANALYTICS_RANGE>("last_30_days");

  const { aiAgentsSettings, isFetchingAgentsSettings } = useAiAgents();
  const { updateAIAgentSettings, isUpdating } =
    useUpdateSpecificAIAgentSettings();

  const { escalationList, isPending: isFetchingEscalationList } =
    useAiAssistant();
  const { analytics, isFetchingAnalytics } = useDashboardAnalytics(timeRange);

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

  const formatter = useMemo(() => new Intl.NumberFormat("en-US"), []);
  const statCards = useMemo(() => {
    return [
      {
        label: DASHBOARD.STAT_CARDS[0].label,
        value: analytics
          ? formatter.format(analytics.aiAgentActionsCompleted)
          : "--",
        colorClass: DASHBOARD.STAT_CARDS[0].colorClass,
        icon: DASHBOARD.STAT_CARDS[0].icon,
      },
      {
        label: DASHBOARD.STAT_CARDS[1].label,
        value: analytics
          ? formatter.format(analytics.aiAssistantTicketsResolved)
          : "--",
        colorClass: DASHBOARD.STAT_CARDS[1].colorClass,
        icon: DASHBOARD.STAT_CARDS[1].icon,
      },
      {
        label: DASHBOARD.STAT_CARDS[2].label,
        value: analytics
          ? formatter.format(analytics.totalEmailsReceived)
          : "--",
        colorClass: DASHBOARD.STAT_CARDS[2].colorClass,
        icon: DASHBOARD.STAT_CARDS[2].icon,
      },
      {
        label: DASHBOARD.STAT_CARDS[3].label,
        value: analytics
          ? `${formatter.format(analytics.timeSavedMinutes)} min`
          : "--",
        colorClass: DASHBOARD.STAT_CARDS[3].colorClass,
        icon: DASHBOARD.STAT_CARDS[3].icon,
      },
      {
        label: DASHBOARD.STAT_CARDS[4].label,
        value: analytics
          ? analytics.averageActionsPerResolvedTicket.toFixed(2)
          : "--",
        colorClass: DASHBOARD.STAT_CARDS[4].colorClass,
        icon: DASHBOARD.STAT_CARDS[4].icon,
      },
    ];
  }, [analytics, formatter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <DashboardHeader
        title="Mission Control"
        description=" Advanced command center for intelligent email automation and
          escalation management"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
        {analytics && (
          <p className="text-sm text-gray-500">
            {new Date(analytics.from).toLocaleDateString()} -{" "}
            {new Date(analytics.to).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {isFetchingAnalytics ? (
          <StatCardsSkeleton />
        ) : (
          statCards.map((card) => (
            <StatCard
              key={card.label}
              label={card.label}
              value={card.value}
              colorClass={card.colorClass}
              icon={
                <card.icon className={`h-8 w-8 ${card.colorClass} shrink-0`} />
              }
            />
          ))
        )}
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
