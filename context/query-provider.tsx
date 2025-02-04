// =================================================
// ==== Query Provider necessary for @tanstack =====
// =================================================

"use client";

import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  DefaultOptions,
} from "@tanstack/react-query";

interface Props {
  children: ReactNode;
}

export const queryConfig = {
  queries: {
    // throwOnError: true,
    refetchOnWindowFocus: true,
    retry: false,
    staleTime: 1000 * 60 * 3, // 3 minutes
    refetchInterval: 1000 * 60 * 3, // 3 minutes
  },
} satisfies DefaultOptions;

export default function QueryProvider({ children }: Props) {
  const queryClient = new QueryClient({ defaultOptions: queryConfig });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
