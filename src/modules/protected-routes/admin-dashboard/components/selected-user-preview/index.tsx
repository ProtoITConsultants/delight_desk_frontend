"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUsersList } from "../../utils/hooks/use-users-list";
import { Mail, ShoppingBag, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import formatDate from "../../utils/services/formate-date";
import { Badge } from "@/components/ui/badge";
import DeleteUserConfirmationDialog from "../users-list/components/delete-user-confirmation-dialog";

const UserInfoItem = ({
  label,
  type,
  value,
}: {
  label: string;
  type: "date" | "text";
  value: string;
}) => (
  <div className="flex flex-col gap-1">
    <Label className="text-sm font-medium">{label}</Label>
    {type === "date" ? (
      <p className="text-sm text-gray-600">{formatDate(value)}</p>
    ) : (
      <p className="text-sm text-gray-600">{value}</p>
    )}
  </div>
);

const SelectedUserPreview = () => {
  const { selectedUser, usersList } = useUsersList();

  const user = usersList.find((user) => user.id === selectedUser);

  return !selectedUser ? (
    <Card className="lg:col-span-2 h-fit">
      <CardContent className="flex items-center justify-center h-64">
        <div className="text-center">
          <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Select a user to view details</p>
        </div>
      </CardContent>
    </Card>
  ) : (
    <div className="lg:col-span-2 h-fit flex flex-col gap-6">
      {/* User Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Account Information</CardTitle>
          {user && <DeleteUserConfirmationDialog user={user} />}
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <UserInfoItem
            type="text"
            label="Username"
            value={`${user?.firstName} ${user?.lastName}` || ""}
          />
          {/* Email */}
          <UserInfoItem type="text" label="Email" value={user?.email ?? ""} />
          {/* Last Login */}
          <UserInfoItem
            type="date"
            label="Last Login"
            value={user?.lastLoginAt ?? ""}
          />
          {/* Status */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Status</Label>
            <Badge variant={user?.isActive ? "default" : "secondary"}>
              {user?.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          {/* Subscription Type */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Subscription Plan</Label>
            <Badge variant="outline">
              {user?.subscriptionPlanName ?? "N/A"}
            </Badge>
          </div>
        </CardContent>
      </Card>
      {/* Integrations Information */}
      <Card>
        <CardHeader className="h-fit gap-0">
          <CardTitle className="text-2xl">Connected Integrations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm">Email Provider</span>
            </div>
            <Badge variant="outline">
              {user?.oauthAccount?.provider || "None"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="text-sm">Store Platform</span>
            </div>
            <Badge variant="outline">
              {user?.storeConnection?.platform || "None"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectedUserPreview;
