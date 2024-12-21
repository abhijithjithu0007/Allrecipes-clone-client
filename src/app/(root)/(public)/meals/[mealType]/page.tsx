"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { mealType } = useParams();
  return (
    <div>
      <h1>this is {mealType}</h1>
    </div>
  );
}
