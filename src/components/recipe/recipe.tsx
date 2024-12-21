"use client";
import React, { useEffect } from "react";
import Sectionone from "./section-one";
import Ingredients from "./ingredients";
import Directions from "./directions";
import Finalsection from "./final-section";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Recipe() {
  const resposeMsg = useSelector(
    (state: RootState) => state.form.responseMessage
  );
  const status = useSelector((state: RootState) => state.form.status);
  const error = useSelector((state: RootState) => state.form.error);
  const router = useRouter();
  useEffect(() => {
    if (resposeMsg || status) {
      if (status === "failed") {
        toast.error(error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (status === "succeeded") {
        toast.success(resposeMsg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/home");
      }
    }
  }, [resposeMsg, status]);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-1/2 shadow-lg bg-white mb-10">
        <Sectionone />
        <Ingredients />
        <Directions />
        <Finalsection />
      </div>
    </div>
  );
}