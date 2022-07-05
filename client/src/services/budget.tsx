import { BudgetFormState } from "../models/budget";
import { baseApi } from "./baseApi";

// Inject a new budgetApi into the baseApi
export const budgetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // query that returns ALL budgets ever provided
    budget: builder.query({
      query: () => ({
        url: `/budget`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Budget"],
    }),
    // query that return current month budget
    currentBudget: builder.query({
      query: () => ({
        url: `/budget/currentBudget`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Budget"],
    }),
    // mutation to post new budget
    postBudget: builder.mutation({
      query: (budgetData: BudgetFormState) => ({
        url: "/budget/addBudget",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        data: budgetData,
      }),
      invalidatesTags: ["Budget"],
    }),
  }),
});

export const { useBudgetQuery, useCurrentBudgetQuery, usePostBudgetMutation } =
  budgetApi;
