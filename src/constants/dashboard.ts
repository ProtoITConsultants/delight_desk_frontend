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
  CheckCircle2,
} from "lucide-react";

// Time Range Options - Header
const TIME_RANGE_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "last_7_days", label: "Last 7 Days" },
  { value: "last_30_days", label: "Last 30 Days" },
  { value: "last_365_days", label: "Last 365 Days" },
];

// Stat Cards
const STAT_CARDS = [
  {
    label: "Actions Completed",
    hint: "Automated by AI agents",
    iconBgClass: "bg-emerald-50",
    iconColorClass: "text-emerald-600",
    icon: Bot,
  },
  {
    label: "Tickets Resolved",
    hint: "Closed by AI assistant",
    iconBgClass: "bg-blue-50",
    iconColorClass: "text-blue-600",
    icon: User,
  },
  {
    label: "Emails Received",
    hint: "Total inbound",
    iconBgClass: "bg-slate-100",
    iconColorClass: "text-slate-700",
    icon: Mail,
  },
  {
    label: "Time Saved",
    hint: "Estimated team hours",
    iconBgClass: "bg-purple-50",
    iconColorClass: "text-purple-600",
    icon: Clock,
  },
  {
    label: "Avg. Actions / Ticket",
    hint: "Per resolved ticket",
    iconBgClass: "bg-orange-50",
    iconColorClass: "text-orange-600",
    icon: CheckCircle2,
  },
];

// AI Agents
const AI_AGENTS = [
  {
    id: "wismo",
    name: "WISMO Agent",
    icon: Truck,
    href: "/wismo-agent",
  },
  {
    id: "promo_code",
    name: "Promo Code Agent",
    icon: Tag,
    href: "/promo-code-agent",
  },
  {
    id: "product",
    name: "Product Agent",
    icon: Brain,
    href: "/product-agent",
  },
  {
    id: "address_change",
    name: "Address Change Agent",
    icon: MapPin,
    href: "/address-change",
  },
  {
    id: "order_cancellation",
    name: "Cancellation Agent",
    icon: Package,
    href: "/order-cancellations",
  },
  {
    id: "subscription",
    name: "Subscription Agent",
    icon: Bot,
    href: "/subscription-agent",
  },
  // {
  //   id: "returns",
  //   name: "Returns Agent",
  //   icon: Package,
  //   href: "/returns-agent",
  // },
];

const DASHBOARD = {
  TIME_RANGE_OPTIONS,
  STAT_CARDS,
  AI_AGENTS,
};

export default DASHBOARD;
