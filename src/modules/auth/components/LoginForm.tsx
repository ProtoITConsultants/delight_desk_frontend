"use client";
import { Button } from "@/components/ui/button";
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
import { useMutation } from "@tanstack/react-query";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthAPIs from "../api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Form Validation Schema
const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormTypes = z.infer<typeof loginSchema>;

const LoginForm = () => {
  // Hooks
  const router = useRouter();
  // Form Hook
  const loginForm = useForm<LoginFormTypes>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Login Mutation
  const loginUser = useMutation({
    mutationFn: (data: LoginFormTypes) => AuthAPIs.login(data),
    onSuccess: () => {
      toast.success("Login successful", {
        description: "Welcome back! Redirecting...",
      });
      router.replace("/dashboard");
    },
    onError: (error) => {
      toast.error("Login failed", {
        description: error.message || "Something went wrong",
      });
    },
  });

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit((data) => loginUser.mutate(data))}
        className="space-y-4"
      >
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="py-2 h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="py-2 h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full hover:cursor-pointer"
          disabled={loginUser.isPending}
        >
          {loginUser.isPending ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
