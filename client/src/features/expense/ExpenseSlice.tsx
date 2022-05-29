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
      expensesApi.endpoints.expenses.matchFulfilled,
      (state, action?: PayloadAction<ExpenseState[]>) => {
        if (action?.payload) {
          const currentMonth = new Date().getMonth() + 1;
          const currentYear = new Date().getFullYear();

          const processedArray: ExpenseState[] = action.payload
            .sort((a, b) => {
              if (b.date > a.date) return 1;
              if (b.date < a.date) return -1;
              return 0;
            })
            .filter((item) => {
              const year = new Date(item.date).getFullYear();
              const month = new Date(item.date).getMonth() + 1;
              return currentMonth === month && currentYear === year;
            });

          state.data = processedArray;
        }
      }
    );
  },
});

// Action creators are generated for each case reducer function
//export const {} = expenseSlice.actions;

export default expenseSlice.reducer;
