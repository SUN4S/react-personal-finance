import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserResponse, UserState } from "../models/user";

import { userApi } from "../services/user";

// Redux Toolkit created user slice
// extraReducers: request that was handled by the api sets the state here
export const userSlice = createSlice({
  name: "user",
  initialState: { userData: {} } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, action?: PayloadAction<UserResponse>) => {
        if (action?.payload) {
          const userObject = {
            username: action.payload.username,
            image: action.payload.image,
          };
          state.userData = userObject;
        }
      }
    );
    builder.addMatcher(
      userApi.endpoints.isLoggedIn.matchFulfilled,
      (state, action?: PayloadAction<UserResponse>) => {
        if (action?.payload) {
          const userObject = {
            username: action.payload.username,
            image: action.payload.image,
          };
          state.userData = userObject;
        }
      }
    );
  },
});

export default userSlice.reducer;
