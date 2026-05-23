import type { Metadata } from "next";
import DashboardNavbar from "@/components/dashboard-navbar/dashboard-navbar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserAuthProvider } from "@/providers/auth/user-auth/user-auth-provider";
import { AiAgentsProvider } from "@/providers/ai-agents";
import { AiAssistantProvider } from "@/providers/ai-assistant";
import { NavBadgeSyncProvider } from "@/providers/nav-badge-sync";

export const metadata: Metadata = {
  title: "Dashboard - Delight Desk",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Auth Provider */}
      <UserAuthProvider>
        <AiAgentsProvider>
          <AiAssistantProvider>
            <NavBadgeSyncProvider>
              {/* Sidebar -Provider */}
              {/* Wraps whole app to cover mobile version through trigger */}
              <SidebarProvider>
                <AppSidebar />
                <div className="flex flex-col flex-1">
                  <DashboardNavbar />
                  <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">{children}</div>
                  </main>
                </div>
              </SidebarProvider>
            </NavBadgeSyncProvider>
          </AiAssistantProvider>
        </AiAgentsProvider>
      </UserAuthProvider>
    </div>
  );
}
