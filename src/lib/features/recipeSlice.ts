import axiosInstance from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PrepTime {
  value: string;
  unit: string;
}
interface Recipe {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  directions: string[];
  prepTime: PrepTime;
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
    getAllrecipesLoad: boolean;
    getRecipeByMealLoad: boolean;
    getRecipeByIngredientLoad: boolean;
    getRecipeByCuisineLoad: boolean;
    searchRecipeLoad: boolean;
    getRecipeByIdLoad: boolean;
  };
  error: {
    getAllrecipesError: string | null;
    getRecipeByMealError: string | null;
    getRecipeByIngredientError: string | null;
    getRecipeByCuisineError: string | null;
    searchRecipeError: string | null;
    getRecipeByIdError: string | null;
  };
}

const initialState: RecipeState = {
  recipes: [],
  status: "idle",
  loading: {
    getAllrecipesLoad: false,
    getRecipeByMealLoad: false,
    getRecipeByIngredientLoad: false,
    getRecipeByCuisineLoad: false,
    searchRecipeLoad: false,
    getRecipeByIdLoad: false,
  },
  error: {
    getAllrecipesError: null,
    getRecipeByMealError: null,
    getRecipeByIngredientError: null,
    getRecipeByCuisineError: null,
    searchRecipeError: null,
    getRecipeByIdError: null,
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
export const searchRecipes = createAsyncThunk(
  "recipe/searchRecipes",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/recipe/search-recipe/${query}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recipes"
      );
    }
  }
);

export const getRecipeById = createAsyncThunk(
  "recipe/getRecipeById",
  async (recipeId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/recipe/get-recipe-by-id/${recipeId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recipe"
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
        state.error.getRecipeByMealError = null;
        state.loading.getRecipeByMealLoad = true;
      })
      .addCase(getRecipeByMeal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload.data;
        state.loading.getRecipeByMealLoad = false;
      })
      .addCase(getRecipeByMeal.rejected, (state, action) => {
        state.status = "failed";
        state.error.getRecipeByMealError = action.payload as string;
      })
      .addCase(getRecipeByIngredient.pending, (state) => {
        state.status = "loading";
        state.error.getRecipeByIngredientError = null;
        state.loading.getRecipeByIngredientLoad = true;
      })
      .addCase(getRecipeByIngredient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload.data;
        state.loading.getRecipeByIngredientLoad = false;
      })
      .addCase(getRecipeByIngredient.rejected, (state, action) => {
        state.status = "failed";
        state.error.getRecipeByIngredientError = action.payload as string;
        state.loading.getRecipeByIngredientLoad = false;
      })
      .addCase(getRecipeByCuisine.pending, (state) => {
        state.status = "loading";
        state.error.getRecipeByCuisineError = null;
        state.loading.getRecipeByCuisineLoad = true;
      })
      .addCase(getRecipeByCuisine.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload.data;
        state.loading.getRecipeByCuisineLoad = false;
      })
      .addCase(getRecipeByCuisine.rejected, (state, action) => {
        state.status = "failed";
        state.error.getRecipeByCuisineError = action.payload as string;
        state.loading.getRecipeByCuisineLoad = false;
      })
      .addCase(getAllrecipes.pending, (state) => {
        state.status = "loading";
        state.error.getAllrecipesError = null;
        state.loading.getAllrecipesLoad = true;
      })
      .addCase(getAllrecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload.data;
        state.loading.getAllrecipesLoad = false;
      })
      .addCase(getAllrecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error.getAllrecipesError = action.payload as string;
        state.loading.getAllrecipesLoad = false;
      })
      .addCase(searchRecipes.pending, (state) => {
        state.status = "loading";
        state.error.searchRecipeError = null;
        state.loading.searchRecipeLoad = true;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload.data;
        state.loading.getAllrecipesLoad = false;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error.searchRecipeError = action.payload as string;
        state.loading.searchRecipeLoad = false;
      })
      .addCase(getRecipeById.pending, (state) => {
        state.status = "loading";
        state.error.getRecipeByIdError = null;
        state.loading.getRecipeByIdLoad = true;
      })
      .addCase(getRecipeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = [action.payload.data];
        state.loading.getRecipeByIdLoad = false;
      })
      .addCase(getRecipeById.rejected, (state, action) => {
        state.status = "failed";
        state.error.getRecipeByIdError = action.payload as string;
        state.loading.getRecipeByIdLoad = false;
      });
  },
});

export default recipeSlice.reducer;
