const GET_CONNECTIONS_URL = "/users/connections";
// Gmail Connection
const ADD_GMAIL_CONNECTION_URL = "/google-oauth/login";
const DISCONNECT_GMAIL_CONNECTION_URL = "/google-oauth/disconnect";
// Outlook Connection
const ADD_OUTLOOK_CONNECTION_URL = "/microsoft-oauth/login";
const DISCONNECT_OUTLOOK_CONNECTION_URL = "/microsoft-oauth/disconnect";
// WooCommerce Connection
const WOOCOMMERCE_OAUTH_URL = "/woocommerce/init-oauth";
const WOOCOMMERCE_API_URL = "/woocommerce/manual-connect";
const WOOCOMMERCE_DISCONNECT_URL = "/woocommerce/disconnect";

const USER_CONNECTIONS = {
  GET_CONNECTIONS_URL,
  ADD_GMAIL_CONNECTION_URL,
  DISCONNECT_GMAIL_CONNECTION_URL,
  ADD_OUTLOOK_CONNECTION_URL,
  DISCONNECT_OUTLOOK_CONNECTION_URL,
  WOOCOMMERCE_OAUTH_URL,
  WOOCOMMERCE_API_URL,
  WOOCOMMERCE_DISCONNECT_URL,
};

export default USER_CONNECTIONS;
