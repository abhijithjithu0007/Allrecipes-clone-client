import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmailAuthState {
  email: string;
  currentStep: "emailInput" | "otpInput" | "";
}

const initialState: EmailAuthState = {
  email: "",
  currentStep: "", // Default to email input
};

const emailAuthSlice = createSlice({
  name: "emailAuth",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    goToOtpInput(state) {
      state.currentStep = "otpInput";
    },
    goToEmailInput(state) {
      state.currentStep = "emailInput";
    },
  },
});

export const { setEmail, goToOtpInput, goToEmailInput } =
  emailAuthSlice.actions;
export default emailAuthSlice.reducer;
