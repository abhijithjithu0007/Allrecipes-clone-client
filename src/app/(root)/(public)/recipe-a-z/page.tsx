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
        <div className="p-10 pl-16 bg-[#F5F6EA]">
          <h1 className="text-4xl font-extrabold">Recipes A-Z</h1>
          <Input
            type="text"
            placeholder="Search"
            className="p-6 mt-5 placeholder:text-lg outline outline-1 rounded-none bg-white w-1/2"
          />
        </div>
        <div className="p-10 pl-16">
          <h3 className="font-bold text-lg">
            Find a topic by its first letter:
          </h3>
          <div className="flex gap-6 *:font-semibold pt-5">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => scrollToSection(letter)}
                disabled={!groupedRecipes[letter]}
                className={`p-2 border border-customColor ${
                  !groupedRecipes[letter] ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
        <div className="p-10 pl-16 space-y-10">
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
              <div className="pt-5 text-xl grid grid-cols-4 gap-5">
                {recipes.map((recipe) => (
                  <Link href="/">
                    <p key={recipe._id} className="border-t-2 pt-2">
                      {recipe.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
