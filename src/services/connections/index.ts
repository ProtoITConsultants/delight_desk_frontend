import { apiService } from "@/lib/api-service";
import {
  convertConnectionDetails,
  GET_CONNECTION_RESPONSE,
} from "./utils/get-connection-details";
import USER_CONNECTIONS from "./constants";
import {
  WOOCOMMERCE_CONNECTION_THROUGH_OAUTH_PARAMS,
  WOOCOMMERCE_CONNECTION_THROUGH_OAUTH_RESPONSE,
  WOOCOMMERCE_CONNECTION_THROUGH_SECRET_KEYS_PARAMS,
} from "./utils/woocommerce-connection";

export class UserConnections {
  // get user connections
  getUserConnections = async () => {
    const response = await apiService.get<GET_CONNECTION_RESPONSE>(
      USER_CONNECTIONS.GET_CONNECTIONS_URL
    );

    const dto = convertConnectionDetails(response);

    return dto;
  };

  // ------------------------------
  // Gmail Connection API Functions
  // ------------------------------

  // add gmail connection
  addGmailConnection = () => {
    return (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}${USER_CONNECTIONS.ADD_GMAIL_CONNECTION_URL}`);
  };
  // disconnect gmail connection
  disconnectGmailAccount = async () => {
    const res = apiService.delete(
      USER_CONNECTIONS.DISCONNECT_GMAIL_CONNECTION_URL
    );
    return res;
  };

  // ------------------------------
  // Outlook Connection API Functions
  // ------------------------------

  // add outlook connection
  addOutlookConnection = async () => {
    return (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}${USER_CONNECTIONS.ADD_OUTLOOK_CONNECTION_URL}`);
  };
  // disconnect outlook connection
  disconnectOutlookAccount = async () => {
    const res = apiService.delete(
      USER_CONNECTIONS.DISCONNECT_OUTLOOK_CONNECTION_URL
    );
    return res;
  };

  // ------------------------------
  // WooCommerce Connection API Functions
  // ------------------------------

  // add WooCommerce connection - OAuth
  addWooCommerceConnectionThroughOAuth = async ({
    storeUrl,
  }: WOOCOMMERCE_CONNECTION_THROUGH_OAUTH_PARAMS) => {
    const res =
      await apiService.post<WOOCOMMERCE_CONNECTION_THROUGH_OAUTH_RESPONSE>(
        USER_CONNECTIONS.WOOCOMMERCE_OAUTH_URL,
        {
          storeUrl,
        }
      );

    return {
      redirectUrl: res.redirectUrl,
    };
  };
  // add WooCommerce connection - Secret Keys
  addWooCommerceConnectionThroughSecretKeys = (
    params: WOOCOMMERCE_CONNECTION_THROUGH_SECRET_KEYS_PARAMS
  ) => {
    return apiService.post(USER_CONNECTIONS.WOOCOMMERCE_API_URL, params);
  };
  // disconnect WooCommerce connection
  disconnectWooCommerceAccount = async () => {
    const res = apiService.delete(USER_CONNECTIONS.WOOCOMMERCE_DISCONNECT_URL);
    return res;
  };
}
