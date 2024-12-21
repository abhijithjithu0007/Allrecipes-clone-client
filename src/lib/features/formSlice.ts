import axiosInstance from "@/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PrepTime {
  value: string;
  unit: string;
}

interface FormState {
  title: string;
  description: string;
  ingredients: string[];
  directions: string[];
  servings: string;
  prepTime: PrepTime;
  mealType: string;
  cuisine: string;
  notes: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  responseMessage: string | null;
}

const initialState: FormState = {
  title: "",
  description: "",
  ingredients: [],
  directions: [],
  servings: "",
  prepTime: { value: "", unit: "mins" },
  mealType: "",
  cuisine: "",
  notes: "",
  status: "idle",
  error: null,
  responseMessage: "",
};

export const addNewRecipe = createAsyncThunk(
  "form/addNewRecipe",
  async (data: FormState, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/recipe/add-recipe", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add new recipe"
      );
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setIngredients: (state, action: PayloadAction<string[]>) => {
      state.ingredients = action.payload;
    },
    setDirections: (state, action: PayloadAction<string[]>) => {
      state.directions = action.payload;
    },
    setServings: (state, action: PayloadAction<string>) => {
      state.servings = action.payload;
    },
    setPrepTime: (state, action: PayloadAction<PrepTime>) => {
      state.prepTime = action.payload;
    },
    setMealType: (state, action: PayloadAction<string>) => {
      state.mealType = action.payload;
    },
    setCuisine: (state, action: PayloadAction<string>) => {
      state.cuisine = action.payload;
    },
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewRecipe.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.responseMessage = null;
      })
      .addCase(addNewRecipe.fulfilled, (state) => {
        state.status = "succeeded";
        state.responseMessage = "Recipe added successfully";
      })
      .addCase(addNewRecipe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  setTitle,
  setDescription,
  setIngredients,
  setDirections,
  setServings,
  setPrepTime,
  setMealType,
  setCuisine,
  setNotes,
} = formSlice.actions;

export const selectForm = (state: { form: FormState }) => state.form;

export const submitForm = () => (dispatch: any, getState: any) => {
  const formData = getState().form;
  dispatch(addNewRecipe(formData));
};

export default formSlice.reducer;
