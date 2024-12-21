import Recipe from "@/components/recipe/recipe";
import Image from "next/image";
import React from "react";

export default function Addrecipe() {
  return (
    <div>
      <div className="relative">
        <Image
          className="w-full"
          src="/images/add-recipe-img.jpg"
          alt="Add Recipe"
          layout="responsive"
          width={0}
          height={0}
        />
        <div className="absolute top-28 left-0 right-0 z-10">
          <Recipe />
        </div>
      </div>
    </div>
  );
}
