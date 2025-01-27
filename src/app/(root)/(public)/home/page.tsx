"use client";
import Finalhomesection from "@/components/home/final-home-section";
import Firstrow from "@/components/home/first-row";
import Homebanner from "@/components/home/home-banner";
import React from "react";

export default function Home() {
  return (
    <div>
      <Firstrow />
      <Homebanner />
      <Finalhomesection />
    </div>
  );
}
