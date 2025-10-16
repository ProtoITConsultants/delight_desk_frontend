import { apiService } from "@/lib/api-service";
import {
  convertConnectionDetails,
  GET_CONNECTION_RESPONSE,
} from "./utils/get-connection-details";
import USER_CONNECTIONS from "./constants";

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
    return (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/${USER_CONNECTIONS.ADD_GMAIL_CONNECTION_URL}`);
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
  addOutlookConnection = async () => {};
  // disconnect outlook connection
  disconnectOutlookAccount = async () => {};
}
