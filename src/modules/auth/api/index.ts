import AUTH_API from "@/constants/api/auth";
import { apiService } from "@/lib/api-service";
import { SignupFormTypes } from "../types";

const AuthAPIs = {
  // Login
  login: ({ email, password }: { email: string; password: string }) =>
    apiService.post(AUTH_API.LOGIN_URL, {
      email,
      password,
    }),

  // Signup
  signup: ({
    email,
    password,
    firstName,
    lastName,
    company,
  }: Omit<SignupFormTypes, "confirmPassword">) =>
    apiService.post(AUTH_API.SIGNUP_URL, {
      firstName,
      lastName,
      email,
      password,
      company,
    }),

  // Forgot Password
  forgotPassword: ({ email }: { email: string }) =>
    apiService.post(AUTH_API.FORGOT_PASSWORD_URL, {
      email,
    }),
};

export default AuthAPIs;
