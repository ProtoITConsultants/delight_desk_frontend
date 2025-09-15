import { FAQS_TYPE } from "@/types/landing-page";
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

// FAQs - Section
const FAQs: FAQS_TYPE[] = [
  {
    _id: 1,
    question: "What if I don't trust the AI agent?",
    answer:
      "That's why we have an approval queue. You have full control - you can manually approve every single automation before it processes, for as long as you want. Keep it on forever or turn it off when you're ready. You'll save time either way.",
  },
  {
    _id: 2,
    question: "Do I continue to work in my existing inbox?",
    answer:
      "Yes, because that's where you're comfortable and efficient. We're not forcing you into a helpdesk platform. We're just giving you inbox superpowers.",
  },
  {
    _id: 3,
    question: "What if customers realize they're talking to an AI agent?",
    answer:
      "We're completely transparent - every email clearly identifies it's from the AI agent. Customers actually prefer this because it resolves their issues instantly without waiting. Fast problem resolution matters more than who provides it.",
  },
  {
    _id: 4,
    question: "Will this replace my customer service team?",
    answer:
      " No - it amplifies them. AI handles the routine 80% (order status, simple refunds) so your team can focus on complex issues, VIP customers, and relationship building.",
  },
  {
    _id: 5,
    question: "What if the AI makes a mistake with a customer?",
    answer:
      "Our AI only handles transactional requests it's 98%+ confident about. Complex or unclear requests are automatically escalated to your team.",
  },
  {
    _id: 6,
    question: "How do I know it won't hurt my brand?",
    answer:
      "Customers prefer fast resolution over waiting. The approval queue lets you review everything initially, and faster response times typically improve customer satisfaction.",
  },
  {
    _id: 7,
    question: "What if my business is too unique or complex?",
    answer:
      " We integrate with WooCommerce, Shopify, and major email providers. The AI learns your specific products, policies, and common issues. Unique requests automatically go to your team.",
  },
  {
    _id: 8,
    question: "Is this just another chatbot?",
    answer:
      "No - this processes actual email tickets in your existing workflow. No chatbot widget, no customer behavior change required. It works with Gmail, Outlook, and your current setup.",
  },
  {
    _id: 9,
    question: "What about data security?",
    answer:
      "Enterprise-grade security with encrypted data transmission. We never store sensitive customer information permanently - only process it to generate responses.",
  },
  {
    _id: 10,
    question:
      "Do the emails get sent out from my company or from Delight Desk?",
    answer:
      "They all go out from your company&apos;s email address, professionally formatted, and with language clarifying that it is AI and your company is using it in order to benefit its customers. Customers can reply back anytime and it will escalate to a human.",
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
  // FAQs - Section
  FAQs,
};

export { LANDING_PAGE_CONSTANTS };
