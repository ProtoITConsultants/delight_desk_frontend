import AUTH_API from "@/constants/api/auth";
import { apiService } from "@/lib/api-service";

const AuthAPIs = {
  login: ({ email, password }: { email: string; password: string }) =>
    apiService.post(AUTH_API.LOGIN_URL, {
      email,
      password,
    }),
};

export default AuthAPIs;
