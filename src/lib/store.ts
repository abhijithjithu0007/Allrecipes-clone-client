// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    // user: userReducer,
  },
});

// Types for the Redux state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
