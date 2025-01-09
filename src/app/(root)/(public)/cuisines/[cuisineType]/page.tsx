"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { cuisineImage } from "@/components/consts/recipes-banner";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { getRecipeByCuisine } from "@/lib/features/recipeSlice";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import { useSaveRecipe } from "@/hook/useCustomHook";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosHeartEmpty } from "react-icons/io";

export default function Page() {
  const { cuisineType } = useParams<{ cuisineType: string }>();
  const passingCuisineType =
    cuisineType.charAt(0).toUpperCase() + cuisineType.slice(1);
  const dispatch: AppDispatch = useDispatch();

  const imageUrl = cuisineImage[cuisineType as keyof typeof cuisineImage];

  const { recipes } = useSelector((state: RootState) => state.recipe);
  const { getRecipeByCuisineLoad } = useSelector(
    (state: RootState) => state.recipe.loading
  );
  useEffect(() => {
    dispatch(getRecipeByCuisine(passingCuisineType));
  }, [passingCuisineType]);

  const { mutate } = useSaveRecipe();

  const handleHeartClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    mutate(id, {
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "dark",
          });
        } else {
          alert("An unexpected error occurred.");
        }
      },
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
      },
    });
  };

  return (
    <div>
      <div style={{ width: "100%", height: "300px", position: "relative" }}>
        <Image
          src={imageUrl.image}
          alt={cuisineType}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>

      <div className="p-3 sm:p-10 text-center">
        <div className="px-5 sm:px-20">
          <div className="pb-10 flex items-center justify-center gap-2 uppercase font-bold text-black">
            <h1 className="">Recipes</h1>
            <MdOutlineKeyboardArrowRight />
            <h1 className="">cuisine</h1>
            <MdOutlineKeyboardArrowRight />
            <h1>{cuisineType}</h1>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="uppercase text-5xl font-extrabold">{cuisineType}</h1>
            <p>{imageUrl.text}</p>
          </div>
        </div>
      </div>
      <h1 className="uppercase text-3xl underline text-center p-10 font-extrabold">
        EXPLORE <span className="text-customColor">{cuisineType}</span> FOODS
      </h1>

      {getRecipeByCuisineLoad ? (
        <div className="grid grid-cols-1 gap-5 p-10 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, ind) => (
            <div key={ind} className="max-w-sm bg-white relative">
              <Skeleton variant="rectangular" width="100%" height={250} />
              <div className="pt-5">
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="80%" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 p-10 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, ind) => (
            <Link key={ind} href={`/recipe/${recipe._id}`}>
              <div className="max-w-sm bg-white relative">
                <Image
                  className="rounded-t-lg w-full h-64 object-cover"
                  src={
                    recipe?.image ||
                    "https://www.allrecipes.com/img/icons/recipe-add-photo-square.jpg"
                  }
                  alt="Recipe"
                  width={350}
                  height={80}
                />
                <div
                  className="absolute top-2 right-2 bg-customColor rounded-full p-3"
                  onClick={(e) => handleHeartClick(e, recipe._id)}
                >
                  <IoIosHeartEmpty
                    size={24}
                    className="text-white cursor-pointer"
                  />
                </div>
                <div className="pt-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {recipe.title}
                  </h5>
                  <p className="mb-3 font-bold text-gray-500 dark:text-gray-400">
                    {recipe.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
