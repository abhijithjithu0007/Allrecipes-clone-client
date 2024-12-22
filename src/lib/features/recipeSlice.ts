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
  loading: {
    getAllrecipes: boolean;
    getRecipeByMeal: boolean;
    getRecipeByIngredient: boolean;
    getRecipeByCuisine: boolean;
  };
  error: {
    getAllrecipes: string | null;
    getRecipeByMeal: string | null;
    getRecipeByIngredient: string | null;
    getRecipeByCuisine: string | null;
  };
}

const initialState: RecipeState = {
  recipes: [],
  status: "idle",
  loading: {
    getAllrecipes: false,
    getRecipeByMeal: false,
    getRecipeByIngredient: false,
    getRecipeByCuisine: false,
  },
  error: {
    getAllrecipes: null,
    getRecipeByMeal: null,
    getRecipeByIngredient: null,
    getRecipeByCuisine: null,
  },
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

export const getRecipeByIngredient = createAsyncThunk(
  "recipe/getRecipeByIngredient",
  async (ingredient: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/recipe/get-recipe-by-ingredient/${ingredient}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recipes"
      );
    }
  }
);

export const getRecipeByCuisine = createAsyncThunk(
  "recipe/getRecipeByCuisine",
  async (cuisine: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/recipe/get-recipe-by-cuisine/${cuisine}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recipes"
      );
    }
  }
);
export const getAllrecipes = createAsyncThunk(
  "recipe/getAllrecipes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/recipe/get-all-recipes`);
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
        state.error.getRecipeByMeal = null;
        state.loading.getRecipeByMeal = true;
      })
      .addCase(getRecipeByMeal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload.data;
        state.loading.getRecipeByMeal = false;
      })
      .addCase(getRecipeByMeal.rejected, (state, action) => {
        state.status = "failed";
        state.error.getRecipeByMeal = action.payload as string;
      })
      .addCase(getRecipeByIngredient.pending, (state) => {
        state.status = "loading";
        state.error.getRecipeByIngredient = null;
        state.loading.getRecipeByIngredient = true;
      })
      .addCase(getRecipeByIngredient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload.data;
        state.loading.getRecipeByIngredient = false;
      })
      .addCase(getRecipeByIngredient.rejected, (state, action) => {
        state.status = "failed";
        state.error.getRecipeByIngredient = action.payload as string;
        state.loading.getRecipeByIngredient = false;
      })
      .addCase(getRecipeByCuisine.pending, (state) => {
        state.status = "loading";
        state.error.getRecipeByCuisine = null;
        state.loading.getRecipeByCuisine = true;
      })
      .addCase(getRecipeByCuisine.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload.data;
        state.loading.getRecipeByCuisine = false;
      })
      .addCase(getRecipeByCuisine.rejected, (state, action) => {
        state.status = "failed";
        state.error.getRecipeByCuisine = action.payload as string;
        state.loading.getRecipeByCuisine = false;
      })
      .addCase(getAllrecipes.pending, (state) => {
        state.status = "loading";
        state.error.getAllrecipes = null;
        state.loading.getAllrecipes = true;
      })
      .addCase(getAllrecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload.data;
        state.loading.getAllrecipes = false;
      })
      .addCase(getAllrecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error.getAllrecipes = action.payload as string;
        state.loading.getAllrecipes = false;
      });
  },
});

export default recipeSlice.reducer;
