"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { ingredientsImages } from "@/components/consts/recipes-banner";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { getRecipeByIngredient } from "@/lib/features/recipeSlice";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import { useSaveRecipe } from "@/hook/useSaveRecipe";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export default function Page() {
  const { ingType } = useParams<{ ingType: string }>();
  const passingIngType = ingType.charAt(0).toUpperCase() + ingType.slice(1);
  const dispatch: AppDispatch = useDispatch();

  const imageUrl = ingredientsImages[ingType as keyof typeof ingredientsImages];

  const { recipes } = useSelector((state: RootState) => state.recipe);
  useEffect(() => {
    dispatch(getRecipeByIngredient(passingIngType));
  }, [passingIngType]);

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
            draggable: true,
            progress: undefined,
            theme: "light",
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
          theme: "light",
        });
      },
    });
  };

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
    </div>
  );
}
