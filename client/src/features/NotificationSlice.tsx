import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Notification } from "../models/notification";
import { Store } from "react-notifications-component";

// initial state for notification component
const initialState = {
  title: "",
  message: "",
  type: "success",
};

// Redux Toolkit create slice
// reducers: notification is used to generate a new notification
// it can be called from anywhere, to display notification with provided prop data
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    // Function to generate a new notification
    // takes title/message/type as arguments
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
