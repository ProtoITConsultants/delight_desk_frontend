// Req Params Type
type WOOCOMMERCE_CONNECTION_BASE_PARAMS = {
  storeUrl: string;
};

export type WOOCOMMERCE_CONNECTION_THROUGH_OAUTH_PARAMS =
  WOOCOMMERCE_CONNECTION_BASE_PARAMS;
export type WOOCOMMERCE_CONNECTION_THROUGH_SECRET_KEYS_PARAMS =
  WOOCOMMERCE_CONNECTION_BASE_PARAMS & {
    consumerKey: string;
    consumerSecret: string;
  };

// Response Types
export type WOOCOMMERCE_CONNECTION_THROUGH_OAUTH_RESPONSE = {
  redirectUrl: string;
};
