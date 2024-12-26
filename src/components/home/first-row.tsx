import React from "react";

export default function Firstrow() {
  return (
    <div className="flex  justify-around items-center bg-[#114388]">
      <div className="p-4">
        <h1 className="text-xl font-semibold text-white">
          America's{" "}
          <span className="text-[#fbd657] font-bold">
            #1 Trusted Recipe Resource{" "}
          </span>{" "}
          since 1997
        </h1>
      </div>
      <div className="flex gap-4 p-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#2ec5b6] w-3 h-3 rounded-full"></div>
          <h1 className="text-xl text-white">
            {" "}
            <span className="text-xl font-extrabold">113K</span> Original
            Recipes
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#f15025] w-3 h-3 rounded-full"></div>
          <h1 className="text-xl text-white">
            {" "}
            <span className="text-xl font-extrabold">6.9M+</span> Ratings &
            Reviews
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#e7ab46] w-3 h-3 rounded-full"></div>
          <h1 className="text-xl text-white">
            {" "}
            <span className="text-xl font-extrabold">60M</span> Home Cooks
          </h1>
        </div>
      </div>
    </div>
  );
}
