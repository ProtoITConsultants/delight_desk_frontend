import {
  LayoutDashboard,
  Satellite,
  Bot,
  CheckCircle,
  Clock,
  Settings,
  Brain,
  Package,
  Globe,
  Tag,
  MapPin,
  BarChart3,
  Users,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Primary navigation - frequently used features
const PRIMARY_NAVIGATION = [
  { name: "Dashboard", href: "/dashboard", icon: Satellite },
  { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
  {
    name: "Quick Actions",
    href: "/quick-actions",
    icon: LayoutDashboard,
    isDisabled: true,
  },
  { name: "AI Agents", href: "#", icon: Users }, // Dropdown menu, no direct route
  { name: "AI Team Center", href: "/ai-training", icon: Brain },
  { name: "Approval Queue", href: "/approval-queue", icon: CheckCircle },
];

export type AiAgentNavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  comingSoon?: boolean;
};

// AI Agents submenu navigation
const AI_AGENTS_NAVIGATION: AiAgentNavItem[] = [
  { name: "WISMO Agent", href: "/wismo-agent", icon: Truck },
  {
    name: "Subscription Agent",
    href: "/subscription-agent",
    icon: Bot,
    comingSoon: true,
  },
  { name: "Product Agent", href: "/product-agent", icon: Brain },
  {
    name: "Returns Agent",
    href: "/returns-agent",
    icon: Package,
    comingSoon: true,
  },
  { name: "Promo Code Agent", href: "/promo-code-agent", icon: Tag },
  { name: "Address Change Agent", href: "/address-change-agent", icon: MapPin },
  {
    name: "Cancellation Agent",
    href: "/order-cancellation-agent",
    icon: Package,
  },
];

// Settings navigation - setup/admin/maintenance features
const SETTINGS_NAVIGATION = [
  { name: "WISMO Widget", href: "/wismo-widget", icon: Globe },
  { name: "AI Performance", href: "/ai-performance", icon: BarChart3 },
  { name: "Activity Log", href: "/activity-log", icon: Clock },
  { name: "Connections", href: "/connections", icon: Settings },
];

const SIDEBAR_CONTENT = {
  PRIMARY_NAVIGATION,
  AI_AGENTS_NAVIGATION,
  SETTINGS_NAVIGATION,
};

export default SIDEBAR_CONTENT;
