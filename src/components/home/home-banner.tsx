import Image from "next/image";
import React from "react";
import { imaged } from "../consts/home-latest-data";
import Link from "next/link";
export default function Homebanner() {
  return (
    <div className="flex flex-col lg:flex-row p-3 sm:p-5 gap-3 w-full">
      <div className="w-full  lg:w-2/3">
        <Image
          src={"/images/home-banner-image.jpg"}
          alt=""
          width={800}
          height={0}
        />
      </div>
      <div className=" bg-[#F5F6EA] w-full lg:w-1/3 text-center p-4">
        <h1 className="text-3xl text-start font-extrabold border-b-4 border-customColor">
          The Latest
        </h1>
        <div className="p-5">
          {imaged.map((image) => (
            <div
              className="flex items-center mt-3 sm:mt-1 text-start gap-3 sm:gap-5 lg:gap-10 lg:p-1"
              key={image.id}
            >
              <div className="w-1/2">
                <Image
                  src={image.image}
                  alt={image.text}
                  width={150}
                  height={100}
                  className="w-[120px] h-[100px] object-fit"
                />
              </div>
              <div className="w-full">
                <Link href="/meals/breakfast">
                  <h1 className="text-base sm:text-lg font-bold hover:underline decoration-slate-600">
                    {image.text}
                  </h1>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
