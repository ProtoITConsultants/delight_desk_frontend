import { apiService } from "@/lib/api-service";
import {
  AUTHENTICATE_USER_RESPONSE,
  convertAuthenticateUserResponse,
} from "./utils/user-auth";
import AUTHENTICATION_ENDPOINTS from "./constants";
import {
  AUTHENTICATE_ADMIN_RESPONSE,
  convertAuthenticateAdminResponse,
} from "./utils/admin-auth";

export class UserAuthenticationService {
  // Authenticate user
  authenticateUser = async () => {
    const response = await apiService.get<AUTHENTICATE_USER_RESPONSE>(
      AUTHENTICATION_ENDPOINTS.AUTHENTICATE_USER
    );

    const dto = convertAuthenticateUserResponse(response);

    return dto;
  };
  // Authenticate admin
  authenticateAdmin = async () => {
    const response = await apiService.get<AUTHENTICATE_ADMIN_RESPONSE>(
      AUTHENTICATION_ENDPOINTS.AUTHENTICATE_ADMIN
    );

    const dto = convertAuthenticateAdminResponse(response);

    return dto;
  };
}
