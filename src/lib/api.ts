import { UserAuthenticationService } from "@/services/auth";
import { UserConnections } from "@/services/connections";

// Classes Initializations
const user_connections = new UserConnections();
const user_auth = new UserAuthenticationService();

export const api = {
  user_connections,
  user_auth,
};
