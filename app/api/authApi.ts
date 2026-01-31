// services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
     requestOtp: builder.mutation<any, { email: string; name: string }>({
      query: (body) => ({
        url: "/api/v1/auth/request-otp",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    verifyOtp: builder.mutation<
      {
        accessToken: string;
        refreshToken: string;
        user: {
          id: string;
          name: string;
          email: string;
          userType: string;
        };
      },
      { email: string; otp: string }
    >({
      query: (body) => ({
        url: "/api/v1/auth/verify-otp",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const { useRequestOtpMutation, useVerifyOtpMutation } = authApi;
