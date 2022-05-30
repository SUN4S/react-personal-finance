// Need to use the React-specific entry point to allow generating React hooks

import { ExpenseDeleteId, ExpenseFormState } from "../models/expenses";

import { baseApi } from "./baseApi";

// Define a service using a base URL and expected endpoints
export const expensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    expenses: builder.query({
      query: () => ({
        url: `/expenses`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Expenses"],
    }),
    currentMonth: builder.query({
      query: () => ({
        url: `/expenses/currentMonth`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Expenses"],
    }),
    expenseImage: builder.query<string, string>({
      query: (name: string) => ({
        url: `/expenses/getReceipt/${name}`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Expenses"],
    }),
    postExpense: builder.mutation({
      query: (expenseData: ExpenseFormState) => ({
        url: "/expenses/addExpense",
        method: "POST",
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
        data: expenseData,
      }),
      invalidatesTags: ["Expenses"],
    }),
    editExpense: builder.mutation({
      query: (expenseData: ExpenseFormState) => ({
        url: "/expenses/editExpense",
        method: "PUT",
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
        data: expenseData,
      }),
      invalidatesTags: ["Expenses"],
    }),
    deleteExpense: builder.mutation({
      query: (deleteId: ExpenseDeleteId) => ({
        url: "/expenses/deleteExpense",
        method: "DELETE",
        withCredentials: true,
        data: deleteId,
      }),
      invalidatesTags: ["Expenses"],
    }),
  }),
});

export const {
  useExpensesQuery,
  useCurrentMonthQuery,
  useLazyExpenseImageQuery,
  useEditExpenseMutation,
  usePostExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;
