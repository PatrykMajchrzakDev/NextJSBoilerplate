"use client";

import { User } from "@/common/types/user-type";
import { useUser } from "@/lib/API/user";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect } from "react";

type AuthContextType = {
  user?: User;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { data, error, isLoading, isFetching, refetch } = useUser();
  const user = data?.data.user as User;

  useEffect(() => {
    if (!isLoading && !isFetching && !user) {
      router.replace("/signup"); // Using replace instead of push to prevent back navigation
    }
  }, [isLoading, isFetching, user, router]);

  if (isLoading || isFetching) {
    return <div>Loading...</div>; // Show loading state while checking auth status
  }

  if (!user) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ user, error, isLoading, isFetching, refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
