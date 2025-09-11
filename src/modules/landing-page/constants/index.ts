import {
  Brain,
  CheckCircle,
  Heart,
  Mail,
  RefreshCw,
  Send,
  Shield,
  Zap,
} from "lucide-react";

// Order Change Automation - Section
const ORDER_CHANGE_STEPS = [
  {
    Icon: Mail,
    heading: "Request Received",
    subheading: "Customer email arrives",
    time: "0s",
    className: "bg-purple-500",
  },
  {
    Icon: Brain,
    heading: "AI Processing",
    subheading: "Intent analyzed & extracted",
    time: "1s",
    className: "bg-blue-500",
  },
  {
    Icon: Shield,
    heading: "Validation",
    subheading: "Eligibility & rules checked",
    time: "2s",
    className: "bg-indigo-500",
  },
  {
    Icon: Send,
    heading: "3PL Email",
    subheading: "Warehouse notified automatically",
    time: "3s",
    className: "bg-cyan-500",
  },

  {
    Icon: RefreshCw,
    heading: "System Update",
    subheading: "Order status synchronized",
    time: "5s",
    className: "bg-teal-500",
  },
  {
    Icon: CheckCircle,
    heading: "Customer Notified",
    subheading: "Confirmation sent & complete",
    time: "6s",
    className: "bg-green-500",
  },
];
const ORDER_CHANGE_CARDS = [
  {
    heading: "Cancellations",
    subheading: "Stop shipments & process refunds",
  },
  {
    heading: "Address Changes",
    subheading: "Update shipping before dispatch",
  },
  {
    heading: "Order Modifications",
    subheading: "Add, remove, or change items",
  },
];

// Rapid Resolution - Section
const RAPID_RESOLUTION_FEATURES = [
  {
    Icon: Brain,
    title: "Context-Aware AI Agent Responses",
    description:
      "The Delight Desk Agent reads entire conversation threads, customer history, and order details to craft genuinely helpful responses.",
    className: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    Icon: Zap,
    title: "One-Click Quick Actions",
    description:
      "Process refunds, send tracking info, and handle complex requests with single clicks. Turn 10-minute tasks into 10-second solutions.",
    className: "bg-gradient-to-br from-blue-500 to-purple-500",
  },
  {
    Icon: Heart,
    title: "Customers That Actually Thank You",
    description:
      "Instant solutions with personalized responses turn frustrated customers into advocates.",
    className: "bg-gradient-to-br from-green-500 to-blue-500",
  },
];

const LANDING_PAGE_CONSTANTS = {
  // Order Change Automation - Section
  ORDER_CHANGE_STEPS,
  ORDER_CHANGE_CARDS,
  // Rapid Resolution - Section
  RAPID_RESOLUTION_FEATURES,
};

export { LANDING_PAGE_CONSTANTS };
