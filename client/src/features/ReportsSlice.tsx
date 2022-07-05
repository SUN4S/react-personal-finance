import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReportsFetchState, ReportsState } from "../models/reports";

import { reportsApi } from "../services/reports";

// Redux Toolkit created expense slice
// extraReducers: request that was handled by the api sets the state here
// reducers: these functions are used to modify (sort, filter) state data
export const reportsSlice = createSlice({
  name: "reports",
  initialState: { data: [] } as ReportsFetchState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      // Function to add response data to store reports state
      reportsApi.endpoints.weeklyReports.matchFulfilled,
      (state, action?: PayloadAction<ReportsState[]>) => {
        if (action?.payload) {
          state.data = action.payload;
        }
      }
    );
  },
});

// Action creators are generated for each case reducer function
//export const {} = expenseSlice.actions;

export default reportsSlice.reducer;
