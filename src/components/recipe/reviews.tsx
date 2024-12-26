import Image from "next/image";
import React from "react";
import { FaRegStar } from "react-icons/fa";
import { Textarea } from "../ui/textarea";

export default function Reviews() {
  return (
    <div className="w-1/2">
      <h1 className="text-4xl font-bold">Reviews</h1>
      <div className="bg-[#f5f6ea] p-6">
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
            <p className="text-lg font-bold">Green Bean Mac and Cheese</p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-base font-bold">
              My Rating{" "}
              <span className="text-xs text-gray-600 font-normal">
                (required)
              </span>{" "}
            </p>
            <div className="flex gap-2 p-2">
              <FaRegStar size={40} />
              <FaRegStar size={40} />
              <FaRegStar size={40} />
              <FaRegStar size={40} />
              <FaRegStar size={40} />
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
