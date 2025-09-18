"use client";
import { CheckCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/modules/protected-routes/dashboard/components/DashboardHeader";
import TimeRangeSelector from "@/modules/protected-routes/dashboard/components/TimeRangeSelector";
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
import ActivityLog, {
  ActivityLogCardProps,
} from "@/modules/protected-routes/dashboard/components/ActivityLog";

const ESCALATION_QUEUE_TEMP_EMAILS = [
  {
    escalationQueueId: "1",
    priority: "low",
    customerEmailSubject: "Re: Smarter Compliance for Growing Food Brands",
    customerEmail: "Krystle Law <krystle.law@getsieveapp.com>",
    customerEmailBody:
      "General inquiry requiring human review: The email is a follow-up from a business representative seeking to discuss compliance solutions with the recipient. There is no indication of a customer service issue or request for assistance related to orders, payments, or subscriptions. The intent is to initiate a business conversation rather than address a specific customer service concern.",
    createdAt: "8/26/2025, 11:33:43 PM",
  },
  {
    escalationQueueId: "2",
    priority: "high",
    customerEmailSubject: "Re: Inulin sensitivity and returns info",
    customerEmail: "Lysa Robb <lysa.robb@gmail.com>",
    customerEmailBody:
      "General inquiry requiring human review: The email is a follow-up from a business representative seeking to discuss compliance solutions with the recipient. There is no indication of a customer service issue or request for assistance related to orders, payments, or subscriptions. The intent is to initiate a business conversation rather than address a specific customer service concern.",
    createdAt: "8/26/2025, 11:33:43 PM",
  },
  {
    escalationQueueId: "3",
    priority: "medium",
    customerEmailSubject: "Re: Order #18907 Confirmation",
    customerEmail: "B B <cd2155@hotmail.com>",
    customerEmailBody:
      "General inquiry requiring human review: The customer initially requested an update to their shipping address to ensure delivery. The follow-up email confirms that the change was made, indicating the customer's concern was about the shipping address.",
    createdAt: "8/25/2025, 6:46:51 PM",
  },
];

const ACTIVIY_LOGS_TEMP: ActivityLogCardProps[] = [
  {
    id: "1",
    executedBy: "human",
    customerEmail: "rcmartin2525@gmail.com",
    details:
      "You successfully found order 19044 for customer rcmartin2525@gmail.com. Status: completed",
    status: "completed",
    createdAt: "1:00:25 AM",
  },
  {
    id: "2",
    executedBy: "ai",
    customerEmail: "rcmartin2525@gmail.com",
    details:
      "AI successfully found order 19044 for customer rcmartin2525@gmail.com. Status: completed",
    status: "failed",
    createdAt: "1:00:01 AM",
  },
  {
    id: "3",
    executedBy: "human",
    customerEmail: "ARPOWER17@gmail.com",
    details:
      "AI successfully found order 19006 for customer ARPOWER17@gmail.com. Status: completed",
    status: "pending",
    createdAt: "1:00:25 AM",
  },
];

const Dashboard = () => {
  // Local States
  const [timeRange, setTimeRange] = useState("today");
  const [queuePriorityFilter, setQueuePriorityFilter] = useState("all");

  const agentsLoading = false;
  const escalationsLoading = false;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <DashboardHeader
        title="Mission Control"
        description=" Advanced command center for intelligent email automation and
          escalation management"
      >
        <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log("Refresh Data");
          }}
          className="w-full sm:w-auto"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </DashboardHeader>

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
      <AIAgents.Root pendingApprovals={330}>
        {agentsLoading ? (
          <AIAgents.AgentsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DASHBOARD.AI_AGENTS.map((agent) => {
              return (
                <AIAgents.AgentCard
                  key={agent.id}
                  id={agent.id}
                  name={agent.name}
                  Icon={agent.icon}
                  isEnabled={false}
                  onChangeAgentStatus={() =>
                    console.log("Agent Status Changed")
                  }
                  isToggling={false}
                  configurationLink={agent.href}
                  ruleCount={10}
                />
              );
            })}
          </div>
        )}
      </AIAgents.Root>

      {/* AI Assistant Queue & Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Assistant Queue */}
        <DashboardCardsRoot
          title={
            <>
              <span>AI Assistant Queue</span>
              <Badge variant="secondary" className="rounded-full">
                26
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
          {escalationsLoading ? (
            <AIAssistantQueue.EmailCardsSkeleton />
          ) : ESCALATION_QUEUE_TEMP_EMAILS.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              All caught up!
            </div>
          ) : (
            <div className="space-y-3 p-4">
              {ESCALATION_QUEUE_TEMP_EMAILS.filter(
                (escalation) =>
                  queuePriorityFilter === "all" ||
                  escalation.priority === queuePriorityFilter
              ).map((escalation) => (
                <AIAssistantQueue.EmailCard
                  key={escalation.escalationQueueId}
                  {...escalation}
                />
              ))}
            </div>
          )}
        </DashboardCardsRoot>
        {/* Activity Log */}
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
      </div>
    </div>
  );
};

export default Dashboard;
