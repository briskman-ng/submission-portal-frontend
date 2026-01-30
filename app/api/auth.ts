import {
  RootState,
} from "@/types/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers, { getState }) {
      const state = getState() as RootState;
      if (state?.user?.token) {
        headers.set("authorization", `Bearer ${state?.user?.token}`);
      }
      return headers;
    },
  }),
  reducerPath: "auth",
  endpoints: (build) => ({
   

  }),
});

export const {

} = authApi;
