import { ExpenseFetchState, ExpenseState } from "../models/expenses";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { expensesApi } from "../services/expenses";

// Redux Toolkit created expense history slice
// extraReducers: request that was handled by the api sets the state here
// reducers: these functions are used to modify (sort, filter) state data / return values
export const historySlice = createSlice({
  name: "history",
  initialState: { data: [] } as ExpenseFetchState,
  reducers: {
    sortByDate: (state: ExpenseFetchState) => {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      // Function to add response data to store expense state
      expensesApi.endpoints.expenseHistory.matchFulfilled,
      (state, action?: PayloadAction<ExpenseState[]>) => {
        if (action?.payload) {
          state.data = action.payload;
        }
      }
    );
  },
});

// Action creators are generated for each case reducer function
//export const {} = expenseSlice.actions;

export default historySlice.reducer;
