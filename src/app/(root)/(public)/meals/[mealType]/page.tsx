"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { mealsImages } from "@/components/consts/recipes-banner";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { getRecipeByMeal } from "@/lib/features/recipeSlice";

export default function Page() {
  const { mealType } = useParams<{ mealType: string }>();
  const passingMealType = mealType.charAt(0).toUpperCase() + mealType.slice(1);
  const dispatch: AppDispatch = useDispatch();

  const imageUrl = mealsImages[mealType as keyof typeof mealsImages];

  const recipeData = useSelector((state: RootState) => state.recipe.recipes);
  useEffect(() => {
    dispatch(getRecipeByMeal(passingMealType));
  }, [passingMealType]);

  console.log(recipeData);

  return (
    <div>
      <div style={{ width: "100%", height: "300px", position: "relative" }}>
        <Image
          src={imageUrl}
          alt={mealType}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>

      <div className="p-10 text-center">
        <div className="pl-20 pr-20">
          <div className="pb-10">
            <h1 className="uppercase font-semibold">Recipes</h1>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="uppercase text-4xl font-extrabold">{mealType}</h1>
            <p>
              Create a delicious everyday breakfast or pull together an amazing
              brunch with top-rated recipes for pancakes and waffles, bacon and
              eggs, brunch casseroles, coffee cakes, muffins, quiche, and so
              much more.
            </p>
          </div>
        </div>
      </div>
      <h1 className="uppercase text-3xl underline text-center p-10 font-extrabold">
        EXPLORE <span className="text-customColor">{mealType}</span>
      </h1>
      <div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {/*image*/}
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
