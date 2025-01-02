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
