export type AUTHENTICATE_ADMIN_RESPONSE = {
  isAdmin: boolean;
};

export type AUTHENTICATE_ADMIN_DTO_RESPONSE = {
  isAdmin: boolean;
};

export const convertAuthenticateAdminResponse = (
  response: AUTHENTICATE_ADMIN_RESPONSE
): AUTHENTICATE_ADMIN_DTO_RESPONSE => {
  return {
    isAdmin: response.isAdmin,
  };
};
