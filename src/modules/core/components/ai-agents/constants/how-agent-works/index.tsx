import { Bot, CreditCard, Mail, Truck } from "lucide-react";
import { AGENT_WORKFLOW_CARD_PROPS } from "../../utils/types";

// WISMO Agent
const WISMO_AGENT: AGENT_WORKFLOW_CARD_PROPS[] = [
  {
    title: "Detection",
    description:
      "AI identifies order status inquiries and shipping questions from customer emails.",
    icon: <Bot className="h-4 w-4 text-blue-600" />,
  },
  {
    title: "Processing",
    description:
      "Looks up order information and tracking details automatically.",
    icon: <Truck className="h-4 w-4 text-green-600" />,
  },
  {
    title: "Response",
    description: "Sends personalized response with order status and tracking.",
    icon: <Mail className="h-4 w-4 text-purple-600" />,
    moderationDescription: "Sends response to approval queue for review.",
  },
];

// WISMO Agent
const SUBSCRIPTION_AGENT: AGENT_WORKFLOW_CARD_PROPS[] = [
  {
    title: "Detection",
    description:
      "AI identifies subscription pause, cancel, renew, and order date change requests.",
    icon: <Bot className="h-4 w-4 text-blue-600" />,
  },
  {
    title: "Processing",
    description:
      "Processes subscription changes like pause, cancel, renew, or order date updates.",
    icon: <CreditCard className="h-4 w-4 text-green-600" />,
  },
  {
    title: "Response",
    description:
      "Immediately processes subscription changes and confirms with customer.",
    icon: <Mail className="h-4 w-4 text-purple-600" />,
    moderationDescription: "Sends response to approval queue for review.",
  },
];

const AGENT_WORKFLOW_STEPS = {
  WISMO_AGENT,
  SUBSCRIPTION_AGENT,
};
export default AGENT_WORKFLOW_STEPS;
