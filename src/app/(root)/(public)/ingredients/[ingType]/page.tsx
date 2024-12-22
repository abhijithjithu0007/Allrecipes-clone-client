"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { ingredientsImages } from "@/components/consts/recipes-banner";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { getRecipeByIngredient } from "@/lib/features/recipeSlice";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Page() {
  const { ingType } = useParams<{ ingType: string }>();
  const passingIngType = ingType.charAt(0).toUpperCase() + ingType.slice(1);
  const dispatch: AppDispatch = useDispatch();

  const imageUrl = ingredientsImages[ingType as keyof typeof ingredientsImages];

  const { recipes } = useSelector((state: RootState) => state.recipe);
  useEffect(() => {
    dispatch(getRecipeByIngredient(passingIngType));
  }, [passingIngType]);

  return (
    <div>
      <div style={{ width: "100%", height: "300px", position: "relative" }}>
        <Image
          src={imageUrl.image}
          alt=""
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>

      <div className="p-10 text-center">
        <div className="pl-20 pr-20">
          <div className="pb-10 flex items-center justify-center gap-2 uppercase font-bold text-black">
            <h1 className="">Recipes</h1>
            <MdOutlineKeyboardArrowRight />
            <h1 className="">Ingredients</h1>
            <MdOutlineKeyboardArrowRight />
            <h1>{ingType}</h1>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="uppercase text-5xl font-extrabold">{ingType}</h1>
            <p>{imageUrl.text}</p>
          </div>
        </div>
      </div>
      <h1 className="uppercase text-3xl underline text-center p-10 font-extrabold">
        <span className="text-customColor">{ingType}</span> RECIPES
      </h1>
      <div className="grid grid-cols-1 gap-5 p-10 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe, ind) => (
          <div key={ind} className="max-w-sm bg-white">
            <Image
              className="rounded-t-lg w-full h-64"
              src="https://www.allrecipes.com/img/icons/recipe-add-photo-square.jpg"
              alt=""
              width={400}
              height={100}
            />
            <div className=" pt-5">
              <a>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {recipe.title}
                </h5>
              </a>
              <p className="mb-3 font-bold text-gray-500 dark:text-gray-400">
                {recipe.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
