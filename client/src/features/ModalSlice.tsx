import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ExpenseModalState } from "../models/expenses";

// defining initial state for the modal
const initialState = {
  isOpen: false,
  editable: false,
  data: {},
} as ExpenseModalState;

// Redux Toolkit modal slice
// reducer: toggleModal is used to open and provide data to the modal
// this is used to pass props to modal component
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Function to handle modal state
    toggleModal: (
      state: ExpenseModalState,
      action: PayloadAction<ExpenseModalState>
    ) => {
      state.isOpen = state.isOpen === true ? false : action.payload.isOpen;
      state.editable = action.payload.editable;
      state.data = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
