import axiosInstance from "@/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
  image: string;
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
  image: "",
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

export const uploadImage = createAsyncThunk<string, File>(
  "upload/uploadImage",
  async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "allrecipes");
    formData.append("folder", "recipes");

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CLODINARY_URL || "",
        formData
      );
      return response.data.secure_url;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Upload failed");
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
    resetImage: (state) => {
      state.image = "";
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
      state.responseMessage = null;
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
        state.description = "";
        state.title = "";
        state.ingredients = [];
        state.directions = [];
        state.servings = "";
        state.prepTime = { value: "", unit: "mins" };
        state.mealType = "";
        state.cuisine = "";
        state.notes = "";
      })
      .addCase(addNewRecipe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(uploadImage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.image = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
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
  resetImage,
  resetStatus,
} = formSlice.actions;

export const selectForm = (state: { form: FormState }) => state.form;

export const submitForm = () => (dispatch: any, getState: any) => {
  const formData = getState().form;
  dispatch(addNewRecipe(formData));
};

export default formSlice.reducer;
