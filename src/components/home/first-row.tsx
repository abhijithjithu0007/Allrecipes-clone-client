"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Firstrow: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col sm:flex-row text-center justify-around items-center bg-[#114388]">
      <div className="p-2 sm:p-4">
        <h1
          className="text-sm lg:text-2xl font-semibold text-white"
          data-aos="fade-right"
        >
          America's{" "}
          <span className="text-[#fbd657] font-bold">
            #1 Trusted Recipe Resource{" "}
          </span>{" "}
          since 1997
        </h1>
      </div>
      <div className="flex gap-4 p-1 sm:p-4">
        <div
          className="flex items-center gap-1 sm:gap-2"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div className="bg-[#2ec5b6] w-3 h-3 rounded-full"></div>
          <h1 className="text-xs lg:text-xl  text-white">
            {" "}
            <span className="text-sm lg:text-xl font-extrabold">113K</span>{" "}
            Original Recipes
          </h1>
        </div>
        <div
          className="flex items-center gap-1 sm:gap-2"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div className="bg-[#f15025] w-3 h-3 rounded-full"></div>
          <h1 className="text-xs lg:text-xl  text-white">
            {" "}
            <span className="text-sm lg:text-xl  font-extrabold">
              6.9M+
            </span>{" "}
            Ratings & Reviews
          </h1>
        </div>
        <div
          className="flex items-center gap-1 sm:gap-2"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div className="bg-[#e7ab46] w-3 h-3 rounded-full"></div>
          <h1
            className="text-xs lg:text-xl  text-white"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            {" "}
            <span className="text-sm lg:text-xl font-extrabold">60M</span> Home
            Cooks
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Firstrow;
