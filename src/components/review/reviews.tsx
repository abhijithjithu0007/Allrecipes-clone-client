"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Textarea } from "../ui/textarea";
import axiosInstance from "@/utils/axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reviewcount from "./review-count";

interface Props {
  title?: string;
}

interface PostReviewPayload {
  recipeId: string;
  notes?: string;
  rating: number;
}
export interface ReviewData {
  rating: number;
  notes: string;
  name: string;
}

export default function Reviews({ title }: Props) {
  const params = useParams();
  const recipeId = params.recipeId as string;

  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");

  const fetchUser = async () => {
    const response = await axiosInstance.get(
      `/review/get-review-by-recipe/${recipeId}`
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  };

  const postReview = async (review: PostReviewPayload) => {
    await axiosInstance.post("/review/add-review", review);
  };

  const { data, refetch } = useQuery<{ data: ReviewData[] }, Error>({
    queryKey: ["reviews", recipeId],
    queryFn: fetchUser,
    enabled: !!recipeId,
  });

  const mutation = useMutation<void, Error, PostReviewPayload>({
    mutationFn: postReview,
    mutationKey: ["postReview"],
    onSuccess: () => {
      toast.success("Review submitted successfully.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSelectedRating(0);
      setNotes("");
      refetch();
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to post the review.");
    },
  });

  const handleSubmit = () => {
    if (selectedRating === 0) {
      toast.error("Please select a rating before submitting.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }
    const review: PostReviewPayload = {
      recipeId,
      rating: selectedRating,
      notes: notes.trim() || undefined,
    };
    mutation.mutate(review);
  };
  console.log(data?.data);

  const ratings = ["Terrible", "Bad", "OK", "Good", "Excellent"];

  return (
    <div className="w-1/2 mt-10">
      <h1 className="text-4xl font-bold">{`Reviews (${data?.data.length})`}</h1>
      <div className="bg-[#f5f6ea] p-6 mt-4">
        <div className="bg-white p-6">
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
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4 mt-7 mb-10">
            <button>Cancel</button>
            <button
              onClick={handleSubmit}
              className="bg-customColor flex items-center gap-2 text-sm font-bold p-4 pl-16 pr-16 text-white hover:bg-orange-600"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
          <hr />
          <Reviewcount data={data?.data || []} />
        </div>
      </div>
    </div>
  );
}
