import { ExpenseFetchState, ExpenseState } from "../models/expenses";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { DateTime } from "luxon";
import { expensesApi } from "../services/expenses";

// Redux Toolkit created expense slice
// extraReducers: request that was handled by the api sets the state here
// reducers: these functions are used to modify (sort, filter) state data
export const expenseSlice = createSlice({
  name: "expenses",
  initialState: { data: [] } as ExpenseFetchState,
  reducers: {
    sortByDate: (
      state: ExpenseFetchState,
      action?: PayloadAction<{ sorted: boolean }>
    ) => {
      if (!action?.payload.sorted) {
        const newArray = state.data.sort((a, b) => {
          if (DateTime.fromISO(a.date) > DateTime.fromISO(b.date)) {
            return 1;
          } else if (DateTime.fromISO(a.date) < DateTime.fromISO(b.date)) {
            return -1;
          } else {
            return 0;
          }
        });
        state.data = newArray;
      } else {
        state.data = state.data.reverse();
      }
    },
    sortByCategory: (
      state: ExpenseFetchState,
      action?: PayloadAction<{ sorted: boolean }>
    ) => {
      if (!action?.payload.sorted) {
        const newArray = state.data.sort((a, b) => {
          if (a.category > b.category) return -1;
          else if (a.category < b.category) return 1;
          else return 0;
        });
        state.data = newArray;
      } else {
        state.data = state.data.reverse();
      }
    },
    sortByAmount: (
      state: ExpenseFetchState,
      action?: PayloadAction<{ sorted: boolean }>
    ) => {
      if (!action?.payload.sorted) {
        const newArray = state.data.sort((a, b) => {
          if (a.amount > b.amount) return -1;
          else if (a.amount < b.amount) return 1;
          else return 0;
        });
        state.data = newArray;
      } else {
        state.data = state.data.reverse();
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      // Function to add response data to store expense state
      expensesApi.endpoints.currentExpenseMonth.matchFulfilled,
      (state, action?: PayloadAction<ExpenseState[]>) => {
        if (action?.payload) {
          state.data = action.payload;
        }
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { sortByDate, sortByCategory, sortByAmount } =
  expenseSlice.actions;

export default expenseSlice.reducer;
