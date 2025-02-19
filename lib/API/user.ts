"use client";

// =================================================
// ============ USER RELATED API CALLS =============
// =================================================
import { useQuery } from "@tanstack/react-query";
import { defaultQueryKeys } from "@/config/query-key";
import { getUserQueryFn, mfaSetupQueryFn } from "./auth";

// ============== USER DETAILS CALL ================
export const useUser = () => {
  return useQuery({
    queryKey: [defaultQueryKeys.getUser],
    queryFn: getUserQueryFn,
    retry: false,
    staleTime: Infinity,
  });
};

// ============== USER MFA SETUP CALL ==============
export const useUserSetupMFA = (isOpen: boolean) => {
  return useQuery({
    queryKey: [defaultQueryKeys.getMFASetup],
    queryFn: mfaSetupQueryFn,
    enabled: isOpen,
    staleTime: Infinity,
  });
};
