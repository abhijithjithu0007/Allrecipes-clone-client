import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Nutritionchart from "./nutrition-chart";

export interface Nutrition {
  calories: number;
  totalNutrients: {
    FAT: {
      quantity: number;
      unit: string;
    };
    CHOCDF: {
      quantity: number;
      unit: string;
    };
    PROCNT: {
      quantity: number;
      unit: string;
    };
    FASAT: {
      quantity: number;
      unit: string;
    };
    NA: {
      quantity: number;
      unit: string;
    };
    CHOLE: {
      quantity: number;
      unit: string;
    };

    VITC: {
      quantity: number;
      unit: string;
    };
    FE: {
      quantity: number;
      unit: string;
    };
    FIBTG: {
      quantity: number;
      unit: string;
    };
  };
}

export default function Nutritions({
  recipeId,
  servings,
}: {
  recipeId: string;
  servings: string;
}) {
  const [tab, setTab] = useState<boolean>(false);
  const fetchNutritions = async () => {
    const response = await axiosInstance.get(
      `/recipe/get-recipe-nutrition/${recipeId}`
    );
    if (response.status !== 200) {
      throw new Error("Something went wrong");
    }
    return response.data.data;
  };

  const { data } = useQuery<Nutrition, Error>({
    queryKey: ["fetchNutritions"],
    queryFn: fetchNutritions,
  });

  const handleTab = () => {
    setTab((prev) => !prev);
  };

  return (
    <div className="mt-7 w-full sm:w-1/2">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          Nutrition Facts{" "}
          <span className="text-base font-normal">(per serving)</span>
        </h1>
        <div className="flex justify-between mt-3">
          <div>
            <h1 className="font-bold pb-2">{data?.calories}</h1>
            <span>Calories</span>
          </div>
          <div>
            <h1 className="font-bold pb-2">
              {Math.floor(data?.totalNutrients.FAT.quantity || 0)}
              {data?.totalNutrients.FAT.unit}
            </h1>
            <span>Fat</span>
          </div>
          <div>
            <h1 className="font-bold pb-2">
              {Math.floor(data?.totalNutrients.CHOCDF.quantity || 0)}
              {data?.totalNutrients.CHOCDF.unit}
            </h1>
            <span>Carbs</span>
          </div>
          <div>
            <h1 className="font-bold pb-2">
              {Math.floor(data?.totalNutrients.PROCNT.quantity || 0)}
              {data?.totalNutrients.PROCNT.unit}
            </h1>
            <span>Protein</span>
          </div>
        </div>
        <div className="pt-4">
          <span
            onClick={handleTab}
            className="border-b border-customColor cursor-pointer hover:border-b-2"
          >
            {tab ? `Hide Nutrition Label` : `Show Full Nutrition Label`}
          </span>
          <div className="pt-4">
            {tab ? (
              <Nutritionchart data={data || null} servings={servings} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
