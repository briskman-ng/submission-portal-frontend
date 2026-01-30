// services/fileUploadApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fileUploadApi = createApi({
  reducerPath: "fileUploadApi",
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
    // Upload a single file
    uploadFile: builder.mutation<{
      id: string;
      fileName: string;
      fileUrl: string;
      fileSize: number;
      mimeType: string;
    }, FormData>({
      query: (formData) => ({
        url: "/api/v1/documents/upload",
        method: "POST",
        body: formData,
        // Don't set Content-Type - browser will set it with boundary for FormData
      }),
    }),
    
    // Upload multiple files
    uploadMultipleFiles: builder.mutation<Array<{
      id: string;
      fileName: string;
      fileUrl: string;
      fileSize: number;
      mimeType: string;
    }>, FormData>({
      query: (formData) => ({
        url: "/api/v1/documents/upload-multiple",
        method: "POST",
        body: formData,
      }),
    }),
    
    // Get uploaded file by ID
    getFileById: builder.query<any, string>({
      query: (fileId) => ({
        url: `/api/v1/documents/${fileId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useUploadFileMutation, 
  useUploadMultipleFilesMutation,
  useGetFileByIdQuery 
} = fileUploadApi;