"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";

import { Textarea } from "../ui/textarea";

interface Props {
  title: string | undefined;
}

export default function Reviews({ title }: Props) {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const ratings: string[] = ["Terrible", "Bad", "OK", "Good", "Excellent"];
  return (
    <div className="w-1/2 mt-10">
      <h1 className="text-4xl font-bold">Reviews (2)</h1>
      <div className="bg-[#f5f6ea] p-6 mt-4">
        <div className="bg-white p-6">
          {" "}
          <div className="flex items-center justify-start gap-4">
            <Image
              src="/images/review_logo.png"
              className="rounded-full"
              alt="review1"
              width={60}
              height={60}
            />
            <p className="text-lg font-bold">{title}</p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-base font-bold">
              My Rating{" "}
              <span className="text-xs text-gray-600 font-normal">
                (required)
              </span>{" "}
            </p>
            <div className="p-3 flex items-center gap-4">
              <div className="flex gap-2">
                {ratings.map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label
                      key={ratingValue}
                      onMouseEnter={() => setHoveredRating(ratingValue)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setSelectedRating(ratingValue)}
                      className="cursor-pointer"
                    >
                      {ratingValue <= (hoveredRating || selectedRating) ? (
                        <FaStar size={40} className="text-customColor" />
                      ) : (
                        <IoMdStarOutline size={40} />
                      )}
                    </label>
                  );
                })}
              </div>
              <div className="h-12 w-[1px] bg-slate-400"></div>
              <div>
                {hoveredRating || selectedRating ? (
                  <p className="text-sm">
                    {ratings[(hoveredRating || selectedRating) - 1]}
                  </p>
                ) : (
                  <p className="text-sm">Hover over the stars to rate</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-7">
            <p className="text-base font-bold">My Review</p>
            <Textarea
              className="min-h-[100px] mt-3"
              placeholder="What did you think about this recipe? Did you make any changes or notes?"
            />
          </div>
          <div className="flex justify-end gap-4 mt-7">
            <button>Cancel</button>
            <button className="bg-customColor flex items-center gap-2 text-sm font-bold p-4 pl-16 pr-16 text-white hover:bg-orange-600">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
