"use client";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/modules/protected-routes/dashboard/components/DashboardHeader";
import TimeRangeSelector from "@/modules/protected-routes/dashboard/components/TimeRangeSelector";
import { useState } from "react";
import DASHBOARD from "@/constants/dashboard";
import StatCard from "@/modules/protected-routes/dashboard/components/StatCard";
import AIAgents from "@/modules/protected-routes/dashboard/components/AIAgents";

const Dashboard = () => {
  // Local States
  const [timeRange, setTimeRange] = useState("today");

  const agentsLoading = false;

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
    </div>
  );
};

export default Dashboard;
