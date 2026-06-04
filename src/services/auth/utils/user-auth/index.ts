export type AUTHENTICATE_USER_RESPONSE = {
  id: string;
  email: string;
  role: "user" | "admin";
  firstName: string;
  lastName: string;
};

export type AUTHENTICATE_USER_DTO_RESPONSE = {
  id: string;
  email: string;
  role: "user" | "admin";
  firstName: string;
  lastName: string;
};

export const convertAuthenticateUserResponse = (
  backendResponse: AUTHENTICATE_USER_RESPONSE
): AUTHENTICATE_USER_DTO_RESPONSE => {
  return {
    id: backendResponse.id,
    email: backendResponse.email,
    role: backendResponse.role,
    firstName: backendResponse.firstName,
    lastName: backendResponse.lastName,
  };
};
