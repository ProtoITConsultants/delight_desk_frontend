const ADDRESS_CHANGE_DIALOG_CONFIG = {
  self_fulfillment: {
    title: "Self-Fulfillment Setup",
    description:
      "Configure automated address changes for self-fulfilled orders",
    howItWorksSteps: [
      {
        heading: "📧 AI detects address change request",
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
          '"Address Chnage processed" if eligible OR "Cannot change address" if already fulfilled.',
      },
      {
        heading: "📋 Updates order address",
        description: "Changes order address in WooCommerce to new address.",
      },
      {
        heading: "🎯 Sends confirmation",
        description: "Confirms address change to customer via email.",
      },
    ],
    faqs: [
      {
        question: "How does it know if an address can be changed?",
        answer:
          'The AI checks the order status in WooCommerce. Address of orders marked as "processing" or "pending" can be updated, while "shipped" or "completed" orders cannot.',
      },
      {
        question: "How fast are the responses?",
        answer:
          "Customers receive confirmation within 30-60 seconds. The entire process from request to address change completion typically takes 2-3 minutes.",
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
      "Configure warehouse coordination for automated address changes",
    howItWorksSteps: [
      {
        heading: "📧 AI detects address change request",
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
          '"We\'re on it — checking with warehouse" if eligible OR "Cannot change address" if not eligible',
      },
      {
        heading: "📫 Coordinates with warehouse",
        description:
          "Emails warehouse team for confirmation if order hasn't shipped.",
      },
      {
        heading: "✅ Processes address change",
        description:
          "Ask warehouse to update shipping address and update the address in WooCommerce automatically.",
      },
      {
        heading: "🎯 Sends final notification",
        description:
          "Confirms successful address change to customer OR explains if too late.",
      },
    ],
    faqs: [
      {
        question: "What's the address change time window?",
        answer:
          "Weekday orders: 24 hours. Friday after 12 PM + weekend orders: eligible until Monday 12 PM. Beyond this window, the AI offers return assistance and exits - human takes over for return processing.",
      },
      {
        question: "How fast does the customer get their first response?",
        answer:
          'Within 30-60 seconds. The AI immediately sends "We\'re on it" while working on the address change in the background.',
      },
      {
        question: "What if the warehouse doesn't respond?",
        answer:
          "Professional 3PLs are very reliable with address change requests (it's their business). If no response in 8 hours, it escalates to manual handling. This is extremely rare.",
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
      "Configure ShipBob API integration for automated address changes",
    howItWorksSteps: [
      {
        heading: "📧 AI detects address change request",
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
          '"We\'re processing your address change" if eligible OR "Cannot change address" if shipped.',
      },
      {
        heading: "📦 Change shipment address via ShipBob API",
        description:
          "Automatically changes address for unfulfilled orders directly in ShipBob.",
      },
      {
        heading: "✅ Updates order address",
        description: "Automatically updates order address in WooCommerce.",
      },
      {
        heading: "🎯 Sends final notification",
        description: "Confirms successful address change to customer.",
      },
    ],
    faqs: [
      {
        question: "How does ShipBob integration work?",
        answer:
          "The AI connects directly to ShipBob's API to check fulfillment status and change order's address before they ship. This eliminates delays and manual coordination.",
      },
      {
        question: "What if an order has already shipped?",
        answer:
          "The AI automatically detects shipped orders and responds with return instructions instead of cancellation. No manual intervention needed.",
      },
      {
        question: "Is this secure?",
        answer:
          "Yes, we use OAuth 2.0 authentication with ShipBob. Your credentials are encrypted and we only access address change functions.",
      },
      {
        question: "How fast are address changes processed?",
        answer:
          "Typically within 2-3 minutes. The API connection allows instant address change without waiting for human coordination.",
      },
    ],
  },
};

export default ADDRESS_CHANGE_DIALOG_CONFIG;
