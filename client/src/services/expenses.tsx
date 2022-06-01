// Need to use the React-specific entry point to allow generating React hooks

import { ExpenseDeleteId, ExpenseFormState } from "../models/expenses";

import { baseApi } from "./baseApi";

// Inject a new expensesApi into the baseApi
export const expensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // First query returns ALL expenses ever provided
    expenses: builder.query({
      query: () => ({
        url: `/expenses`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Expenses"],
    }),
    // Second query returns only current month expenses
    // month verification and filtering is done server-side
    currentMonth: builder.query({
      query: () => ({
        url: `/expenses/currentMonth`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Expenses"],
    }),
    // Third query takes image name (string) parameter used to get file
    // Returns link to where the image is stored
    expenseImage: builder.query<string, string>({
      query: (name: string) => ({
        url: `/expenses/getReceipt/${name}`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Expenses"],
    }),
    // Fourth mutation(query) takes an object and/or file to pass to server
    // multipart/form-data does not send arrays, so 'tags' need to be parsed
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
    // Fifth mutation(query) takes an object and/or file to pass to server
    // multipart/form-data does not send arrays, so 'tags' need to be parsed
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
    //Sixth mutation(query) takes an object with id of expense and/or filename
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
