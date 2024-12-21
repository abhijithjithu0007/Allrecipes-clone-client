"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { ingType } = useParams();
  return (
    <div>
      <h1>this is {ingType}</h1>
    </div>
  );
}
