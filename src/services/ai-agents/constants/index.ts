const GET_ALL_AGENTS_SETTINGS_URL = "/agents";
const UPDATE_AGENT_SETTINGS_URL = ({ agentId }: { agentId: string }) =>
  `/agents/${encodeURIComponent(agentId)}`;

// Wismo Agent Test Endpoint
const TEST_WISMO_AGENT_URL = "/agents/wismo/preview";

// Product Agent Test Endpoint
const TEST_PRODUCT_AGENT_URL = "/agents/product/preview";

// Fulfillment Method Settings Endpoint
const FULFILLMENT_METHOD_SETTINGS_URL = "/system-settings/fulfillment-method";

const AI_AGENTS_SETTINGS = {
  GET_ALL_AGENTS_SETTINGS_URL,
  UPDATE_AGENT_SETTINGS_URL,
  TEST_WISMO_AGENT_URL,
  TEST_PRODUCT_AGENT_URL,
  FULFILLMENT_METHOD_SETTINGS_URL,
};

export default AI_AGENTS_SETTINGS;
