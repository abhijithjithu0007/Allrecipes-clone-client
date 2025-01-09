"use client";

import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useRemoveSavedRecipe } from "@/hook/useCustomHook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Skeleton } from "@mui/material";

interface SavedRecipe {
  _id: string;
  title: string;
  image: string;
  description: string;
}

export default function SavedRecipe() {
  const [selectedRecipe, setSelectedRecipe] = useState<SavedRecipe | null>(
    null
  );

  const fetchSavedRecipe = async () => {
    const response = await axiosInstance.get(`/recipe/get-saved-recipes`);
    if (response.status !== 200) {
      throw new Error("Something went wrong");
    }
    return response.data;
  };

  const { data, isLoading, refetch } = useQuery<{ data: SavedRecipe[] }, Error>(
    {
      queryKey: ["fetchSavedRecipe"],
      queryFn: fetchSavedRecipe,
    }
  );

  const { mutate } = useRemoveSavedRecipe();

  const handleRemove = (recipeId: string) => {
    mutate(recipeId, {
      onSuccess: (response) => {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        refetch();
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          alert("An unexpected error occurred.");
        }
      },
    });
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl md:text-4xl lg:text-5xl text-center font-extrabold font-serif">
        My Saved Recipes
      </h1>
      <div>
        <h1 className="text-xl font-extrabold mt-8">
          {data?.data.length == 0 ? "" : "Recently Saved"}
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="flex gap-4 flex-wrap justify-center">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="max-w-[170px] border cursor-pointer">
                  <Skeleton variant="rectangular" width={170} height={170} />
                  <Skeleton variant="text" width={150} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-4">
            {data?.data.length === 0 ? (
              <p className="text-center text-gray-500">
                There are no saved recipes.
              </p>
            ) : (
              <>
                <div className="flex gap-2 flex-wrap justify-center">
                  {data?.data.map((recipe) => (
                    <div
                      key={recipe._id}
                      className="max-w-[170px] border cursor-pointer"
                      onClick={() => setSelectedRecipe(recipe)}
                    >
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

                {selectedRecipe && (
                  <Dialog
                    open={!!selectedRecipe}
                    onOpenChange={() => setSelectedRecipe(null)}
                  >
                    <DialogContent className="p-0 border-none">
                      <DialogTitle className="hidden"></DialogTitle>
                      <DialogHeader className="p-0">
                        <div className="flex gap-6">
                          <div className="w-full">
                            <Image
                              src={
                                selectedRecipe.image || "/images/loginImg.png"
                              }
                              alt={selectedRecipe.title || "Recipe Image"}
                              width={400}
                              height={400}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="w-full min-h-[400px] flex flex-col justify-between gap-10 pt-7 p-4 pb-7">
                            <div className="flex flex-col gap-4">
                              <h1 className="text-xl font-extrabold">
                                {selectedRecipe.title}
                              </h1>

                              <p className="text-sm text-gray-700 mt-2">
                                {selectedRecipe.description}
                              </p>
                              <Link href={`/recipe/${selectedRecipe._id}`}>
                                {" "}
                                <Button
                                  variant="ghost"
                                  className="w-full border-none p-3 uppercase bg-customColor text-md font-bold text-white rounded-none"
                                >
                                  View Recipe
                                </Button>
                              </Link>
                            </div>
                            <DialogClose>
                              <div
                                onClick={() => handleRemove(selectedRecipe._id)}
                                className="flex items-center gap-1 cursor-pointer hover:underline"
                              >
                                <MdDelete />
                                <p className="text-xs">
                                  Remove from Saved Recipes
                                </p>
                              </div>
                            </DialogClose>
                          </div>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
