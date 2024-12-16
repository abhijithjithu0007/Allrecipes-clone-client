import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface EmailAuthState {
  email: string;
  name: string | null;
  currentStep: "emailInput" | "otpInput" | "";
  loading: boolean;
  error: string | null;
  otp: string;
}

const initialState: EmailAuthState = {
  email: "",
  name: null,
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
        { email }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error sending OTP:", error.response?.data);
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
        { email, otp }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error verifying OTP:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify OTP"
      );
    }
  }
);

export const googleRegister = createAsyncThunk(
  "emailAuth/googleRegister",
  async (
    { name, email }: { name: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        { name, email }
      );
      console.log("Google Register Response:", response.data); // Debug log
      return response.data;
    } catch (error: any) {
      console.error("Google Register Error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to register"
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
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
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
      })
      .addCase(googleRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleRegister.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(googleRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setEmail, goToOtpInput, goToEmailInput, setOtp, setName } =
  emailAuthSlice.actions;
export default emailAuthSlice.reducer;
