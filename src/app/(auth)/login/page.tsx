import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/modules/auth/components/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to access your customer service dashboard
        </p>
      </div>
      {/* Login Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Login Form */}
          <LoginForm />

          {/* Forgot Password - Link */}
          <div className="mt-4 text-center">
            <Link
              href={"/forgot-password"}
              prefetch
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              Forgot your password?
            </Link>
          </div>
          {/* Signup Page - Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                prefetch
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginPage;
