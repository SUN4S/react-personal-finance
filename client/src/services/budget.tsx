import { baseApi } from "./baseApi";

// Inject a new budgetApi into the baseApi
export const budgetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // First query returns ALL expenses ever provided
    budget: builder.query({
      query: () => ({
        url: `/budget`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Budget"],
    }),
    currentBudget: builder.query({
      query: () => ({
        url: `/budget/currentBudget`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Budget"],
    }),
  }),
});

export const { useBudgetQuery, useCurrentBudgetQuery } = budgetApi;
