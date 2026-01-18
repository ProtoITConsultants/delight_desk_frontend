const GET_ALL_AGENTS_SETTINGS_URL = "/agents";
const UPDATE_AGENT_SETTINGS_URL = ({ agentId }: { agentId: string }) =>
  `/agents/${encodeURIComponent(agentId)}`;

// Wismo Agent Test Endpoint
const TEST_WISMO_AGENT_URL = "/agents/wismo/preview";

const AI_AGENTS_SETTINGS = {
  GET_ALL_AGENTS_SETTINGS_URL,
  UPDATE_AGENT_SETTINGS_URL,
  TEST_WISMO_AGENT_URL,
};

export default AI_AGENTS_SETTINGS;
