import { configureStore } from "@reduxjs/toolkit";
import emailAuthSlice from "./features/emailAuthSlice";
// import googleAuthSlice from "./features/googleAuthSlice";

export const store = configureStore({
  reducer: {
    emailAuth: emailAuthSlice,
    // googleAuth: googleAuthSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
