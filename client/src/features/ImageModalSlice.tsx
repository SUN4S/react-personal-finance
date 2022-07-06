import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ImageModalState {
  isOpen: boolean;
  src?: string;
}

// defining initial state for the image modal
const initialState = {
  isOpen: false,
  src: "",
} as ImageModalState;

// Redux Toolkit modal slice
// reducer: toggleImageModal is used to open and provide src data to the modal
// this is used to pass props to image modal component
export const imageModalSlice = createSlice({
  name: "imageModal",
  initialState,
  reducers: {
    // Function to handle modal state
    toggleImageModal: (
      state: ImageModalState,
      action: PayloadAction<ImageModalState>
    ) => {
      // payload isOpen value is REQUIRED
      // src value can be passed when needed
      state.isOpen = action.payload.isOpen;
      state.src = action.payload.src;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleImageModal } = imageModalSlice.actions;

export default imageModalSlice.reducer;
