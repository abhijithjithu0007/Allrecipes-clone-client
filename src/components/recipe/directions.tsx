"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDirections } from "@/lib/features/formSlice";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Textarea } from "../ui/textarea";
import { FaPlus } from "react-icons/fa";
import { AppDispatch, RootState } from "@/lib/store";

export default function Directions() {
  const dispatch: AppDispatch = useDispatch();
  const directions = useSelector((state: RootState) => state.form.directions);

  const [direction, setDirection] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDirection(e.target.value);
  };

  const handleAddDirection = () => {
    if (direction.trim() !== "") {
      dispatch(setDirections([...directions, direction.trim()]));
      setDirection("");
    }
  };

  const handleRemoveDirection = (index: number) => {
    const updatedDirections = directions.filter((_, i) => i !== index);
    dispatch(setDirections(updatedDirections));
  };

  return (
    <div className="p-7">
      <div className="p-4 pb-10">
        <div>
          <h2 className="font-bold">Directions</h2>
          <p className="pt-4 text-gray-500">
            Explain how to make your recipe, including oven temperatures, baking
            or cooking times, and pan sizes, etc. Use optional headers to
            organize the different parts of the recipe (i.e. Prep, Bake,
            Decorate).
          </p>
        </div>
        <div className="p-2 flex flex-col gap-3">
          {directions.map((direction, index) => (
            <div className="flex gap-2 items-center" key={index}>
              <Textarea
                value={direction}
                onChange={() => {}}
                className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2"
                readOnly
              />
              <IoCloseCircleOutline
                size={30}
                className="cursor-pointer"
                onClick={() => handleRemoveDirection(index)}
              />
            </div>
          ))}

          <div className="flex gap-2 items-center">
            <Textarea
              value={direction}
              onChange={handleInputChange}
              placeholder="e.g. Preheat the oven to 350°F."
              className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2"
            />
          </div>
        </div>
        <div className="pt-5">
          <div
            className="border-2 border-customColor flex w-40 items-center justify-center gap-3 p-3 rounded-sm hover:bg-customColor hover:text-white"
            onClick={handleAddDirection}
          >
            <FaPlus size={20} />
            <button className="text-sm font-semibold">ADD STEP</button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
