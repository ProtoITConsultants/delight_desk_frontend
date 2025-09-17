import DashboardNavbar from "@/components/dashboard-navbar/dashboard-navbar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex bg-gray-50">
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
    </div>
  );
}
