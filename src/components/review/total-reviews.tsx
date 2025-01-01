"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { FaStar, FaThumbsUp } from "react-icons/fa";
import { ReviewData } from "./reviews";
import { Filterreview } from "./filter-review";

interface Props {
  data: ReviewData[];
}

export default function Totalreviews({ data }: Props) {
  const [filterReview, setFilterReview] = React.useState<ReviewData[]>([]);

  useEffect(() => {
    setFilterReview(data);
  }, [data]);

  return (
    <div className="pt-7">
      <div>
        {data.length === 0 ? null : (
          <div>
            <hr />
            <div className="flex justify-between text-sm p-2">
              <p>{filterReview.length} Reviews</p>
              <Filterreview
                setFilterReview={setFilterReview}
                initilalData={data}
              />
            </div>
            <hr />
          </div>
        )}
        {filterReview.map((review, ind) => (
          <div key={ind} className="flex flex-col gap-4 p-1 pt-7">
            <div className="flex gap-2 items-center ">
              <Image
                src="/images/user_model_logo.png"
                alt=""
                width={40}
                height={40}
                className="bg-gray-300 rounded-full"
              />
              <h3 className="font-bold">
                {review.user.name || "Allrecipes User"}
              </h3>
            </div>
            <div className="flex gap-3 items-center">
              {Array.from({ length: review.rating }).map((_, i) => (
                <FaStar key={i} size={20} className="text-customColor" />
              ))}{" "}
              <p className="text-xs text-gray-600">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-[15px]">{review.notes}</p>
            </div>
            <div className="flex w-24 gap-2 items-center hover:underline decoration-customColor cursor-pointer">
              <FaThumbsUp size={15} className="text-customColor" />
              <p className="text-sm">Helpful(3)</p>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
