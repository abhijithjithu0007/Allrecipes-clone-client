import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
      });
  },
});

export const { setEmail, setName } = googleAuthSlice.actions;
export default googleAuthSlice.reducer;
