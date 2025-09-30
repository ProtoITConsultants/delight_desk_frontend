import { FAQ_TYPE } from "../types";

const FAQs_DATA: FAQ_TYPE[] = [
  {
    id: "getting-started-1",
    question: "How do I connect my email account?",
    answer:
      "Go to Settings > Connections and click 'Connect Gmail' or 'Connect Outlook'. You'll be redirected to sign in with your email provider. Once connected, Delight Desk can read and respond to your customer emails automatically.",
    category: "Getting Started",
    tags: ["email", "setup", "gmail", "outlook"],
  },
  {
    id: "getting-started-2",
    question: "How do I connect my WooCommerce or Shopify store?",
    answer:
      "In Settings > Connections, click 'Connect WooCommerce' or 'Connect Shopify'. For WooCommerce, you'll need your store URL and API credentials. For Shopify, you'll authorize through Shopify's OAuth system. This lets Delight Desk look up orders and customer information automatically.",
    category: "Getting Started",
    tags: ["woocommerce", "shopify", "store", "orders"],
  },
  {
    id: "getting-started-3",
    question: "Why can't I see any emails in my dashboard?",
    answer:
      "Make sure you've connected your email account first. If connected, check that you have customer emails in your inbox. Delight Desk only shows customer service emails, not personal messages. If you're still not seeing emails, try clicking the refresh button or contact support.",
    category: "Getting Started",
    tags: ["emails", "dashboard", "empty", "refresh"],
  },
  {
    id: "automation-1",
    question: "How do I set up automated responses?",
    answer:
      "Go to Auto-Responders in your dashboard. Click 'Create New Rule' and set up conditions (like email contains 'refund' or 'order status'). Then choose what action to take - you can send a template response, escalate to human review, or trigger a quick action like issuing a refund.",
    category: "Automation",
    tags: ["automation", "responses", "rules", "templates"],
  },
  {
    id: "automation-2",
    question: "What are Quick Actions and how do I use them?",
    answer:
      "Quick Actions are one-click solutions for common customer requests. When viewing an email, you'll see buttons like 'Issue Refund', 'Provide Tracking', or 'Send Order Status'. Click these to automatically handle the request without typing a response.",
    category: "Automation",
    tags: ["quick actions", "one-click", "refunds", "tracking"],
  },
  {
    id: "automation-3",
    question: "How does the AI classify my emails?",
    answer:
      "Delight Desk's AI reads each email and categorizes it (like 'Refund Request', 'Order Status', 'Product Question'). This happens automatically and helps route emails to the right automation rules. You can see the category in the email details.",
    category: "Automation",
    tags: ["ai", "classification", "categories", "automatic"],
  },
  {
    id: "orders-1",
    question: "Why can't Delight Desk find my customer's order?",
    answer:
      "Make sure your store is connected properly. The customer's email in the support request must match the email used for the order. If they used a different email or made the order as a guest, you might need to search by order number or customer name instead.",
    category: "Order Management",
    tags: ["orders", "lookup", "customer", "email", "guest"],
  },
  {
    id: "orders-2",
    question: "How do I issue a refund through Delight Desk?",
    answer:
      "When viewing a customer email, click the 'Issue Refund' quick action. Delight Desk will look up their recent orders and let you select which one to refund. You can choose full or partial refunds. The refund is processed through your connected store (WooCommerce/Shopify).",
    category: "Order Management",
    tags: ["refunds", "partial", "full", "processing"],
  },
  {
    id: "orders-3",
    question: "Can I provide tracking information automatically?",
    answer:
      "Yes! Delight Desk integrates with AfterShip to provide real-time tracking updates. When a customer asks about their order status, use the 'Provide Tracking' quick action and Delight Desk will automatically include the latest tracking information in your response.",
    category: "Order Management",
    tags: ["tracking", "aftership", "shipping", "status"],
  },
  {
    id: "escalation-1",
    question: "What is the Escalation Queue?",
    answer:
      "The Escalation Queue holds emails that need human review - either because the AI wasn't confident in how to respond, or because you've set up rules to escalate certain types of emails. Review these emails and either handle them manually or create automation rules for similar future emails.",
    category: "Escalation & Review",
    tags: ["escalation", "queue", "human review", "manual"],
  },
  {
    id: "escalation-2",
    question: "How do I handle emails that were escalated?",
    answer:
      "In the Escalation Queue, click on any email to review it. You can write a manual response, use quick actions, or mark it as resolved. If you see a pattern, consider creating an automation rule so similar emails are handled automatically in the future.",
    category: "Escalation & Review",
    tags: ["handle", "manual response", "resolve", "patterns"],
  },
  {
    id: "billing-1",
    question: "How does the 7-day free trial work?",
    answer:
      "Your 7-day free trial starts when you sign up and includes full access to all Delight Desk features. You can connect unlimited email accounts and stores, set up automations, and process up to 100 emails. No credit card required to start. You'll get reminder emails as your trial approaches the end.",
    category: "Billing & Plans",
    tags: ["trial", "free", "7-day", "features", "credit card"],
  },
  {
    id: "billing-2",
    question: "What happens when my trial ends?",
    answer:
      "When your 7-day trial ends, you'll need to choose a paid plan to continue using Delight Desk. Your automation rules and settings are saved, but email processing will be paused until you upgrade. You can upgrade anytime during or after your trial.",
    category: "Billing & Plans",
    tags: ["trial end", "upgrade", "paid plans", "pause"],
  },
  {
    id: "billing-3",
    question: "Can I change my plan later?",
    answer:
      "Yes! You can upgrade or downgrade your plan anytime in Account Settings. Changes take effect immediately, and billing is prorated. If you downgrade, you'll keep access to premium features until the end of your current billing period.",
    category: "Billing & Plans",
    tags: ["change plan", "upgrade", "downgrade", "prorated"],
  },
  {
    id: "troubleshooting-1",
    question: "My emails aren't being processed automatically",
    answer:
      "Check these things: 1) Is your email account connected? 2) Are your automation rules enabled? 3) Do the emails match your automation conditions? If everything looks correct, try refreshing your browser or contact support.",
    category: "Troubleshooting",
    tags: ["not working", "processing", "automation"],
  },
  {
    id: "troubleshooting-2",
    question: "I'm getting an error when trying to connect my store",
    answer:
      "For WooCommerce: Ensure your store URL is correct and your API keys have the right permissions. For Shopify: Make sure you're logged into the correct Shopify account. If you're still having issues, try disconnecting and reconnecting, or contact support with the specific error message.",
    category: "Troubleshooting",
    tags: ["connection error", "store", "api keys", "permissions"],
  },
  {
    id: "troubleshooting-3",
    question: "Quick Actions aren't working properly",
    answer:
      "Quick Actions require a connected store to work. Make sure your WooCommerce or Shopify store is connected and the customer's order exists in your system. If the order is very old or from a different email address, Quick Actions might not find it automatically.",
    category: "Troubleshooting",
    tags: ["quick actions", "not working", "store connection", "order lookup"],
  },
  {
    id: "security-1",
    question: "Is my customer data secure?",
    answer:
      "Yes! Delight Desk uses industry-standard encryption for all data transmission and storage. We only access the minimum email and order data needed to provide our service. We never store customer payment information - refunds are processed directly through your store's secure payment system.",
    category: "Security & Privacy",
    tags: ["security", "encryption", "data", "privacy", "payment"],
  },
  {
    id: "security-2",
    question: "What email permissions does Delight Desk need?",
    answer:
      "Delight Desk needs read access to identify customer emails and write access to send responses. We only read emails that appear to be customer service related - personal emails are ignored. You can revoke access anytime through your email provider's security settings.",
    category: "Security & Privacy",
    tags: ["permissions", "email access", "read", "write", "revoke"],
  },
  {
    id: "advanced-1",
    question: "Can I customize the email templates?",
    answer:
      "Yes! In Auto-Responders, you can create custom email templates with variables like customer name, order number, and tracking information. Use simple variables like {{customer_name}} and {{order_number}} to personalize your responses automatically.",
    category: "Advanced Features",
    tags: ["templates", "customize", "variables", "personalization"],
  },
  {
    id: "advanced-2",
    question: "How do I set up different rules for different types of emails?",
    answer:
      "In Auto-Responders, create multiple rules with different conditions. For example: one rule for emails containing 'refund' that automatically offers a refund, and another for 'tracking' that provides shipping updates. You can have unlimited rules and they're processed in priority order.",
    category: "Advanced Features",
    tags: ["multiple rules", "conditions", "priority", "unlimited"],
  },
];

// Categories for Sidebar (Filtering)
const FAQs_CATEGORIES = [
  "All",
  ...Array.from(new Set(FAQs_DATA.map((faq) => faq.category))),
];

export { FAQs_DATA, FAQs_CATEGORIES };
