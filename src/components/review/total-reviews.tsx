"use client";
import Image from "next/image";
import React from "react";
import { FaStar, FaThumbsUp } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewData } from "./reviews";
import { Filterreview } from "./filter-review";
import axiosInstance from "@/utils/axios";
import { Skeleton } from "@mui/material";

interface Props {
  data: ReviewData[];
  refetchReview: () => void;
  isReviewLoading: boolean;
  userId: string;
}

export default function Totalreviews({
  data,
  refetchReview,
  isReviewLoading,
  userId,
}: Props) {
  const queryClient = useQueryClient();
  const [filterReview, setFilterReview] = React.useState<ReviewData[]>(
    data.map((review) => ({
      ...review,
      userHasHelpfuled: review.helpfulBy.includes(userId),
    }))
  );

  const toggleHelpful = useMutation({
    mutationFn: async ({
      reviewId,
    }: {
      reviewId: string;
      hasHelpfuled: boolean;
    }) => {
      const response = await axiosInstance.post(`/review/update-helpful`, {
        reviewId,
        userId,
      });
      return response.data;
    },
    onMutate: async ({ reviewId, hasHelpfuled }) => {
      await queryClient.cancelQueries({ queryKey: ["reviewsHelp"] });

      const previousReviews = queryClient.getQueryData<ReviewData[]>([
        "reviews",
      ]);

      queryClient.setQueryData<ReviewData[]>(["reviews"], (oldData) =>
        oldData?.map((review) =>
          review._id === reviewId
            ? {
                ...review,
                helpful: hasHelpfuled ? review.helpful - 1 : review.helpful + 1,
                userHasHelpfuled: !hasHelpfuled,
              }
            : review
        )
      );

      return { previousReviews };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(["reviewsHelp"], context?.previousReviews);
    },
    onSettled: () => {
      refetchReview();
    },
  });

  const handleHelpfulToggle = (reviewId: string, hasHelpfuled: boolean) => {
    toggleHelpful.mutate({ reviewId, hasHelpfuled });
  };

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
        {isReviewLoading ? (
          <div className="flex flex-col gap-4 p-1 pt-7">
            {[...Array(3)].map((_, ind) => (
              <div key={ind} className="flex flex-col gap-4 p-1 pt-7">
                <div className="flex gap-2 items-center">
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="text" width="50%" />
                </div>
                <div className="flex gap-3 items-center">
                  <Skeleton variant="text" width="100px" />
                  <Skeleton variant="text" width="80px" />
                </div>
                <Skeleton variant="text" width="80%" />
                <div className="flex gap-2 items-center">
                  <Skeleton variant="rectangular" width={80} height={24} />
                </div>
                <hr />
              </div>
            ))}
          </div>
        ) : (
          filterReview.map((review) => {
            const hasHelpfuled = review.helpfulBy.includes(userId);

            return (
              <div key={review._id} className="flex flex-col gap-4 p-1 pt-7">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/images/user_model_logo.png"
                    alt="User"
                    width={40}
                    height={40}
                    className="bg-gray-300 rounded-full"
                  />
                  <h3 className="font-bold">
                    {review.user?.name || "Cookhouse Member"}
                  </h3>
                </div>
                <div className="flex gap-3 items-center">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} size={20} className="text-customColor" />
                  ))}
                  <p className="text-xs text-gray-600">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-[15px]">{review.notes}</p>
                <div
                  className="flex w-24 gap-2 items-center hover:underline decoration-customColor cursor-pointer"
                  onClick={() => handleHelpfulToggle(review._id, hasHelpfuled)}
                >
                  <FaThumbsUp
                    size={15}
                    className={`${
                      hasHelpfuled ? "text-gray-700" : "text-customColor"
                    }`}
                  />
                  <p className="text-sm">Helpful({review.helpful})</p>
                </div>
                <hr />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
