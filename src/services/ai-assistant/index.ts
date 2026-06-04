import { apiService } from "@/lib/api-service";
import {
  BULK_UPDATE_ESCALATION_STATUS_PARAMS,
  ESCALATION_EMAIL_SIGNATURE,
  ESCALATION_STATS,
  GENERATE_AI_RESPONSE_PARAMS,
  GENERATE_AI_RESPONSE_RESPONSE,
  GET_ESCALATION_LIST_RESPONSE,
  GET_SPECIFIC_ESCALATION_RESPONSE,
  GetEscalationListParams,
  GetEscalationStatsParams,
  SEND_ESCALATION_RESPONSE_PARAMS,
  UPDATE_ESCALATION_STATUS_PARAMS,
  UPDATE_HTML_EMAIL_SIGNATURE_PARAMS,
  UPDATE_STRUCTURED_EMAIL_SIGNATURE_PARAMS,
} from "./utils/types";
import AI_ASSISTANT_ENDPOINTS from "./utils/constants";

export class AiAssistantService {
  // Get Escalation List
  async getEscalationList(params: GetEscalationListParams) {
    const response = await apiService.get<GET_ESCALATION_LIST_RESPONSE>(
      AI_ASSISTANT_ENDPOINTS.GET_ESCALATION_LIST,
      {
        params,
      },
    );
    return response;
  }
  // Get specific escalation
  async getSpecificEscalation(id: string) {
    const response = await apiService.get<GET_SPECIFIC_ESCALATION_RESPONSE>(
      AI_ASSISTANT_ENDPOINTS.GET_SPECIFIC_ESCALATION({ id }),
    );
    return response;
  }
  // Generate AI Response
  async generateAiResponse({
    escalationId,
    instruction,
  }: GENERATE_AI_RESPONSE_PARAMS) {
    const { response } = await apiService.post<GENERATE_AI_RESPONSE_RESPONSE>(
      AI_ASSISTANT_ENDPOINTS.GENERATE_AI_RESPONSE({ id: escalationId }),
      { instruction },
    );
    return response;
  }
  // Send Escalation Response
  async sendEscalationResponse({
    escalationId,
    message,
    includeEmailSignature,
  }: SEND_ESCALATION_RESPONSE_PARAMS) {
    const response = await apiService.post(
      AI_ASSISTANT_ENDPOINTS.SEND_ESCALATION_RESPONSE({ id: escalationId }),
      { message, includeEmailSignature },
    );
    return response;
  }
  // Update Escalation Status
  async updateEscalationStatus({
    escalationId,
    status,
  }: UPDATE_ESCALATION_STATUS_PARAMS) {
    const response = await apiService.patch(
      AI_ASSISTANT_ENDPOINTS.UPDATE_ESCALATION_STATUS({ id: escalationId }),
      { status },
    );
    return response;
  }
  // Bulk update Escalation Status
  async bulkUpdateEscalationStatus({
    escalationIds,
    status,
  }: BULK_UPDATE_ESCALATION_STATUS_PARAMS) {
    const response = await apiService.patch(
      AI_ASSISTANT_ENDPOINTS.BULK_UPDATE_ESCALATION_STATUS,
      { escalationIds, status },
    );
    return response;
  }
  // Get Email Signature
  async getEmailSignature() {
    const response = await apiService.get<ESCALATION_EMAIL_SIGNATURE>(
      AI_ASSISTANT_ENDPOINTS.GET_EMAIL_SIGNATURE,
    );
    return response;
  }
  // Update HTML Email Signature
  async updateHtmlEmailSignature(params: UPDATE_HTML_EMAIL_SIGNATURE_PARAMS) {
    const response = await apiService.put(
      AI_ASSISTANT_ENDPOINTS.UPDATE_HTML_EMAIL_SIGNATURE,
      params,
    );
    return response;
  }
  // Update Structued Email Signature
  async updateStructuredEmailSignature(
    params: UPDATE_STRUCTURED_EMAIL_SIGNATURE_PARAMS,
  ) {
    const response = await apiService.put(
      AI_ASSISTANT_ENDPOINTS.UPDATE_STRUCTURED_EMAIL_SIGNATURE,
      params,
    );
    return response;
  }
  // Get Escalation Statistics
  async getEscalationStatistics(params: GetEscalationStatsParams = {}) {
    const response = await apiService.get<ESCALATION_STATS>(
      AI_ASSISTANT_ENDPOINTS.GET_ESCALATION_STATISTICS,
      { params },
    );
    return response;
  }
}
