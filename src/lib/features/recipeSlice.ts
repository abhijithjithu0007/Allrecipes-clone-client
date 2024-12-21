import axiosInstance from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  directions: string[];
  servings: string;
  mealType: string;
  cuisine: string;
  notes: string;
  image: string;
}

interface RecipeState {
  recipes: Recipe[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  responseMessage: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  status: "idle",
  error: null,
  responseMessage: null,
};

export const getRecipeByMeal = createAsyncThunk(
  "recipe/getRecipeByMeal",
  async (meal: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/recipe/get-recipe-by-meals/${meal}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recipes"
      );
    }
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipeByMeal.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.responseMessage = null;
      })
      .addCase(getRecipeByMeal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload.data;
      })
      .addCase(getRecipeByMeal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default recipeSlice.reducer;
