// Req Params Type
export type GET_CONNECTION_PARAMS = null;

// Response Types
type EMAIL_CONNECTION = {
  status: string;
  email: string;
};

type WOOCOMMERCE_CONNECTION = {
  status: string;
  storeUrl: string;
};

export type GET_CONNECTION_RESPONSE = {
  gmail: EMAIL_CONNECTION | null;
  outlook: EMAIL_CONNECTION | null;
  wooCommerce: WOOCOMMERCE_CONNECTION | null;
  shipbob: null;
  shipstation: null;
};

// DTO Types
type EMAIL_CONNECTION_DTO = {
  status: string;
  email: string;
};

type WOOCOMMERCE_CONNECTION_DTO = {
  status: string;
  storeUrl: string;
};

type GET_CONNECTION_DTO_RESPONSE = {
  gmailConnection: EMAIL_CONNECTION_DTO | null;
  outlookConnection: EMAIL_CONNECTION_DTO | null;
  wooCommerceConnection: WOOCOMMERCE_CONNECTION_DTO | null;
  shipbobConnection: null;
  shipstationConnection: null;
};

export const convertConnectionDetails = (
  backendResponse: GET_CONNECTION_RESPONSE
): GET_CONNECTION_DTO_RESPONSE => {
  return {
    gmailConnection: backendResponse.gmail,
    outlookConnection: backendResponse.outlook,
    wooCommerceConnection: backendResponse.wooCommerce,
    shipbobConnection: backendResponse.shipbob,
    shipstationConnection: backendResponse.shipstation,
  };
};
