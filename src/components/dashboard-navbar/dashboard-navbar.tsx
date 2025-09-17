"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu, User, Shield, LogOut, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DashboardNavbar = () => {
  // Toggle Sidebar as Drawer
  const { toggleSidebar } = useSidebar();

  const isAdmin = true;

  // TODO: Add Logout Mutation
  const handleLogout = () => {};

  return (
    <nav className="sticky top-0 z-10 flex-shrink-0">
      <div className="flex h-16 bg-white shadow-sm border-b border-gray-200">
        {/* Custom Sidebar Toggle Trigger */}
        <Button
          variant="ghost"
          size="sm"
          className="h-full px-4 border-r border-gray-200 text-gray-500 lg:hidden hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open sidebar</span>
        </Button>

        {/* Navbar Content */}
        <div className="flex-1 px-4 flex justify-between items-center">
          {/* Logo For Mobile */}
          <div className="flex items-center lg:hidden">
            <Image
              src="/dashboard-logo.svg"
              alt="Logo"
              height={32}
              width={120}
            />
          </div>

          {/* Desktop: Empty center space, Mobile: Empty space */}
          <div className="flex-1"></div>

          {/* Right side navigation */}
          <div className="flex items-center gap-1">
            {/* Admin Button - Only visible to specific admin users */}
            {isAdmin && (
              <>
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 h-9 rounded-md font-medium text-sm"
                >
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>

                {/* Separator */}
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
              </>
            )}

            {/* Get Help Button */}
            <Link
              href="/support"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 h-9 rounded-md font-medium text-sm"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Get Help</span>
            </Link>

            {/* Account Settings Button */}
            <Link
              href="/account-settings"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 h-9 rounded-md font-medium text-sm"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </Link>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 hover:bg-red-50 px-3 h-9 hover:cursor-pointer rounded-md font-medium text-sm"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
