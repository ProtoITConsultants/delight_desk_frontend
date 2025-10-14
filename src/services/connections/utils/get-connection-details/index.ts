// Req Params Type
export type GET_CONNECTION_PARAMS = null;

// Response Types
type EMAIL_CONNECTION = {
  status: string;
  email: string;
};

export type GET_CONNECTION_RESPONSE = {
  gmail: EMAIL_CONNECTION;
  outlook: EMAIL_CONNECTION;
  wooCommerce: null;
  shipbob: null;
  shipstation: null;
};

// DTO Types
type EMAIL_CONNECTION_DTO = {
  status: string;
  email: string;
};

type GET_CONNECTION_DTO_RESPONSE = {
  gmailConnection: EMAIL_CONNECTION_DTO;
  outlookConnection: EMAIL_CONNECTION_DTO;
  wooCommerceConnection: null;
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
