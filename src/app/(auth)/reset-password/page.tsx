"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// Form Validation
const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  // Hooks
  const searchParams = useSearchParams();

  // Extract Token from URL
  const token = searchParams.get("token");

  // Local States
  const [showPassword, setShowPassword] = useState(false);

  // Form
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // TODO: Add Tanstack - Mutation here
  const onSubmit = (data: ResetPasswordForm) => {
    console.log(data);
  };

  const resetMutation = {
    isSuccess: false,
    isPending: false,
    error: null,
  };

  const tokenValidation = {
    isPending: false,
    error: null,
  };

  // Show success message
  if (resetMutation.isSuccess) {
    return (
      <Card className="w-full max-w-md rounded-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Password Reset Complete
          </CardTitle>
          <CardDescription>
            Your password has been successfully updated.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-300 text-green-500 bg-green-100/50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-500">
              You can now log in with your new password.
            </AlertDescription>
          </Alert>
          <Link prefetch href="/login">
            <Button className="w-full">Go to Login</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Show loading while validating token
  if (tokenValidation.isPending) {
    return (
      <Card className="w-full max-w-md rounded-lg">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2094f3] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Validating reset link...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!token || tokenValidation.error) {
    return (
      <Card className="w-full max-w-md rounded-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Invalid Reset Link
          </CardTitle>
          <CardDescription>
            This password reset link is invalid or has expired.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive" className="border-[#ef4444] bg-red-100">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {tokenValidation.error ||
                "The reset link is invalid or has expired. Please request a new password reset."}
            </AlertDescription>
          </Alert>
          <div className="flex flex-col gap-2">
            <Link href="/forgot-password">
              <Button className="w-full">Request New Reset Link</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <Link
                href="/privacy-policy"
                prefetch
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                prefetch
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
        <CardDescription>Enter your new password below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="h-10"
                        placeholder="Enter new password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="h-10"
                        placeholder="Confirm new password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {resetMutation.error && (
              <Alert
                variant="destructive"
                className="border-[#ef4444] bg-red-100"
              >
                <AlertDescription>
                  {resetMutation.error
                    ? resetMutation.error
                    : "Failed to reset password"}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-10"
              disabled={resetMutation.isPending}
            >
              {resetMutation.isPending
                ? "Updating Password..."
                : "Update Password"}
            </Button>

            <div className="text-center">
              <Link href="/login">
                <Button variant="ghost" className="text-sm h-10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </form>
        </Form>
        {/* Footer Links */}
        <div className="text-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="/privacy-policy"
              prefetch
              className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              prefetch
              className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ResetPasswordPage = () => (
  <Suspense
    fallback={
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2094f3] mx-auto"></div>
    }
  >
    <ResetPassword />
  </Suspense>
);

export default ResetPasswordPage;
