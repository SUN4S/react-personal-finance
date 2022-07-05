import { baseApi } from "./baseApi";

// Inject a new budgetApi into the baseApi
export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // query to get all weekly reports
    weeklyReports: builder.query({
      query: () => ({
        url: `/reports/weeklyReports`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Reports"],
    }),
    // query to get all monthly reports
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
