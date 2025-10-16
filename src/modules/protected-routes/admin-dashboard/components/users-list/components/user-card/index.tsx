"use client";

import { Badge } from "@/components/ui/badge";
import { useUsersList } from "@/modules/protected-routes/admin-dashboard/utils/hooks/use-users-list";
import formatDate from "@/modules/protected-routes/admin-dashboard/utils/services/formate-date";
import { USER_TYPE } from "@/modules/protected-routes/admin-dashboard/utils/types";
import { Calendar } from "lucide-react";

const UserCard = (user: USER_TYPE) => {
  const { selectedUser, setSelectedUser } = useUsersList();

  return (
    <div
      className={`p-4 cursor-pointer hover:bg-gray-50 ${
        selectedUser === user.id
          ? "bg-blue-50 border-r-2 border-primary/80"
          : ""
      }`}
      onClick={() => setSelectedUser(user.id)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-sm">{user.userName}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        <Badge variant={user.isActive ? "default" : "secondary"}>
          {user.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <Calendar className="h-3 w-3" />
        Last Login: {user.lastLogin ? formatDate(user.lastLogin) : "Never"}
      </div>
    </div>
  );
};

export default UserCard;
