// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import emailAuthSlice from "./features/emailAuthSlice";
// import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    emailAuth: emailAuthSlice,
  },
});

// Types for the Redux state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
