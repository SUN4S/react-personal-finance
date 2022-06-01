import { TypedUseSelectorHook, useSelector } from "react-redux";

import { baseApi } from "../services/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/expense/ExpenseSlice";
import modalReducer from "../features/modal/ModalSlice";
import notificationReducer from "../features/notification/NotificationSlice";

// Redux store, that hold whole application state tree
// middleware refers to api created with Redux Toolkit
// Redux Toolkit api is a more compact way to write server requests
// exported api functions alse have extra functionality, such as load-state, success-state, etc.
export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    notification: notificationReducer,
    modal: modalReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
