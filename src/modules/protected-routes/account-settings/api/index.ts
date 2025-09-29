import ACCOUNT_SETTINGS from "@/constants/api/account-settings";
import { apiService } from "@/lib/api-service";
import {
  ChangePasswordType,
  GetUserProfileResponse,
  UpdateUserProfileType,
} from "../types";

const accountrSettingsAPIs = {
  // get user profile
  getUserProfile: () =>
    apiService.get<GetUserProfileResponse>(ACCOUNT_SETTINGS.GET_PROFILE),
  // update user profile
  updateUserProfile: (API_DATA: Partial<UpdateUserProfileType>) =>
    apiService.patch(ACCOUNT_SETTINGS.UPDATE_PROFILE, API_DATA),
  // change password
  changePassword: (API_DATA: ChangePasswordType) =>
    apiService.patch(ACCOUNT_SETTINGS.UPDATE_PASSWORD, API_DATA),
};

export default accountrSettingsAPIs;
