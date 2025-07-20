"use client";

import { ReactNode } from "react";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/queryClient";

export function TanstackProvider({
  children,
  state,
}: {
  children: ReactNode;
  state: unknown;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={state}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
