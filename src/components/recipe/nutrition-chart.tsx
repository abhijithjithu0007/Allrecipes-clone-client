"use client";
import React, { useState, useEffect } from "react";
import { Nutrition } from "./nutritions";

interface Props {
  data: Nutrition | null;
  servings: string;
}

export default function Nutritionchart({ data, servings }: Props) {
  const [nutrients, setNutrients] = useState<
    { label: string; quantity: number; unit: string }[]
  >([]);

  useEffect(() => {
    if (data) {
      const mappedNutrients = [
        {
          label: "Total Fat",
          quantity: data.totalNutrients.FAT.quantity,
          unit: data.totalNutrients.FAT.unit,
        },
        {
          label: "Cholesterol",
          quantity: data.totalNutrients.CHOLE.quantity,
          unit: data.totalNutrients.CHOLE.unit,
        },
        {
          label: "Sodium",
          quantity: data.totalNutrients.NA.quantity,
          unit: data.totalNutrients.NA.unit,
        },
        {
          label: "Total Carbohydrate",
          quantity: data.totalNutrients.CHOCDF.quantity,
          unit: data.totalNutrients.CHOCDF.unit,
        },
        {
          label: "Protein",
          quantity: data.totalNutrients.PROCNT.quantity,
          unit: data.totalNutrients.PROCNT.unit,
        },
        {
          label: "Vitamin C",
          quantity: data.totalNutrients.VITC.quantity,
          unit: data.totalNutrients.VITC.unit,
        },
        {
          label: "Iron",
          quantity: data.totalNutrients.FE.quantity,
          unit: data.totalNutrients.FE.unit,
        },
        {
          label: "Fiber",
          quantity: data.totalNutrients.FIBTG.quantity,
          unit: data.totalNutrients.FIBTG.unit,
        },
      ];
      setNutrients(mappedNutrients);
    }
  }, [data]);

  return (
    <div className="border p-6 flex flex-col gap-2">
      <div>
        <h1 className="text-xl font-bold">Nutrition Facts</h1>
        <p className="mt-2">Servings Per Recipe {servings}</p>
        <p>Calories {Math.floor(data?.calories || 0)}</p>
      </div>
      <hr />
      <div className="pt-5 flex flex-col gap-[6px]">
        {nutrients.map((nutrient, index) => (
          <div key={index}>
            <div className="flex justify-between items-center">
              <h1 className="font-bold">{nutrient.label}</h1>
              <p className="text-sm">
                {Math.floor(nutrient.quantity || 0)}
                {nutrient.unit}
              </p>
            </div>
            {index < nutrients.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </div>
  );
}
