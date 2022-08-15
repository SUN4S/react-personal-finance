import { baseApi } from "./baseApi";

// Inject a new budgetApi into the baseApi
export const stocksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // query to get all weekly reports
    stocks: builder.query({
      query: () => ({
        url: `/stocks`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Stocks"],
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

export const { useStocksQuery } = stocksApi;
