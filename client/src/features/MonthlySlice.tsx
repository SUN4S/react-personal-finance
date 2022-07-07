import {
  MonthlyReportsFetchState,
  MonthlyReportsState,
} from "../models/reports";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { reportsApi } from "../services/reports";

// Redux Toolkit created expense slice
// extraReducers: request that was handled by the api sets the state here
// reducers: these functions are used to modify (sort, filter) state data
export const monthlyReportSlice = createSlice({
  name: "monthlyReports",
  initialState: { data: [] } as MonthlyReportsFetchState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      // Function to add response data to store expense state
      reportsApi.endpoints.monthlyReports.matchFulfilled,
      (state, action?: PayloadAction<MonthlyReportsState[]>) => {
        if (action?.payload) {
          state.data = action.payload;
        }
      }
    );
  },
});

// Action creators are generated for each case reducer function
// export const {} = expenseSlice.actions;

export default monthlyReportSlice.reducer;
