import { apiService } from "@/lib/api-service";
import DASHBOARD_ENDPOINTS from "./constants";
import {
  GET_DASHBOARD_ANALYTICS_PARAMS,
  GET_DASHBOARD_ANALYTICS_RESPONSE,
  NavBadgeCounts,
} from "./types";

export class DashboardService {
  async getDashboardAnalytics(params: GET_DASHBOARD_ANALYTICS_PARAMS) {
    const response = await apiService.get<GET_DASHBOARD_ANALYTICS_RESPONSE>(
      DASHBOARD_ENDPOINTS.GET_DASHBOARD_ANALYTICS,
      { params },
    );

    return response;
  }

  async getNavBadgeCounts() {
    return apiService.get<NavBadgeCounts>(
      DASHBOARD_ENDPOINTS.GET_NAV_BADGE_COUNTS,
    );
  }
}
