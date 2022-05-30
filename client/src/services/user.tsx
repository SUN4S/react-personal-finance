import { LoginInputs, RegisterInputs } from "../models/user";

import { baseApi } from "./baseApi";

// Define a service using a base URL and expected endpoints
export const userSplitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData: LoginInputs) => ({
        url: `/login`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: userData,
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: builder.mutation({
      query: (userData: RegisterInputs) => ({
        url: `/register`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: userData,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
        withCredentials: true,
      }),
      invalidatesTags: ["User"],
    }),
    isLoggedIn: builder.query({
      query: () => ({
        url: `/loggedIn`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useIsLoggedInQuery,
} = userSplitApi;
