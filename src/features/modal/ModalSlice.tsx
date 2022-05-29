import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ExpenseModalState } from "../../models/expenses";

const initialState = {
  isOpen: false,
  editable: false,
  data: {},
} as ExpenseModalState;

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state: any, action: PayloadAction<ExpenseModalState>) => {
      state.isOpen = action.payload.isOpen;
      state.editable = action.payload.editable;
      state.data = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
