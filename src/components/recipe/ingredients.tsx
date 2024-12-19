import React from "react";
import { Input } from "../ui/input";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

export default function Ingredients() {
  return (
    <div className="p-7">
      <div className="p-4 pb-10">
        <div className="">
          <h2 className="font-bold">Ingredients</h2>
          <p className="pt-4 text-gray-500">
            Enter one ingredient per line. Include the quantity (i.e. cups,
            tablespoons) and any special preparation (i.e. sifted, softened,
            chopped). Use optional headers to organize the different parts of
            the recipe (i.e. Cake, Frosting, Dressing).
          </p>
        </div>
        <div className="p-2 flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <Input
              id="email"
              type="email"
              placeholder="e.g. 2 cups of flour,sifted"
              className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2"
            />
            <IoCloseCircleOutline size={30} />
          </div>

          <div className="flex gap-2 items-center   ">
            <Input
              id="email"
              type="email"
              placeholder="e.g. 1 cup sugar"
              className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2"
            />
            <IoCloseCircleOutline size={30} />
          </div>
        </div>
        <div className="pt-5">
          <div className="border-2 border-customColor flex w-52 items-center justify-center gap-3 p-4 rounded-sm hover:bg-customColor hover:text-white">
            <FaPlus size={20} />
            <button className="text-sm font-semibold">ADD INGREDIENT</button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
