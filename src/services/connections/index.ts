import { apiService } from "@/lib/api-service";
import {
  convertConnectionDetails,
  GET_CONNECTION_RESPONSE,
} from "./utils/get-connection-details";

export class UserConnections {
  // get user connections
  getUserConnections = async () => {
    const response = await apiService.get<GET_CONNECTION_RESPONSE>(
      "/connections"
    );

    const dto = convertConnectionDetails(response);

    return dto;
  };
}
