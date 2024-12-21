"use client";

import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { cuisineType } = useParams();
  return (
    <div>
      <h1>this is {cuisineType}</h1>
    </div>
  );
}
