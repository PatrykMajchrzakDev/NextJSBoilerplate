"use client";

// =================================================
// ============ USER RELATED API CALLS =============
// =================================================
import { useQuery } from "@tanstack/react-query";
import { defaultQueryKeys } from "@/config/query-key";
import { getUserQueryFn } from "./auth";

// ============== USER DETAILS CALLS ===============
export const useUser = () => {
  return useQuery({
    queryKey: [defaultQueryKeys.getUser],
    queryFn: getUserQueryFn,
    retry: false,
    staleTime: Infinity,
  });
};
