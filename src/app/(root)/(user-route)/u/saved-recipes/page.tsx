"use client";

import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

interface SavedRecipe {
  _id: string;
  title: string;
  image: string;
  description: string;
}

export default function page() {
  const fetchSavedRecipe = async () => {
    const response = await axiosInstance.get(`/recipe/get-saved-recipes`);
    if (response.status !== 200) {
      throw new Error("Some thing went wrong");
    }
    return response.data;
  };

  const { data } = useQuery<{ data: SavedRecipe[] }, Error>({
    queryKey: ["fetchSavedRecipe"],
    queryFn: fetchSavedRecipe,
  });

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-5xl font-extrabold font-serif">My Saved Recipes</h1>
      <div>
        <h1 className="text-xl font-extrabold mt-4">Recently Saved</h1>
        <div className="flex flex-col items-center mt-4">
          {data?.data.length === 0 ? (
            <p className="text-center text-gray-500">
              There are no saved recipes.
            </p>
          ) : (
            <div className="flex gap-2 flex-wrap justify-center">
              {data?.data.map((recipe, key) => (
                <div key={key} className="max-w-[170px] border">
                  <Image
                    src={
                      recipe.image ||
                      "http://localhost:3000/_next/image?url=https%3A%2F%2Fwww.allrecipes.com%2Fimg%2Ficons%2Frecipe-add-photo-square.jpg&w=384&q=75"
                    }
                    alt={recipe.title || "Recipe Image"}
                    width={170}
                    height={170}
                    className="object-cover w-[150px] h-[150px]"
                  />
                  <h3 className="font-bold text-sm p-1">{recipe.title}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
