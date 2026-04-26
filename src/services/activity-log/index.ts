import { apiService } from "@/lib/api-service";
import ACTIVITY_LOG_ENDPOINTS from "./constants";
import type {
  GET_ACTIVITY_LOG_PARAMS,
  GET_ACTIVITY_LOG_RESPONSE,
} from "./types";

export type {
  ActivityLogItem,
  ActivityLogItemStatus,
  GET_ACTIVITY_LOG_PARAMS,
  GET_ACTIVITY_LOG_RESPONSE,
} from "./types";

export class ActivityLogService {
  async getActivityLog(params: GET_ACTIVITY_LOG_PARAMS) {
    const response = await apiService.get<GET_ACTIVITY_LOG_RESPONSE>(
      ACTIVITY_LOG_ENDPOINTS.GET_ACTIVITY_LOG,
      { params },
    );
    return response;
  }
}
