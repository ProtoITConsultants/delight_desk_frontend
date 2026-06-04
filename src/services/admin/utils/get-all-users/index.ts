import {
  USER_DATA_TYPE_FOR_ADMIN,
  USER_DATA_TYPE_FOR_ADMIN_DTO,
} from "../common/types/user-data";

export type GET_ALL_USERS_PARAMS = {
  page: number;
  limit: number;
  searchQuery: string;
};

export type GET_ALL_USERS_RESPONSE = {
  total: number;
  page: number;
  limit: number;
  items: USER_DATA_TYPE_FOR_ADMIN[];
};

// DTO response type
export type GET_ALL_USERS_DTO_RESPONSE = {
  page: number;
  total_pages: number;
  limit: number;
  users_data: USER_DATA_TYPE_FOR_ADMIN_DTO[];
  hasNext: boolean;
};

// Function to convert DTO to response type
export const convertGetAllUsersResponseToDto = (
  res: GET_ALL_USERS_RESPONSE
): GET_ALL_USERS_DTO_RESPONSE => {
  const updatedUserData = res.items.map((user) => {
    const lastLoginDate = user.lastLoginAt ? new Date(user.lastLoginAt) : null;
    const isActive =
      lastLoginDate !== null &&
      (new Date().getTime() - lastLoginDate.getTime()) /
        (1000 * 60 * 60 * 24) <=
        30;

    return {
      ...user,
      isActive,
    };
  });

  return {
    page: res.page,
    total_pages: res.total,
    limit: res.limit,
    users_data: updatedUserData,
    hasNext: res.total > res.page * res.limit,
  };
};
