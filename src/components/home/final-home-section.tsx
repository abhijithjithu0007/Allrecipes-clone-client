import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Finalhomesection() {
  return (
    <div className="relative w-full">
      <Image
        src="https://www.allrecipes.com/thmb/6BJurYJ7abtiVG1oGcz5t9oXy50=/2000x666/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2):format(webp)/new-year-armag-GregScheidemann-1031795881-6a2245042fb349e6a0c23b1164893bea.jpg"
        alt=""
        width={0}
        height={0}
        layout="responsive"
        className="w-full"
      />
      <Link href="/meals/salads">
        <div className="absolute hidden md:flex inset-0 items-center justify-start pl-20">
          <div className="bg-white opacity-80 flex flex-col gap-4 p-5 shadow-lg">
            <h2 className="uppercase text-gray-500 font-bold">seasonal</h2>
            <h1 className="text-4xl font-bold hover:underline decoration-customColor">
              Winter Menu Ideas
            </h1>
            <p className="text-gray-700">
              Bold salads, cozy soups, and hearty <br /> mains to keep you warm
              all year long. <br /> Find your new favorite winter recipes here.
            </p>
          </div>
        </div>
        <div className="md:hidden flex items-center justify-center bg-gray-50 p-3 sm:bg-white h-full">
          <div className="bg-white flex flex-col gap-4 p-5">
            <h2 className="uppercase text-gray-500 font-bold">seasonal</h2>
            <h1 className="text-3xl sm:text-4xl font-bold hover:underline decoration-customColor">
              Winter Menu Ideas
            </h1>
            <p className="text-gray-700">
              Bold salads, cozy soups, and hearty <br /> mains to keep you warm
              all year long. <br /> Find your new favorite winter recipes here.
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
