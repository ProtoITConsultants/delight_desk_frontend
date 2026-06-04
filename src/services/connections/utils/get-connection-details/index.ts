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

/** Fulfillment partners return `{ status: "connected" | "disconnected" }` even when not connected (not `null`). */
type FULFILLMENT_PARTNER_CONNECTION = {
  status: string;
};

export type GET_CONNECTION_RESPONSE = {
  gmail: EMAIL_CONNECTION | null;
  outlook: EMAIL_CONNECTION | null;
  wooCommerce: WOOCOMMERCE_CONNECTION | null;
  shipbob: FULFILLMENT_PARTNER_CONNECTION | null;
  shipstation: FULFILLMENT_PARTNER_CONNECTION | null;
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

type FULFILLMENT_PARTNER_CONNECTION_DTO = {
  status: string;
};

type GET_CONNECTION_DTO_RESPONSE = {
  gmailConnection: EMAIL_CONNECTION_DTO | null;
  outlookConnection: EMAIL_CONNECTION_DTO | null;
  wooCommerceConnection: WOOCOMMERCE_CONNECTION_DTO | null;
  shipbobConnection: FULFILLMENT_PARTNER_CONNECTION_DTO | null;
  shipstationConnection: FULFILLMENT_PARTNER_CONNECTION_DTO | null;
};

/** Use for integrations whose API returns an object with `status` (not only `null` when disconnected). */
export const isConnectionStatusConnected = (
  connection: { status: string } | null | undefined
) => connection?.status === "connected";

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
