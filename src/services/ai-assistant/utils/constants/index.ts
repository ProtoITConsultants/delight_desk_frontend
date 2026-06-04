const GET_ESCALATION_LIST = "/escalations";
const GET_SPECIFIC_ESCALATION = ({ id }: { id: string }) =>
  `/escalations/${encodeURIComponent(id)}`;
const GENERATE_AI_RESPONSE = ({ id }: { id: string }) =>
  `/escalations/${encodeURIComponent(id)}/generate-ai-response`;
const SEND_ESCALATION_RESPONSE = ({ id }: { id: string }) =>
  `/escalations/${encodeURIComponent(id)}/send-response`;
const UPDATE_ESCALATION_STATUS = ({ id }: { id: string }) =>
  `/escalations/${encodeURIComponent(id)}/status`;
const BULK_UPDATE_ESCALATION_STATUS = "/escalations/bulk/status";
const GET_EMAIL_SIGNATURE = "/escalations/email-signature";
const UPDATE_HTML_EMAIL_SIGNATURE = "/escalations/email-signature/html";
const UPDATE_STRUCTURED_EMAIL_SIGNATURE =
  "/escalations/email-signature/structured";
const GET_ESCALATION_STATISTICS = "/escalations/stats";
const GET_ESCALATION_STREAM = "/escalations/stream";

const AI_ASSISTANT_ENDPOINTS = {
  GET_ESCALATION_LIST,
  GET_SPECIFIC_ESCALATION,
  GENERATE_AI_RESPONSE,
  SEND_ESCALATION_RESPONSE,
  UPDATE_ESCALATION_STATUS,
  BULK_UPDATE_ESCALATION_STATUS,
  GET_EMAIL_SIGNATURE,
  UPDATE_HTML_EMAIL_SIGNATURE,
  UPDATE_STRUCTURED_EMAIL_SIGNATURE,
  GET_ESCALATION_STATISTICS,
  GET_ESCALATION_STREAM,
};

export default AI_ASSISTANT_ENDPOINTS;
