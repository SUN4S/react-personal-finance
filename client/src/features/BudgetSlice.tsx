import { BudgetFetchState, BudgetState } from "../models/budget";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { budgetApi } from "../services/budget";

// Redux Toolkit created expense slice
// extraReducers: request that was handled by the api sets the state here
// reducers: these functions are used to modify (sort, filter) state data
export const budgetSlice = createSlice({
  name: "budget",
  initialState: { data: {} } as BudgetFetchState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      // Function to add response data to store budget state
      budgetApi.endpoints.currentBudget.matchFulfilled,
      (state, action?: PayloadAction<BudgetState>) => {
        if (action?.payload) {
          state.data = action.payload;
        }
      }
    );
  },
});

// Action creators are generated for each case reducer function
//export const {} = expenseSlice.actions;

export default budgetSlice.reducer;
