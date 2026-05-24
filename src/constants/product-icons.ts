import { Bot, CreditCard, Workflow, type LucideIcon } from "lucide-react";

/**
 * Canonical icons for distinct product surfaces. Import from here instead of
 * picking Lucide icons ad hoc so AI Assistant and Subscription Agent stay
 * visually distinct across sidebar, dashboard, approval queue, and in-app UI.
 */
export const AI_ASSISTANT_ICON: LucideIcon = Bot;
export const AI_AGENT_ACTIONS_ICON: LucideIcon = Workflow;
export const SUBSCRIPTION_AGENT_ICON: LucideIcon = CreditCard;
