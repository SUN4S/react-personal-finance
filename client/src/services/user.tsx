import {
  AvatarChangeInput,
  ChangePasswordInput,
  LoginInputs,
  RecoverPasswordInput,
  RegisterInputs,
} from "../models/user";

import { baseApi } from "./baseApi";

// Inject a new userApi into the baseApi
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // takes user object and tries to authenticate user
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
    // takes user object and tries to create a new user
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
    // uses token to remove user from session
    logoutUser: builder.mutation({
      query: () => ({
        url: `/user/logout`,
        method: "POST",
        withCredentials: true,
      }),
      invalidatesTags: ["User"],
    }),
    // change current user password
    changePassword: builder.mutation({
      query: (userData: ChangePasswordInput) => ({
        url: `/user/changePassword`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: userData,
      }),
      invalidatesTags: ["User"],
    }),
    // change current user password
    recoverPassword: builder.mutation({
      query: (userData: RecoverPasswordInput) => ({
        url: `/user/recoverPassword`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: userData,
      }),
      invalidatesTags: ["User"],
    }),
    // change current user password
    addAvatar: builder.mutation({
      query: (data: AvatarChangeInput) => ({
        url: `/user/avatar`,
        method: "POST",
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
        data: data,
      }),
      invalidatesTags: ["User"],
    }),
    // delete user from database
    deleteUser: builder.mutation({
      query: () => ({
        url: `/user/delete`,
        method: "DELETE",
        withCredentials: true,
      }),
      invalidatesTags: ["User"],
    }),
    // send a request to see if user is logged to current session
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
  useChangePasswordMutation,
  useRecoverPasswordMutation,
  useAddAvatarMutation,
  useDeleteUserMutation,
  useIsLoggedInQuery,
} = userApi;
