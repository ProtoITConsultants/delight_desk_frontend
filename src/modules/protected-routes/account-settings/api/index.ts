import ACCOUNT_SETTINGS from "@/constants/api/account-settings";
import { apiService } from "@/lib/api-service";
import { GetUserProfileResponse, UpdateUserProfileType } from "../types";

const accountrSettingsAPIs = {
  // get user profile
  getUserProfile: () =>
    apiService.get<GetUserProfileResponse>(ACCOUNT_SETTINGS.GET_PROFILE),
  // update user profile
  updateUserProfile: (API_DATA: Partial<UpdateUserProfileType>) =>
    apiService.patch(ACCOUNT_SETTINGS.UPDATE_PROFILE, API_DATA),
};

export default accountrSettingsAPIs;
