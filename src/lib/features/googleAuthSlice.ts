import axiosInstance from "@/utils/axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
interface googleAuthState {
  email: string;
  name: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: googleAuthState = {
  email: "",
  name: null,
  loading: false,
  error: null,
};

export const googleRegister = createAsyncThunk(
  "googleAuth/googleRegister",
  async (
    { name, email }: { name: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
      });

      return response.data;
    } catch (error: any) {
      console.log("Google Register Error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to register"
      );
    }
  }
);
export const googleLogin = createAsyncThunk(
  "auth/login",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/g-login", { email });

      return response.data;
    } catch (error: any) {
      console.log("Login Error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to login"
      );
    }
  }
);

const googleAuthSlice = createSlice({
  name: "emailAuth",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setEmail, setName } = googleAuthSlice.actions;
export default googleAuthSlice.reducer;
