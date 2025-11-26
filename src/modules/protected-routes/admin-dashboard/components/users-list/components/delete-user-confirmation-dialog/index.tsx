"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { useUsersList } from "@/modules/protected-routes/admin-dashboard/utils/hooks/use-users-list";
import { USER_DATA_TYPE_FOR_ADMIN_DTO } from "@/services/admin/utils/common/types/user-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "sonner";

const DeleteUserConfirmationDialog = ({
  user,
}: {
  user: USER_DATA_TYPE_FOR_ADMIN_DTO;
}) => {
  const queryClient = useQueryClient();
  const { searchQuery } = useUsersList();

  const deleteUser = useMutation({
    mutationFn: () => api.admin_service.deleteSpecificUser({ userId: user.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-data", searchQuery] });
      toast.success("Success!", {
        description: "User deleted successfully.",
      });
    },
    onError: (error) => {
      toast.error("Failed to delete user!", {
        description: error.message || "Something went wrong",
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User Account</DialogTitle>
          <DialogDescription>
            This action will permanently delete the user account and all
            associated data. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-red-800">
                  This will permanently delete:
                </p>
                <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                  <li>User profile and account data</li>
                  <li>All automation rules and settings</li>
                  <li>Email accounts and store connections</li>
                  <li>Activity logs and usage history</li>
                  <li>Billing information and subscription data</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              User Details:
            </p>
            <p className="text-sm text-gray-600">
              Email: {user?.email || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Subscription Plan: {user?.subscriptionPlanName || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Status: {user?.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <DialogTrigger asChild>
            <Button variant="outline" disabled={deleteUser.isPending}>
              Cancel
            </Button>
          </DialogTrigger>
          <Button
            onClick={() => deleteUser.mutate()}
            variant="destructive"
            disabled={deleteUser.isPending}
          >
            {deleteUser.isPending ? "Deleting..." : "Delete User"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserConfirmationDialog;
