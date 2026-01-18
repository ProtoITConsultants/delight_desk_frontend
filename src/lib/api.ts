import { AdminService } from "@/services/admin";
import { AIAgentsService } from "@/services/ai-agents";
import { UserAuthenticationService } from "@/services/auth";
import { UserConnections } from "@/services/connections";

// Classes Initializations
const user_connections = new UserConnections();
const user_auth = new UserAuthenticationService();
const admin_service = new AdminService();
const ai_agents_service = new AIAgentsService();

export const api = {
  user_connections,
  user_auth,
  admin_service,
  ai_agents_service,
};
