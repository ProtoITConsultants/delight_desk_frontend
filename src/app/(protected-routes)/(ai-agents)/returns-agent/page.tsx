"use client";

import AgentComingSoonPage from "@/modules/core/components/ai-agents/components/agent-coming-soon";
import { Package } from "lucide-react";

const ReturnsAgentPage = () => {
  return (
    <AgentComingSoonPage
      title="Returns Agent"
      description="We’re building this agent to automate return and refund flows using your store policies. It isn’t available yet, but we’re actively working on it and it will be here soon."
      icon={Package}
      iconClassName="bg-orange-500/10 text-orange-600 dark:text-orange-400"
    />
  );
};

export default ReturnsAgentPage;
