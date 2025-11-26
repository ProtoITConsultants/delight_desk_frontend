export interface OAUTH_ACCOUNT_TYPE {
  id: string;
  provider: string;
  email: string;
  status: string;
  providerUserId: string;
  createdAt: string;
}

export interface STORE_CONNECTION_TYPE {
  id: string;
  platform: string;
  storeName: string;
  storeUrl: string;
  isActive: boolean;
  createdAt: string;
}

export type USER_DATA_TYPE_FOR_ADMIN = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  lastLoginAt: string | null;
  oauthAccount: OAUTH_ACCOUNT_TYPE | null;
  storeConnection: STORE_CONNECTION_TYPE | null;
  subscriptionPlanName: string | null;
};

export type USER_DATA_TYPE_FOR_ADMIN_DTO = USER_DATA_TYPE_FOR_ADMIN & {
  isActive: boolean;
};
