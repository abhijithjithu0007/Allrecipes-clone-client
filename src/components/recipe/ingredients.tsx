"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIngredients } from "@/lib/features/formSlice";
import { Input } from "../ui/input";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { AppDispatch, RootState } from "@/lib/store";

export default function Ingredients() {
  const dispatch: AppDispatch = useDispatch();
  const ingredients = useSelector((state: RootState) => state.form.ingredients);

  const [ingredient, setIngredient] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() !== "") {
      const newIngredients = [...ingredients, ingredient.trim()];
      dispatch(setIngredients(newIngredients));
      setIngredient("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    dispatch(setIngredients(updatedIngredients));
  };

  return (
    <div className="p-7">
      <div className="p-4 pb-10">
        <div>
          <h2 className="font-bold">Ingredients</h2>
          <p className="pt-4 text-gray-500">
            Enter one ingredient per line. Include the quantity (i.e. cups,
            tablespoons) and any special preparation (i.e. sifted, softened,
            chopped). Use optional headers to organize the different parts of
            the recipe (i.e. Cake, Frosting, Dressing).
          </p>
        </div>
        <div className="p-2 flex flex-col gap-3">
          {ingredients.map((ingredient, index) => (
            <div className="flex gap-2 items-center" key={index}>
              <Input
                type="text"
                value={ingredient}
                className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2"
                readOnly
              />
              <IoCloseCircleOutline
                size={30}
                className="cursor-pointer"
                onClick={() => handleRemoveIngredient(index)}
              />
            </div>
          ))}

          <div className="flex gap-2 items-center">
            <Input
              type="text"
              value={ingredient}
              onChange={handleInputChange}
              placeholder="e.g. 2 cups of flour, sifted"
              className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2"
            />
            <IoCloseCircleOutline size={30} className="invisible" />
          </div>
        </div>
        <div className="pt-5">
          <div
            className="border-2 border-customColor flex w-52 items-center justify-center gap-3 p-4 rounded-sm hover:bg-customColor hover:text-white"
            onClick={handleAddIngredient}
          >
            <FaPlus size={20} />
            <button className="text-sm font-semibold">ADD INGREDIENT</button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
