// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: (error) => {
              const err = error as AxiosError<{
                message: string;
                errors?: [{ message: string }];
              }>;

              if (err.response?.data?.errors?.length) {
                // if specific error messages exist
                toast.error(err.response?.data.errors?.[0]?.message);
              } else {
                toast.error(
                  err.response?.data?.message || "Something went wrong",
                );
              }
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
