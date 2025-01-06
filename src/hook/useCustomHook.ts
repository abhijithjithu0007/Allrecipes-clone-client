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

const updateUserProfile = async ({
  name,
  profileImage,
}: {
  name: string;
  profileImage: string;
}) => {
  const response = await axiosInstance.put("/user/update-profile", {
    name,
    profileImage,
  });
  if (response.status !== 200) {
    throw new Error("Failed to update profile");
  }
  return response.data;
};

export const useUpateUserProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile,
    mutationKey: ["updateUserProfile"],
  });
};


