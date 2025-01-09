import React, { useState, ChangeEvent, useEffect } from "react";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { searchRecipes } from "@/lib/features/recipeSlice";
import Link from "next/link";
import { FiLoader } from "react-icons/fi";

let debounceTimer: NodeJS.Timeout;

export default function SearchField() {
  const [query, setQuery] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const { recipes, loading } = useSelector((state: RootState) => state.recipe);

  useEffect(() => {
    if (query.trim()) {
      debounceTimer = setTimeout(() => {
        dispatch(searchRecipes(query));
      }, 800);
    }

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [query, dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        <Input
          id="search"
          type="text"
          placeholder="Find a recipe or ingredient"
          className="border sm:w-[300px] border-black rounded-r-none"
          value={query}
          onChange={handleInputChange}
        />
        <div className="p-[10px] bg-customColor text-white rounded-r-md">
          <IoSearch />
        </div>
      </div>

      {query && (
        <div
          className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg z-50"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {loading.searchRecipeLoad ? (
            <div className="p-2 flex items-center text-gray-500">
              Loading...
              <FiLoader className="animate-spin" />
            </div>
          ) : recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <Link
                key={index}
                href={`/recipe/${recipe._id}`}
                onClick={() => setQuery("")}
              >
                <div className="p-2 hover:bg-gray-100 cursor-pointer">
                  {recipe.title} - {recipe.cuisine} ({recipe.mealType})
                </div>
              </Link>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
