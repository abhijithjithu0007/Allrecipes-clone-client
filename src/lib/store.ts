import { configureStore } from "@reduxjs/toolkit";
import emailAuthSlice from "./features/emailAuthSlice";

export const store = configureStore({
  reducer: {
    emailAuth: emailAuthSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
