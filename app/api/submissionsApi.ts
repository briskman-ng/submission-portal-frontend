// services/submissionApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const submissionApi = createApi({
  reducerPath: "submissionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
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
  }),
});

export const { useCreateSubmissionMutation } = submissionApi;
