import { ExpenseFetchState, ExpenseState } from "../../models/expenses";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { expensesApi } from "../../services/expenses";

// Redux Toolkit created expense slice
// extraReducers: request that was handled by the api sets the state here
// reducers: these functions are used to modify (sort, filter) state data
export const expenseSlice = createSlice({
  name: "expenses",
  initialState: { data: [] } as ExpenseFetchState,
  reducers: {
    sortByDate: (state: ExpenseFetchState) => {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      expensesApi.endpoints.currentMonth.matchFulfilled,
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

export default expenseSlice.reducer;
