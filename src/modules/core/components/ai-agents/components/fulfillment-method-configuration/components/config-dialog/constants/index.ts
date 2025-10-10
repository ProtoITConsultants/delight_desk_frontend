const DIALOG_CONFIG = {
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
  },
};

export default DIALOG_CONFIG;
