import React from "react";
import Sectionone from "./section-one";
import Ingredients from "./ingredients";
import Directions from "./directions";

export default function Recipe() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-1/2 shadow-lg bg-white">
        <Sectionone />
        <Ingredients />
        <Directions />
      </div>
    </div>
  );
}
