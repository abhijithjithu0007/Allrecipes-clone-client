import React, { useState, ChangeEvent, useEffect } from "react";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { getAllrecipes } from "@/lib/features/recipeSlice";

export default function Searchfield() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);

  // Mock data for demonstration
  const mockData: string[] = [
    "Pasta",
    "Pizza",
    "Pancakes",
    "Pumpkin Pie",
    "Pineapple Smoothie",
  ];
  const dispatch: AppDispatch = useDispatch();

  const { recipes } = useSelector((state: RootState) => state.recipe);

  useEffect(() => {
    dispatch(getAllrecipes());
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Filter mock data based on query
    if (value.trim()) {
      setResults(
        mockData.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="flex justify-center items-center">
        <Input
          id="search"
          type="text"
          placeholder="Find a recipe or ingredient"
          className="rounded-none border border-black"
          value={query}
          onChange={handleInputChange}
        />
        <div className="p-[10px] bg-customColor text-white">
          <IoSearch />
        </div>
      </div>

      {/* Search Results */}
      {query && (
        <div
          className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg z-50"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                {result}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
