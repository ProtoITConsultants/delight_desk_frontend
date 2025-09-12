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

// Testimonials - Section
const TESTIMONIALS = [
  {
    rating: 5,
    feedback:
      "I am certain our customer satisfaction has improved after implementing Delight Desk. Customers are blown away by instant responses.",
    name: "Marie Santana",
    role: "Customer Success Manager",
    company: "Wellness Box Co.",
    avatarUrl:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    companyColor: "text-green-400",
  },
  {
    rating: 5,
    feedback:
      "My team loves the dashboard—they can instantly look up any customer, process refunds, manage subscriptions, all without the dreaded WooCommerce login.",
    name: "Mike Torres",
    role: "Founder",
    company: "Coffee Monthly",
    avatarUrl:
      "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    companyColor: "text-blue-400",
  },
  {
    rating: 5,
    feedback:
      "The promo code refund automation is a game-changer. Customers used to wait days for responses, now they get instant refunds and are so grateful.",
    name: "Jessica Park",
    role: "E-commerce Manager",
    company: "BeautyBuzz",
    avatarUrl:
      "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    companyColor: "text-pink-400",
  },
  {
    rating: 5,
    feedback:
      "Our churn rate dropped 28% since launch. When customers can instantly pause subscriptions instead of waiting for support, they don't cancel out of frustration.",
    name: "David Blum",
    role: "Operations Director",
    company: "HealthyMeals Daily",
    avatarUrl:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    companyColor: "text-emerald-400",
  },
  {
    rating: 5,
    feedback:
      "I was skeptical about AI customer service, but this is different. We've gone from drowning in tickets to handling 3x more customers.",
    name: "Emma Rodriguez",
    role: "CEO",
    company: "PetBox Plus",
    avatarUrl:
      "https://images.pexels.com/photos/3786525/pexels-photo-3786525.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    companyColor: "text-yellow-400",
  },
  {
    rating: 5,
    feedback:
      "The subscription management automation saved us countless hours. No more waiting for human intervention, no more annoyance for us!",
    name: "Ben Harmon",
    role: "Operations Manager",
    company: "FreshBox Delivery",
    avatarUrl:
      "https://images.pexels.com/photos/3789888/pexels-photo-3789888.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    companyColor: "text-indigo-400",
  },
];

const LANDING_PAGE_CONSTANTS = {
  // Order Change Automation - Section
  ORDER_CHANGE_STEPS,
  ORDER_CHANGE_CARDS,
  // Rapid Resolution - Section
  RAPID_RESOLUTION_FEATURES,
  // Testimonials - Section
  TESTIMONIALS,
};

export { LANDING_PAGE_CONSTANTS };
