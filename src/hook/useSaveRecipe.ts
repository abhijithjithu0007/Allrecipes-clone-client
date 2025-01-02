import axiosInstance from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
const saveRecipe = async (recipeId: string) => {
  const response = await axiosInstance.post(`/recipe/save-recipe/${recipeId}`);
  return response.data;
};

export const useSaveRecipe = () => {
  return useMutation({
    mutationFn: saveRecipe,
    mutationKey: ["saveRecipe"],
  });
};

const removeSavedRecipe = async (recipeId: string) => {
  const response = await axiosInstance.delete(
    `/recipe/delete-saved-recipe/${recipeId}`
  );
  return response.data;
};

export const useRemoveSavedRecipe = () => {
  return useMutation({
    mutationFn: removeSavedRecipe,
    mutationKey: ["removeSavedRecipe"],
  });
};
