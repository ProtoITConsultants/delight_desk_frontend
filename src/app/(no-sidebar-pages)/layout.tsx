import GenericDashboardNavbar from "@/modules/core/components/generic-dashboard-navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Delight Desk",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <GenericDashboardNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
