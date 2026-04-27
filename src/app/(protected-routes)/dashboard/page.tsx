"use client";
import { CheckCircle } from "lucide-react";
import DashboardHeader from "@/modules/protected-routes/dashboard/components/DashboardHeader";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { useActivityLog } from "@/hooks/services/activity-log/use-activity-log";
import { useActivityLogStreamSync } from "@/hooks/services/activity-log/use-activity-log-stream-sync";
import { useDashboardAnalytics } from "@/hooks/services/dashboard/use-dashboard-analytics";
import StatCardsSkeleton from "@/modules/protected-routes/dashboard/components/StatCardsSkeleton";
import ActivityLog from "@/modules/protected-routes/dashboard/components/ActivityLog";

const DASHBOARD_COMING_SOON_AGENT_IDS = new Set(["subscription", "returns"]);

const Dashboard = () => {
  useActivityLogStreamSync();

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
  const {
    activityLogs,
    isActivityLogsPending,
    isActivityLogsFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useActivityLog({ limit: 10 });

  const activityLogScrollRef = useRef<HTMLDivElement>(null);
  const activityLogLoadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = activityLogScrollRef.current;
    const target = activityLogLoadMoreRef.current;
    if (!root || !target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          !entry?.isIntersecting ||
          !hasNextPage ||
          isActivityLogsFetchingNextPage
        ) {
          return;
        }
        void fetchNextPage();
      },
      { root, rootMargin: "80px", threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isActivityLogsFetchingNextPage, fetchNextPage]);

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
              const isComingSoon = DASHBOARD_COMING_SOON_AGENT_IDS.has(
                agent.agentType,
              );
              return (
                <AIAgents.AgentCard
                  key={agent.agentType}
                  id={agent.agentType}
                  name={agent.name}
                  Icon={agent.icon}
                  isEnabled={agent.isEnabled}
                  onChangeAgentStatus={() =>
                    !isComingSoon &&
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
                  comingSoon={isComingSoon}
                />
              );
            })}
          </div>
        )}
      </AIAgents.Root>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <DashboardCardsRoot
          title={
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Activity Log
            </>
          }
          description="Real-time ticket processing activity"
        >
          {isActivityLogsPending ? (
            <ActivityLog.ActivityLogSkeleton />
          ) : activityLogs.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No recent activity
            </div>
          ) : (
            <div
              ref={activityLogScrollRef}
              className="max-h-[min(24rem,50vh)] overflow-y-auto"
            >
              <div className="space-y-3 p-4">
                {activityLogs.map((activity) => (
                  <ActivityLog.ItemCard key={activity.id} {...activity} />
                ))}
              </div>
              {hasNextPage && (
                <div
                  ref={activityLogLoadMoreRef}
                  className="h-1 shrink-0"
                  aria-hidden
                />
              )}
              {isActivityLogsFetchingNextPage && (
                <div className="px-4 pb-4">
                  <ActivityLog.ActivityLogBottomSkeleton />
                </div>
              )}
            </div>
          )}
        </DashboardCardsRoot>
      </div>
    </div>
  );
};

export default Dashboard;
