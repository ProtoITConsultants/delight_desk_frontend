import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const GenericDashboardNavbar = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Image
            src="/dashboard-logo.svg"
            alt="Logo"
            className="h-8 w-[120px]"
            height={32}
            width={120}
            priority
          />
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericDashboardNavbar;
