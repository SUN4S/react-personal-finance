import { LoginInputs, RegisterInputs } from "../models/user";

import { baseApi } from "./baseApi";

// Inject a new userApi into the baseApi
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // First mutation(query) takes user object and tries to authenticate user
    login: builder.mutation({
      query: (userData: LoginInputs) => ({
        url: `/user/login`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: userData,
      }),
      invalidatesTags: ["User"],
    }),
    // Second mutation(query) takes user object and tries to create a new user
    registerUser: builder.mutation({
      query: (userData: RegisterInputs) => ({
        url: `/user/register`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: userData,
      }),
      invalidatesTags: ["User"],
    }),
    // Third mutation(query) uses token to remove user from session
    logoutUser: builder.mutation({
      query: () => ({
        url: `/user/logout`,
        method: "POST",
        withCredentials: true,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: `/user/delete`,
        method: "DELETE",
        withCredentials: true,
      }),
      invalidatesTags: ["User"],
    }),
    // Fourth query send a request to see if user is logged to current session
    isLoggedIn: builder.query({
      query: () => ({
        url: `/user/loggedIn`,
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
  useDeleteUserMutation,
  useIsLoggedInQuery,
} = userApi;
