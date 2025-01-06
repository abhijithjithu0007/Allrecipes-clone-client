"use client";
import { Input } from "@/components/ui/input";
import { getAllrecipes } from "@/lib/features/recipeSlice";
import { AppDispatch, RootState } from "@/lib/store";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch: AppDispatch = useDispatch();
  const { recipes } = useSelector((state: RootState) => state.recipe);

  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    dispatch(getAllrecipes());
  }, [dispatch]);

  const groupedRecipes = recipes.reduce(
    (acc: Record<string, any[]>, recipe) => {
      const firstLetter = recipe.title[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(recipe);
      return acc;
    },
    {}
  );

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const scrollToSection = (letter: string) => {
    const section = sectionRefs.current[letter];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <div>
        <div className="p-5 sm:p-10 px-16 bg-[#F5F6EA]">
          <h1 className="text-4xl font-extrabold">Recipes A-Z</h1>
        </div>
        <div className="p-10 pl-16">
          <h3 className="font-bold text-lg">
            Find a topic by its first letter:
          </h3>
          <div className="flex flex-wrap gap-5 font-semibold pt-5">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => scrollToSection(letter)}
                disabled={!groupedRecipes[letter]}
                className={`p-2 border border-customColor ${
                  !groupedRecipes[letter] ? "opacity-30 cursor-not-allowed" : ""
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
        <div className="p-10 pl-16 space-y-16">
          {Object.entries(groupedRecipes).map(([letter, recipes]) => (
            <div
              key={letter}
              ref={(el) => {
                sectionRefs.current[letter] = el;
              }}
              className="space-y-5"
            >
              <span className="text-white font-bold text-xl p-4 bg-black ">
                {letter}
              </span>
              <div className="pt-5 text-xl grid grid-cols-3 sm:grid-cols-4 gap-5">
                {recipes.map((recipe, ind) => (
                  <div key={ind}>
                    <Link href={`/meals/${recipe.mealType.toLowerCase()}`}>
                      <p className="border-t pt-2 text-base sm:text-xl">
                        {recipe.title}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
