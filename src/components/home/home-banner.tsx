import Image from "next/image";
import React from "react";

export default function Homebanner() {
  return (
    <div className="flex p-8 gap-8 w-full">
      <div className="w-2/3">
        <Image
          src={"/images/home-banner-image.jpg"}
          alt=""
          width={800}
          height={0}
        />
      </div>
      <div className=" bg-[#F5F6EA] w-1/3">
        <h1>Latest $ Trending</h1>
        <div className="p-10">
          <h1>latest-food is this</h1>
          <h1>latest-food is this</h1>
          <h1>latest-food is this</h1>
          <h1>latest-food is this</h1>
        </div>
      </div>
    </div>
  );
}
