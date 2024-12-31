import React from "react";
import { Progress } from "@/components/ui/progress";
import { MdStarRate } from "react-icons/md";
import { ReviewData } from "./reviews";

interface Props {
  data: ReviewData[];
}

export default function Reviewcount({ data }: Props) {
  const starCounts = [5, 4, 3, 2, 1].map(
    (star) => data.filter((review) => review.rating === star).length
  );

  const totalRatings = starCounts.reduce((sum, count) => sum + count, 0);

  return (
    <div>
      {data.length === 0 ? (
        <p className="p-3">Be the first to review!</p>
      ) : (
        <div className="p-8">
          <h3 className="text-center">{totalRatings} Ratings</h3>
          <div className="flex flex-col gap-2 items-center">
            {starCounts.map((count, index) => {
              const progressValue = (count / totalRatings) * 100;

              return (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3 w-full max-w-md"
                >
                  <p className="flex items-center gap-1 underline decoration-customColor">
                    <span className="text-sm">{5 - index} star</span>
                    <MdStarRate className="text-customColor" />
                  </p>
                  <div className="flex justify-center">
                    <Progress className="w-[200px]" value={progressValue} />
                  </div>
                  <p className="text-sm">{count}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
