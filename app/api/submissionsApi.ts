// services/submissionApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const submissionApi = createApi({
  reducerPath: "submissionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      // Get token from sessionStorage
      const token = sessionStorage.getItem("authToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createSubmission: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/api/v1/submissions",
        method: "POST",
        body: formData,
      }),
    }),
      // Get submission by tracking number
    getSubmissionByTrackingNumber: builder.query<any, string>({
      query: (trackingNumber) => ({
        url: `/api/v1/submissions/tracking/${trackingNumber}`,
        method: "GET",
      }),
    }),
   
  }),
});

export const { 
  useCreateSubmissionMutation, 
    useGetSubmissionByTrackingNumberQuery,
} = submissionApi;

