import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface EmailAuthState {
  email: string;
  currentStep: "emailInput" | "otpInput" | "";
  loading: boolean;
  error: string | null;
  otp: string;
}

const initialState: EmailAuthState = {
  email: "",
  currentStep: "",
  loading: false,
  error: null,
  otp: "",
};

export const sendOtp = createAsyncThunk(
  "emailAuth/sendOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/sendOtp",
        {
          email,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "emailAuth/verifyOtp",
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/verifyOtp",
        {
          email,
          otp,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify OTP"
      );
    }
  }
);

const emailAuthSlice = createSlice({
  name: "emailAuth",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setOtp(state, action: PayloadAction<string>) {
      state.otp = action.payload;
    },
    goToOtpInput(state) {
      state.currentStep = "otpInput";
    },
    goToEmailInput(state) {
      state.currentStep = "emailInput";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.currentStep = "otpInput";
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.currentStep = "";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setEmail, goToOtpInput, goToEmailInput, setOtp } =
  emailAuthSlice.actions;
export default emailAuthSlice.reducer;
