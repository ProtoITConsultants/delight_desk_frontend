"use client";

import { SUBSCRIPTION_AGENT_ICON } from "@/constants/product-icons";
import AgentComingSoonPage from "@/modules/core/components/ai-agents/components/agent-coming-soon";

const SubscriptionAgentPage = () => {
  return (
    <AgentComingSoonPage
      title="Subscription Agent"
      description="We’re building this agent to help you automate billing, plan changes, and subscription inquiries. It isn’t available yet, but we’re working on it and it will be here soon."
      icon={SUBSCRIPTION_AGENT_ICON}
      iconClassName="bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400"
    />
  );
};

export default SubscriptionAgentPage;
