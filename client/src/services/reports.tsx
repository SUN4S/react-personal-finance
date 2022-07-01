import { baseApi } from "./baseApi";

// Inject a new budgetApi into the baseApi
export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // First query returns ALL expenses ever provided
    weeklyReports: builder.query({
      query: () => ({
        url: `/reports/weeklyReports`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Reports"],
    }),
    monthlyReports: builder.query({
      query: () => ({
        url: `/reports/monthlyReports`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Reports"],
    }),
  }),
});

export const { useWeeklyReportsQuery, useMonthlyReportsQuery } = reportsApi;
