// Need to use the React-specific entry point to allow generating React hooks

import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      withCredentials?: AxiosRequestConfig["withCredentials"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, headers, params, withCredentials }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        headers,
        params,
        withCredentials,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `http://localhost:3030/api`,
  }),
  tagTypes: ["Expenses", "User", "Budget"],
  endpoints: () => ({}),
});
