import { SUBSCRIPTION_AGENT_ICON } from "@/constants/product-icons";
import { Bot, Mail, Stars, Truck } from "lucide-react";
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
    moderationDescription:
      "Sends response to approval queue for review before sending to customer.",
  },
];

// Subscription Agent
const SUBSCRIPTION_AGENT: AGENT_WORKFLOW_CARD_PROPS[] = [
  {
    title: "Detection",
    description:
      "AI identifies subscription pause, cancel, renew, and order date change requests.",
    icon: <SUBSCRIPTION_AGENT_ICON className="h-4 w-4 text-green-600" />,
  },
  {
    title: "Processing",
    description:
      "Processes subscription changes like pause, cancel, renew, or order date updates.",
    icon: <SUBSCRIPTION_AGENT_ICON className="h-4 w-4 text-green-600" />,
  },
  {
    title: "Response",
    description:
      "Immediately processes subscription changes and confirms with customer.",
    icon: <Mail className="h-4 w-4 text-purple-600" />,
    moderationDescription:
      "Sends response to approval queue for review before sending to customer.",
  },
];

// Product Agent
const PRODUCT_AGENT: AGENT_WORKFLOW_CARD_PROPS[] = [
  {
    title: "Detection",
    description:
      "AI identifies  questions about product features, specifications, compatibility, usage instructions, and brand information from customer emails.",
    icon: <Bot className="h-4 w-4 text-blue-600" />,
  },
  {
    title: "Product Intelligence",
    description:
      "Responds to the customer inquiries related to the product features, usage instructions, and compatibility based on your training data.",
    icon: <Stars className="h-4 w-4 text-green-600" />,
  },
  {
    title: "Automated Responses",
    description:
      "Provides instant answers to product inquiries, reducing response times and improving customer satisfaction.",
    icon: <Mail className="h-4 w-4 text-purple-600" />,
    moderationDescription:
      "Sends response to approval queue for review before sending to customer.",
  },
];

const AGENT_WORKFLOW_STEPS = {
  WISMO_AGENT,
  SUBSCRIPTION_AGENT,
  PRODUCT_AGENT,
};
export default AGENT_WORKFLOW_STEPS;
