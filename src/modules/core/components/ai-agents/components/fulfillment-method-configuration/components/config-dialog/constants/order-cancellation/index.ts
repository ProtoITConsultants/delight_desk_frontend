const ORDER_CANCELLATION_DIALOG_CONFIG = {
  self_fulfillment: {
    title: "Self-Fulfillment Setup",
    description: "Configure automated cancellations for self-fulfilled orders",
    howItWorksSteps: [
      {
        heading: "📧 AI detects cancellation request",
        description:
          "Automatically classifies email and extracts order information.",
      },
      {
        heading: "🛒 Checks order eligibility",
        description:
          "Looks up order in WooCommerce, verifies it hasn't been fulfilled yet.",
      },
      {
        heading: "✉️ Sends appropriate response",
        description:
          '"Cancellation processed" if eligible OR "Cannot cancel" if already fulfilled.',
      },
      {
        heading: "📋 Updates order status",
        description:
          "Marks order as cancelled in WooCommerce to prevent fulfillment.",
      },
      {
        heading: "✅ Processes refund",
        description: "Automatically processes full refund through WooCommerce.",
      },
      {
        heading: "🎯 Sends confirmation",
        description: "Confirms cancellation with refund timeline and details.",
      },
    ],
    faqs: [
      {
        question: "How does it know if an order can be cancelled?",
        answer:
          'The AI checks the order status in WooCommerce. Orders marked as "processing" or "pending" can be cancelled, while "shipped" or "completed" orders cannot.',
      },
      {
        question: "What about partial fulfillments?",
        answer:
          "The AI detects partial shipments and handles them appropriately - cancelling unfulfilled items and processing partial refunds as needed.",
      },
      {
        question: "How fast are the responses?",
        answer:
          "Customers receive confirmation within 30-60 seconds. The entire process from request to refund completion typically takes 2-3 minutes.",
      },
      {
        question: "What if something goes wrong?",
        answer:
          "All automated actions are logged and can be reversed. Failed automations are escalated to human review automatically.",
      },
    ],
  },
  warehouse_email: {
    title: "Warehouse Email Setup",
    description:
      "Configure warehouse coordination for automated order cancellations",
    howItWorksSteps: [
      {
        heading: "📧 AI detects cancellation request",
        description:
          "Automatically classifies email and extracts order information.",
      },
      {
        heading: "🛒 Checks order eligibility",
        description: "Looks up order in WooCommerce, verifies shipping status.",
      },
      {
        heading: "✉️ Sends appropriate response",
        description:
          '"We\'re on it — checking with warehouse" if eligible OR "Cannot cancel" if not eligible',
      },
      {
        heading: "📫 Coordinates with warehouse",
        description:
          "Emails warehouse team for confirmation if order hasn't shipped.",
      },
      {
        heading: "✅ Processes cancellation & refund",
        description:
          "Automatically cancels order in WooCommerce and processes full refund.",
      },
      {
        heading: "🎯 Sends final notification",
        description:
          "Confirms successful cancellation with refund details OR explains if too late.",
      },
    ],
    faqs: [
      {
        question: "What's the cancellation time window?",
        answer:
          "Weekday orders: 24 hours. Friday after 12 PM + weekend orders: eligible until Monday 12 PM. Beyond this window, the AI offers return assistance and exits - human takes over for return processing.",
      },
      {
        question: "How fast does the customer get their first response?",
        answer:
          'Within 30-60 seconds. The AI immediately sends "We\'re on it" while working on the cancellation in the background.',
      },
      {
        question: "What if the warehouse doesn't respond?",
        answer:
          "Professional 3PLs are very reliable with cancellation requests (it's their business). If no response in 8 hours, it escalates to manual handling. This is extremely rare.",
      },
      {
        question: "Can customers tell this is automated?",
        answer:
          'All emails include "Automated by DelightDesk AI for expediency. A human is monitoring." to set clear expectations.',
      },
    ],
  },
  shipbob: {
    title: "ShipBob Integration Setup",
    description:
      "Configure ShipBob API integration for automated order cancellations",
    howItWorksSteps: [
      {
        heading: "📧 AI detects cancellation request",
        description:
          "Automatically classifies email and extracts order information.",
      },
      {
        heading: "🛒 Checks order eligibility",
        description:
          "Looks up order in WooCommerce and ShipBob, verifies shipping status.",
      },
      {
        heading: "✉️ Sends appropriate response",
        description:
          '"We\'re processing your cancellation" if eligible OR "Cannot cancel" if shipped.',
      },
      {
        heading: "📦 Cancels shipment via ShipBob API",
        description:
          "Automatically cancels unfulfilled orders directly in ShipBob.",
      },
      {
        heading: "✅ Processes cancellation & refund",
        description:
          "Automatically cancels order in WooCommerce and processes full refund.",
      },
      {
        heading: "🎯 Sends final notification",
        description: "Confirms successful cancellation with refund details.",
      },
    ],
    faqs: [
      {
        question: "How does ShipBob integration work?",
        answer:
          "The AI connects directly to ShipBob's API to check fulfillment status and cancel orders before they ship. This eliminates delays and manual coordination.",
      },
      {
        question: "What if an order has already shipped?",
        answer:
          "The AI automatically detects shipped orders and responds with return instructions instead of cancellation. No manual intervention needed.",
      },
      {
        question: "Is this secure?",
        answer:
          "Yes, we use OAuth 2.0 authentication with ShipBob. Your credentials are encrypted and we only access order cancellation functions.",
      },
      {
        question: "How fast are cancellations processed?",
        answer:
          "Typically within 2-3 minutes. The API connection allows instant order cancellation without waiting for human coordination.",
      },
    ],
  },
  shipstation: {
    title: "ShipStation Integration Setup",
    description:
      "Configure ShipStation API integration for automated order cancellations",
    howItWorksSteps: [
      {
        heading: "📧 AI detects cancellation request",
        description:
          "Automatically classifies email and extracts order information.",
      },
      {
        heading: "🛒 Checks order eligibility",
        description:
          "Looks up order in WooCommerce and ShipStation, verifies shipping status.",
      },
      {
        heading: "✉️ Sends appropriate response",
        description:
          '"We\'re processing your cancellation" if eligible OR "Cannot cancel" if shipped.',
      },
      {
        heading: "📦 Cancels shipment via ShipStation API",
        description:
          "Automatically cancels unfulfilled orders directly in ShipStation.",
      },
      {
        heading: "✅ Processes cancellation & refund",
        description:
          "Cancels order in WooCommerce and processes full refund automatically.",
      },
      {
        heading: "🎯 Sends confirmation",
        description: "Confirms successful cancellation with refund details.",
      },
    ],
    faqs: [
      {
        question: "When will ShipStation integration be available?",
        answer:
          "We're working on ShipStation API integration. In the meantime, consider using ShipBob integration or warehouse email coordination for automated cancellations.",
      },
      {
        question: "How will it compare to other methods?",
        answer:
          "Similar to ShipBob - direct API integration for instant cancellations without manual coordination. Very fast and reliable.",
      },
      {
        question: "What should I use for now?",
        answer:
          "If you use ShipBob, choose that integration. Otherwise, warehouse email coordination works excellently with any 3PL or internal fulfillment team.",
      },
    ],
  },
};

export default ORDER_CANCELLATION_DIALOG_CONFIG;
