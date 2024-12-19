import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Textarea } from "../ui/textarea";
import { FaPlus } from "react-icons/fa";

export default function Directions() {
  return (
    <div className="p-7">
      <div className="p-4 pb-10">
        <div className="">
          <h2 className="font-bold">Directions</h2>
          <p className="pt-4 text-gray-500">
            Explain how to make your recipe, including oven temperatures, baking
            or cooking times, and pan sizes, etc. Use optional headers to
            organize the different parts of the recipe (i.e. Prep, Bake,
            Decorate)
          </p>
        </div>
        <div className="p-2 flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <Textarea
              id="email"
              placeholder="e.g. 2 cups of flour,sifted"
              className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2"
            />
            <IoCloseCircleOutline size={30} />
          </div>

          <div className="flex gap-2 items-center   ">
            <Textarea
              placeholder="e.g. 1 cup sugar"
              className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2"
            />
            <IoCloseCircleOutline size={30} />
          </div>
        </div>
        <div className="pt-5">
          <div className="border-2 border-customColor flex w-40 items-center justify-center gap-3 p-3 rounded-sm hover:bg-customColor hover:text-white">
            <FaPlus size={20} />
            <button className="text-sm font-semibold">ADD STEP</button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
