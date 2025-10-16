// WISMO Agent
const WISMO_AGENT = [
  'Order status inquiries ("Where is my order?")',
  "Shipping information requests",
  "Delivery updates and tracking",
  "Package location questions",
];

// Subscription Agent
const SUBSCRIPTION_AGENT = [
  "Pause subscription",
  "Cancel subscription",
  "Renew subscription",
  "Change next order date",
];

const WHAT_AGENT_HANDLES = {
  WISMO_AGENT,
  SUBSCRIPTION_AGENT,
};

export default WHAT_AGENT_HANDLES;
