"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Building, EyeOff, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SIGNUP_FORM_SCHEMA } from "../schema/signup";
import { SignupFormTypes } from "../types";
import { useMutation } from "@tanstack/react-query";
import AuthAPIs from "../api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupForm = () => {
  // Hooks
  const router = useRouter();

  // Local States
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupFormTypes>({
    resolver: zodResolver(SIGNUP_FORM_SCHEMA),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      company: "",
    },
  });

  const createAccount = useMutation({
    mutationFn: (data: SignupFormTypes) => AuthAPIs.signup(data),
    onSuccess: () => {
      toast.success("Signup successful!", {
        description: "Welcome! Redirecting...",
      });
      router.replace("/dashboard");
    },
    onError: (error) => {
      toast.error("Signup failed!", {
        description: error.message || "Something went wrong",
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => createAccount.mutate(data))}
        className="space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    className="py-2 h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    className="py-2 h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
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
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Company Name
              </FormLabel>
              <FormControl>
                <Input
                  id="company"
                  type="text"
                  placeholder="Enter your company name"
                  className="py-2 h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="py-2 h-10 peer"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 bg-white hover:bg-white border border-l-0 rounded-l-none peer-focus:!border-ring"
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
              <FormLabel className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="py-2 h-10"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 bg-white hover:bg-white border border-l-0 rounded-l-none peer-focus:!border-ring"
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
        <Button
          type="submit"
          className="w-full hover:cursor-pointer"
          disabled={createAccount.isPending}
        >
          {createAccount.isPending ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
