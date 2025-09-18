import {
  Bot,
  User,
  Clock,
  Mail,
  Truck,
  Package,
  Tag,
  Brain,
  MapPin,
} from "lucide-react";

// Time Range Options - Header
const TIME_RANGE_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "7days", label: "Last 7 Days" },
  { value: "30days", label: "Last 30 Days" },
  { value: "365days", label: "Last 365 Days" },
];

// Stat Cards
const STAT_CARDS = [
  {
    label: "AI Agent Actions Completed",
    value: "0",
    colorClass: "text-green-600",
    icon: Bot,
  },
  {
    label: "AI Assistant Tickets Resolved",
    value: "12",
    colorClass: "text-blue-600",
    icon: User,
  },
  {
    label: "Total Emails Received",
    value: "1,234",
    colorClass: "text-gray-900",
    icon: Mail,
  },
  {
    label: "Time Saved",
    value: "1,234",
    colorClass: "text-purple-600",
    icon: Clock,
  },
];

// AI Agents
const AI_AGENTS = [
  {
    id: "wismo-agent",
    name: "WISMO Agent",
    icon: Truck,
    href: "/wismo-agent",
  },
  {
    id: "subscription-agent",
    name: "Subscription Agent",
    icon: Bot,
    href: "/subscription-agent",
  },
  {
    id: "returns-agent",
    name: "Returns Agent",
    icon: Package,
    href: "/returns-agent",
  },
  {
    id: "promo-code-agent",
    name: "Promo Code Agent",
    icon: Tag,
    href: "/promo-code-agent",
  },
  {
    id: "product-agent",
    name: "Product Agent",
    icon: Brain,
    href: "/product-agent",
  },
  {
    id: "address-change-agent",
    name: "Address Change Agent",
    icon: MapPin,
    href: "/address-change",
  },
  {
    id: "cancellation-agent",
    name: "Cancellation Agent",
    icon: Package,
    href: "/order-cancellations",
  },
];

const DASHBOARD = {
  TIME_RANGE_OPTIONS,
  STAT_CARDS,
  AI_AGENTS,
};

export default DASHBOARD;
