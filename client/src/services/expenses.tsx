// Need to use the React-specific entry point to allow generating React hooks

import { ExpenseDeleteId, ExpenseFormState } from "../models/expenses";

import { baseApi } from "./baseApi";

// Inject a new expensesApi into the baseApi
export const expensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // First query returns ALL expenses ever provided
    expenseHistory: builder.query({
      query: () => ({
        url: `/expenses`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Expenses"],
    }),
    // Second query returns only current month expenses
    // month verification and filtering is done server-side
    currentExpenseMonth: builder.query({
      query: () => ({
        url: `/expenses/currentMonth`,
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
      query: (deleteId: string) => ({
        url: `/expenses/deleteExpense/${deleteId}`,
        method: "DELETE",
        withCredentials: true,
      }),
      invalidatesTags: ["Expenses"],
    }),
  }),
});

export const {
  useExpenseHistoryQuery,
  useCurrentExpenseMonthQuery,
  useEditExpenseMutation,
  usePostExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;
