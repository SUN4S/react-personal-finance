import { TypedUseSelectorHook, useSelector } from "react-redux";

import { baseApi } from "../services/baseApi";
import budgetReducer from "../features/BudgetSlice";
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/ExpenseSlice";
import historyReducer from "../features/HistorySlice";
import imageModalReducer from "../features/ImageModalSlice";
import modalReducer from "../features/ModalSlice";
import notificationReducer from "../features/NotificationSlice";
import reportsReducer from "../features/ReportsSlice";
import userReducer from "../features/UserSlice";

// Redux store, that hold whole application state tree
// middleware refers to api created with Redux Toolkit
// Redux Toolkit api is a more compact way to write server requests
// exported api functions alse have extra functionality, such as load-state, success-state, etc.
export const store = configureStore({
  reducer: {
    user: userReducer,
    budget: budgetReducer,
    expenses: expenseReducer,
    history: historyReducer,
    notification: notificationReducer,
    modal: modalReducer,
    reports: reportsReducer,
    imageModal: imageModalReducer,
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
