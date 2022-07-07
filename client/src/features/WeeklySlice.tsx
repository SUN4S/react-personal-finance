import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WeeklyReportsFetchState, WeeklyReportsState } from "../models/reports";

import { reportsApi } from "../services/reports";

// Redux Toolkit created expense slice
// extraReducers: request that was handled by the api sets the state here
// reducers: these functions are used to modify (sort, filter) state data
export const weeklyReportSlice = createSlice({
  name: "weeklyReports",
  initialState: { data: [] } as WeeklyReportsFetchState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      // Function to add response data to store expense state
      reportsApi.endpoints.weeklyReports.matchFulfilled,
      (state, action?: PayloadAction<WeeklyReportsState[]>) => {
        if (action?.payload) {
          state.data = action.payload;
        }
      }
    );
  },
});

// Action creators are generated for each case reducer function
// export const {} = expenseSlice.actions;

export default weeklyReportSlice.reducer;
