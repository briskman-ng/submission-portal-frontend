import { getItem } from "@/lib/sessionStorage";
import { GetAllReturn } from "@/types/get-all-return.type";
import replaceUrlParams from "@/utils/replaceUrlParams";
import shakeObject from "@/utils/shakeObject";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";

type ParamsMap = Record<string, string>;

const getCompleteUrl = (url: string, paramsMap?: ParamsMap) => {
  const completeUrl = paramsMap ? replaceUrlParams(url, paramsMap) : url;

  return completeUrl;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/v1",
});
export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth",
});

export const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin",
});
export const adminAuthApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/auth",
});
export const adminSubmissionsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/submissions",
});

const reqInterceptorFn = function (config: InternalAxiosRequestConfig) {
  const excludedRoutes = [
    "/auth/login",
    "/auth/signup",
    "/users/forgot-password",
    "/users/reset-password",
  ];

  const accessToken = getItem("authToken");

  const addAuthHeader =
    !!accessToken &&
    excludedRoutes.every((route) => !config.url?.startsWith(route)) &&
    !config.url?.includes("public");

  if (addAuthHeader) {
    const axiosHeaders = config.headers;

    axiosHeaders.set("authorization", `Bearer ${accessToken}`);

    config.headers = axiosHeaders;
  }

  return config;
};

[api, authApi, adminApi, adminAuthApi, adminSubmissionsApi].forEach((el) =>
  el.interceptors.request.use(reqInterceptorFn),
);

export function post<TData = unknown, TResponse = unknown>(
  axiosInstance: AxiosInstance,
  path: string,
  axiosConfig?: AxiosRequestConfig,
) {
  return async ({
    body,
    params,
  }: {
    body: TData;
    params?: ParamsMap;
  }): Promise<TResponse> => {
    const completeUrl = getCompleteUrl(path, params);

    const response = await axiosInstance.post(completeUrl, body, axiosConfig);

    return response.data;
  };
}

export function get<TResponse>(axiosInstance: AxiosInstance, url: string) {
  /**
   * @param paramsMap An object that represents the route params to be replaced, e.g. {id: "moses"}
   */
  return async ({
    filters = {},
    paramsMap,
  }: {
    paramsMap?: ParamsMap;
    filters?: ParamsMap;
  } = {}): Promise<TResponse> => {
    let completeUrl = getCompleteUrl(url, paramsMap);

    if (Object.keys(filters).length) {
      completeUrl += "?" + qs.stringify(filters);
    }

    const response = await axiosInstance.get(completeUrl);

    return response.data;
  };
}

export function getAll<T>(axiosInstance: AxiosInstance, url: string) {
  /**
   * @param paramsMap An object that represents the route params to be replaced, e.g. {id: "moses"}
   */
  return async (filters = {}, paramsMap = {}): Promise<GetAllReturn & T> => {
    // let finalUrl = url;
    filters = shakeObject(filters);
    let finalUrl = getCompleteUrl(url, paramsMap);

    if (Object.keys(filters).length) {
      finalUrl += "?" + qs.stringify(filters);
    }

    const response = await axiosInstance.get(finalUrl);

    return response.data;
  };
}

export function del<TResponse, TBody = unknown>(
  axiosInstance: AxiosInstance,
  url: string,
) {
  /**
   * @param paramsMap An object that represents the route params to be replaced, e.g. {id: "moses"}
   */
  return async ({
    paramsMap,
    body,
    filters = {},
  }: {
    paramsMap?: ParamsMap;
    filters?: ParamsMap;
    body?: TBody;
  } = {}): Promise<TResponse> => {
    let completeUrl = getCompleteUrl(url, paramsMap);

    if (Object.keys(filters).length) {
      completeUrl += "?" + qs.stringify(filters);
    }

    const response = await axiosInstance.delete(completeUrl, { data: body });

    return response.data.data;
  };
}

export function put<TResponse, TBody = unknown>(
  axiosInstance: AxiosInstance,
  url: string,
) {
  /**
   * @param paramsMap An object that represents the route params to be replaced, e.g. {id: "moses"}
   */
  return async ({
    paramsMap,
    body,
    filters = {},
  }: {
    paramsMap?: ParamsMap;
    filters?: ParamsMap;
    body?: TBody;
  } = {}): Promise<TResponse> => {
    let completeUrl = getCompleteUrl(url, paramsMap);

    if (Object.keys(filters).length) {
      completeUrl += "?" + qs.stringify(filters);
    }

    const response = await axiosInstance.put(completeUrl, body);

    return response.data.data;
  };
}

export function patch<TResponse, TBody = unknown>(
  axiosInstance: AxiosInstance,
  url: string,
) {
  /**
   * @param paramsMap An object that represents the route params to be replaced, e.g. {id: "moses"}
   */
  return async ({
    paramsMap,
    body,
    filters = {},
  }: {
    paramsMap?: ParamsMap;
    filters?: ParamsMap;
    body?: TBody;
  } = {}): Promise<TResponse> => {
    let completeUrl = getCompleteUrl(url, paramsMap);

    if (Object.keys(filters).length) {
      completeUrl += "?" + qs.stringify(filters);
    }

    const response = await axiosInstance.patch(completeUrl, body);

    return response.data.data;
  };
}
