"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import React, { useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ImSpoonKnife } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { getRecipeById } from "@/lib/features/recipeSlice";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const dispatch: AppDispatch = useDispatch();
  const { recipeId } = useParams<{ recipeId: string }>();
  const { recipes } = useSelector((state: RootState) => state.recipe);
  const { getRecipeByIdLoad } = useSelector(
    (state: RootState) => state.recipe.loading
  );

  useEffect(() => {
    if (recipeId) {
      dispatch(getRecipeById(recipeId));
    }
  }, [recipeId, dispatch]);

  const recipe = recipes.length > 0 ? recipes[0] : null;

  if (getRecipeByIdLoad) {
    return <div>Loading recipe...</div>;
  }

  return (
    <div>
      <div className="p-5 pl-40">
        <div>
          <h3 className="uppercase font-bold flex items-center gap-2">
            Recipes <MdOutlineKeyboardArrowRight />
            <Link
              href={`/meals/${recipe?.mealType.toLowerCase()}`}
              className="hover:underline"
            >
              {recipe?.mealType}
            </Link>
          </h3>
          <h1 className="text-5xl font-bold pt-8">{recipe?.title}</h1>
          <p className="text-gray-700 pt-6 pb-4">{recipe?.description}</p>
          <Image
            src="https://www.allrecipes.com/img/icons/recipe-add-photo-square.jpg"
            alt=""
            width={500}
            height={500}
            className="rounded-md"
          />
          <div className="grid grid-cols-2 gap-5 border border-gray-500 border-t-8 border-t-[#e7ab46] rounded-md p-5 w-1/3 mt-5">
            <p className="flex flex-col items-center">
              Prep time:
              <span>
                {recipe?.prepTime?.value} {recipe?.prepTime?.unit}
              </span>
            </p>
            <p className="flex flex-col items-center">
              Servings:
              <span>
                {recipe?.servings} to {parseInt(recipe?.servings || "0") + 1}
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-2 pt-10">
            <Switch id="airplane-mode" />
            <Label htmlFor="cook-mode" className="text-base font-bold">
              Cook Mode{" "}
              <span className="text-gray-700 font-medium text-sm">
                (Keep screen wake)
              </span>
            </Label>
          </div>

          <div className="mt-7">
            <h1 className="font-bold text-4xl">Ingredients</h1>
            <div className="p-4 mt-6">
              <ul className="flex flex-col gap-4 pb-3 list-disc pl-5 marker:text-yellow-500">
                {recipe?.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-7">
            <h1 className="text-4xl font-bold">Directions</h1>
            <div className="mt-8 p-4">
              {recipe?.directions?.map((direction, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-bold">Step {index + 1}</h3>
                  <p>{direction}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 p-6">
            <button className="bg-customColor flex items-center gap-2 text-sm font-bold p-4 pl-20 pr-20 text-white hover:bg-orange-600">
              <h1> I MADE IT</h1>
              <ImSpoonKnife />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
