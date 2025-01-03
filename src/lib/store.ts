import { configureStore } from "@reduxjs/toolkit";
import emailAuthSlice from "./features/emailAuthSlice";
import googleAuthSlice from "./features/googleAuthSlice";
import formSlice from "./features/formSlice";
import recipeSlice from "./features/recipeSlice";

export const store = configureStore({
  reducer: {
    emailAuth: emailAuthSlice,
    googleAuth: googleAuthSlice,
    form: formSlice,
    recipe: recipeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
