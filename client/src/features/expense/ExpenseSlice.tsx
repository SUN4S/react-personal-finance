import { ExpenseFetchState, ExpenseState } from "../../models/expenses";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { expensesApi } from "../../services/expenses";

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
