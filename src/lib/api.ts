import { AdminService } from "@/services/admin";
import { UserAuthenticationService } from "@/services/auth";
import { UserConnections } from "@/services/connections";

// Classes Initializations
const user_connections = new UserConnections();
const user_auth = new UserAuthenticationService();
const admin_service = new AdminService();

export const api = {
  user_connections,
  user_auth,
  admin_service,
};
