import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthFooter from "@/modules/auth/components/AuthFooter";
import SignupForm from "@/modules/auth/components/SignupForm";
import Link from "next/link";

const SignupPage = () => {
  return (
    <>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Create Your Account
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Start automating your customer service emails today
        </p>
      </div>

      {/* Signup Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Fill in your details to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Signup Form */}
          <SignupForm />
          {/* Login Page - Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                prefetch
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <AuthFooter />
    </>
  );
};

export default SignupPage;
