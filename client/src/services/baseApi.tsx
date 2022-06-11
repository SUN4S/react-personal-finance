// Need to use the React-specific entry point to allow generating React hooks

import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { useNavigate } from "react-router";

// Define base Axios parameters
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
      if (
        err.response?.status === 401 &&
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register"
      ) {
        window.location.href = "/login";
      }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// Creating a base api, that will house all other api requests
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.SERVER_URL}/api`,
  }),
  tagTypes: ["Expenses", "User", "Budget"],
  endpoints: () => ({}),
});
