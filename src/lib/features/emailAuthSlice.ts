import axiosInstance from "@/utils/axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface EmailAuthState {
  email: string;
  currentStep: "emailInput" | "otpInput" | "";
  currrentStepOfLogin: "emailInput" | "otpInput" | "";
  otp: string;
  loading: {
    sendOtp: boolean;
    sendOtpForLogin: boolean;
    verifyOtp: boolean;
    verifyOtpForLogin: boolean;
  };
  error: {
    sendOtp: string | null;
    sendOtpForLogin: string | null;
    verifyOtp: string | null;
    verifyOtpForLogin: string | null;
  };
}

const initialState: EmailAuthState = {
  email: "",
  currentStep: "",
  currrentStepOfLogin: "",
  loading: {
    sendOtp: false,
    sendOtpForLogin: false,
    verifyOtp: false,
    verifyOtpForLogin: false,
  },
  error: {
    sendOtp: null,
    verifyOtp: null,
    sendOtpForLogin: null,
    verifyOtpForLogin: null,
  },
  otp: "",
};

export const sendOtp = createAsyncThunk(
  "emailAuth/sendOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/sendOtp",
        { email },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      console.log("Error sending OTP:", error.response?.data);
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
      const response = await axiosInstance.post("/auth/verifyOtp", {
        email,
        otp,
      });

      if (response.status === 200) {
        Cookies.set("logged", "true", { path: "/" });
      }
      return response.data;
    } catch (error: any) {
      console.log("Error verifying OTP:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify OTP"
      );
    }
  }
);

export const sendOtpForLogin = createAsyncThunk(
  "emailAuth/sendOtpForLogin",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/send-login-otp",
        {
          email,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      console.log("Error sending OTP:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

export const verifyOtpForLogin = createAsyncThunk(
  "emailAuth/verifyOtpForLogin",
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/verify-login-otp", {
        email,
        otp,
      });

      if (response.status === 200) {
        Cookies.set("logged", "true", { path: "/" });
      }
      return response.data;
    } catch (error: any) {
      console.log("Error verifying OTP:", error.response?.data);
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
    goToEmailInputForLogin(state) {
      state.currrentStepOfLogin = "emailInput";
    },
    goToOtpInputForLogin(state) {
      state.currrentStepOfLogin = "otpInput";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading.sendOtp = true;
        state.error.sendOtp = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading.sendOtp = false;
        state.currentStep = "otpInput";
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading.sendOtp = false;
        state.error.sendOtp = action.payload as string;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading.verifyOtp = true;
        state.error.verifyOtp = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading.verifyOtp = false;
        state.currentStep = "";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading.verifyOtp = false;
        state.error.verifyOtp = action.payload as string;
      })
      .addCase(sendOtpForLogin.pending, (state) => {
        state.loading.sendOtpForLogin = true;
        state.error.sendOtpForLogin = null;
      })
      .addCase(sendOtpForLogin.fulfilled, (state) => {
        state.loading.sendOtpForLogin = false;
        state.currrentStepOfLogin = "otpInput";
      })
      .addCase(sendOtpForLogin.rejected, (state, action) => {
        state.loading.sendOtpForLogin = false;
        state.error.sendOtpForLogin = action.payload as string;
      })
      .addCase(verifyOtpForLogin.pending, (state) => {
        state.loading.verifyOtpForLogin = true;
        state.error.verifyOtpForLogin = null;
      })
      .addCase(verifyOtpForLogin.fulfilled, (state) => {
        state.loading.verifyOtpForLogin = false;
        state.currrentStepOfLogin = "";
      })
      .addCase(verifyOtpForLogin.rejected, (state, action) => {
        state.loading.verifyOtpForLogin = false;
        state.error.verifyOtpForLogin = action.payload as string;
      });
  },
});

export const {
  setEmail,
  goToOtpInput,
  goToEmailInput,
  setOtp,
  goToOtpInputForLogin,
  goToEmailInputForLogin,
} = emailAuthSlice.actions;
export default emailAuthSlice.reducer;
