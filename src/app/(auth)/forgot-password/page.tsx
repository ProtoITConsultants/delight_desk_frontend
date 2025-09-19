"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

// Form Validation
const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});
type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [activeTab, setActiveTab] = useState("email-not-submitted");

  // Form Hook
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // TODO: Add Tanstack - Mutation here
  const onSubmit = () => {
    // Log Form Data
    console.log(form.getValues());

    // Set Active Tab
    setActiveTab("email-submitted");
  };

  const mutation = {
    isPending: false,
    error: null,
  };

  return activeTab === "email-not-submitted" ? (
    // Initial Form - When Email is not submitted
    <Card className="w-full max-w-md rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      className="h-10"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mutation.error && (
              <Alert
                variant="destructive"
                className="border-[#ef4444] bg-red-100"
              >
                <AlertDescription>
                  {mutation.error
                    ? mutation.error
                    : "Failed to send reset email"}
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <Button
              type="submit"
              className="w-full h-10"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Sending..." : "Send Reset Link"}
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
        <div className="mt-4 text-center pt-4 border-t border-gray-200 dark:border-gray-700">
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
  ) : (
    // Success Message - To Show When Email is submitted
    <Card className="w-full max-w-md rounded-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
        <CardDescription>
          We&apos;ve sent a password reset link to your email address if an
          account exists.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Alert className="border-green-300 text-green-500 bg-green-100/50">
          <Mail className="h-4 w-4" />
          <AlertDescription className="text-green-500">
            Please check your email and click the reset link to continue. The
            link will expire in 1 hour.
          </AlertDescription>
        </Alert>
        <div className="text-center">
          <Link prefetch href="/login">
            <Button variant="outline" className="w-full h-10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </Link>
        </div>
        {/* Footer Links */}
        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
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

export default ForgotPassword;
