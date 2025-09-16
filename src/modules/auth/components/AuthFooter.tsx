import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const AuthFooter = () => {
  return (
    <footer className="space-y-8">
      {/* Back to Home */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Homepage
        </Link>
      </div>

      {/* Footer Links */}
      <div className="text-center pt-6 border-t border-gray-200">
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <Link
            href="/privacy-policy"
            className="hover:text-gray-700 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-gray-700 transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;
