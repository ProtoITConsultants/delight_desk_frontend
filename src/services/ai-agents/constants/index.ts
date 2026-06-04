const GET_ALL_AGENTS_SETTINGS_URL = "/agents";
const UPDATE_AGENT_SETTINGS_URL = ({ agentId }: { agentId: string }) =>
  `/agents/${encodeURIComponent(agentId)}`;

// Wismo Agent Test Endpoint
const TEST_WISMO_AGENT_URL = "/agents/wismo/preview";

// Product Agent Test Endpoint
const TEST_PRODUCT_AGENT_URL = "/agents/product/preview";

// Fulfillment Method Settings Endpoint
const FULFILLMENT_METHOD_SETTINGS_URL = "/system-settings/fulfillment-method";

// Promo code agent — configurations
const GET_PROMO_CODE_CONFIGURATIONS = "/agents/promo-code/configurations";
const PROMO_CODE_CONFIGURATION_BY_ID = ({ configId }: { configId: string }) =>
  `/agents/promo-code/configurations/${encodeURIComponent(configId)}`;
const SYNC_PROMO_CODE_CONFIGURATIONS = "/agents/promo-code/configurations/sync";

const AI_AGENTS_SETTINGS = {
  GET_ALL_AGENTS_SETTINGS_URL,
  UPDATE_AGENT_SETTINGS_URL,
  TEST_WISMO_AGENT_URL,
  TEST_PRODUCT_AGENT_URL,
  FULFILLMENT_METHOD_SETTINGS_URL,
  GET_PROMO_CODE_CONFIGURATIONS,
  PROMO_CODE_CONFIGURATION_BY_ID,
  SYNC_PROMO_CODE_CONFIGURATIONS,
};

export default AI_AGENTS_SETTINGS;
