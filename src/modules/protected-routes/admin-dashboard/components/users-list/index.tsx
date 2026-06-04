"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { useUsersList } from "../../utils/hooks/use-users-list";
import UserCard from "./components/user-card";
import { Skeleton } from "@/components/ui/skeleton";

const UsersList = () => {
  const { searchQuery, setSearchQuery, usersList, isFetchingUsers } =
    useUsersList();

  return (
    <Card className="pb-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Users ({usersList.length})
        </CardTitle>
        <div className="flex flex-col gap-2 mt-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {/* <Button
            onClick={() => {}}
            disabled={demoUserMutation.isPending}
            size="sm"
            variant="outline"
            className="w-full"
          >
            {demoUserMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900"></div>
                Creating Demo User...
              </>
            ) : (
              <>
                <UserPlus className="h-3 w-3" />
                Create New User
              </>
            )}
          </Button> */}
        </div>
      </CardHeader>
      {/* Users List */}
      <CardContent className="px-0 max-h-96 overflow-y-auto">
        {isFetchingUsers ? (
          <div className="flex flex-col gap-2 px-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : usersList.length < 1 ? (
          <div className="p-4 text-center text-gray-500">No users found</div>
        ) : (
          <div className="divide-y">
            {usersList.map((user) => (
              <UserCard key={user.id} {...user} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UsersList;
