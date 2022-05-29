import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Notification } from "../../models/notification";
import { Store } from "react-notifications-component";

const initialState = {
  title: "",
  message: "",
  type: "success",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notification: (state: any, action: PayloadAction<Notification>) => {
      Store.addNotification({
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type,
        insert: "top",
        container: "top-right",
        slidingExit: {
          duration: 800,
          timingFunction: "ease-out",
          delay: 0,
        },
        dismiss: {
          duration: 2000,
        },
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { notification } = notificationSlice.actions;

export default notificationSlice.reducer;
