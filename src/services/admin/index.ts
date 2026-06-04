import { apiService } from "@/lib/api-service";
import {
  convertGetAllUsersResponseToDto,
  GET_ALL_USERS_PARAMS,
  GET_ALL_USERS_RESPONSE,
} from "./utils/get-all-users";
import ADMIN_ENDPOINTS from "./constants";
import {
  DELETE_SPECIFIC_USER_PARAMS,
  DELETE_SPECIFIC_USER_RESPONSE,
} from "./utils/delete-specific-user";

export class AdminService {
  // Get All Users
  getAllUsers = async (params: GET_ALL_USERS_PARAMS) => {
    const response = await apiService.get<GET_ALL_USERS_RESPONSE>(
      ADMIN_ENDPOINTS.GET_ALL_USERS(params)
    );

    const dto = convertGetAllUsersResponseToDto(response);

    return dto;
  };

  // Delete Specific User
  deleteSpecificUser = async (params: DELETE_SPECIFIC_USER_PARAMS) => {
    const response = await apiService.delete<DELETE_SPECIFIC_USER_RESPONSE>(
      ADMIN_ENDPOINTS.DELETE_SPECIFIC_USER(params)
    );

    return response;
  };
}
