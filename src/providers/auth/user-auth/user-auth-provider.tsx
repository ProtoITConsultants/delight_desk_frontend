"use client";
import LoadingBackdrop from "@/components/common/loading-backdrop";
import { api } from "@/lib/api";
import { AUTHENTICATE_USER_DTO_RESPONSE } from "@/services/auth/utils/user-auth";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect } from "react";
import { toast } from "sonner";

type UserAuthContextType = {
  userData: AUTHENTICATE_USER_DTO_RESPONSE | undefined;
  isAuthenticated: boolean;
};

// Create context with default value
const UserAuthContext = createContext<UserAuthContextType>({
  userData: undefined,
  isAuthenticated: false,
});

// Hook for consuming the context
export const useUserAuth = (): UserAuthContextType => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

// Provider component
export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Hooks
  const router = useRouter();

  // Query To Authenticate User
  const {
    data: userData,
    isPending,
    isError,
    error,
  } = useQuery<AUTHENTICATE_USER_DTO_RESPONSE>({
    queryKey: ["userAuthStatus"],
    queryFn: () => api.user_auth.authenticateUser(),
  });

  // Handle Error
  // Only trigger side effects when isError changes
  useEffect(() => {
    if (isError) {
      console.error("Error fetching auth status:", error);
      router.replace("/login");
      toast.error("Authentication Failed!", {
        description: error?.message || "Something went wrong",
      });
    }
  }, [isError, error, router]);

  // Context Value
  const value = {
    userData,
    isAuthenticated: !!userData,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {isPending && <LoadingBackdrop />}
      {children}
    </UserAuthContext.Provider>
  );
};
