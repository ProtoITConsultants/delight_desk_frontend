"use client";
import AdminPageSkeleton from "@/modules/protected-routes/admin-dashboard/components/admin-page-skeleton";
import SelectedUserPreview from "@/modules/protected-routes/admin-dashboard/components/selected-user-preview";
import UsersList from "@/modules/protected-routes/admin-dashboard/components/users-list";
import { UsersListProvider } from "@/modules/protected-routes/admin-dashboard/utils/hooks/use-users-list";
import { useUserAuth } from "@/providers/auth/user-auth/user-auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const AdminDashboardPage = () => {
  const { userData, isAuthenticating, isAuthenticated } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && userData?.role !== "admin") {
      toast.error("Unauthorized access!", {
        description: "You can't access this page.",
      });
      router.push("/dashboard");
    }
  }, [isAuthenticated, userData, router]);

  if (isAuthenticating) {
    return <AdminPageSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900 sm:leading-4 leading-6">
          Admin Panel
        </h1>
        <p className="text-gray-600 leading-normal">
          Welcome to the admin panel!
        </p>
      </div>
      {/* User Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UsersListProvider>
          <UsersList />
          <SelectedUserPreview />
        </UsersListProvider>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
