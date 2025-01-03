"use client";
import React from "react";
import Leftbar from "./left-bar";
import Userinfo from "./user-info";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export interface UserDataType {
  name: string;
  email: string;
  profileImage: string;
}

export default function Profile() {
  const fetchUserData = async (): Promise<UserDataType> => {
    const response = await axiosInstance.get("/user/user-profile");
    if (response.status !== 200) {
      throw new Error("Something went wrong");
    }
    return response.data.data;
  };

  const { data, refetch } = useQuery<UserDataType, Error>({
    queryKey: ["userProfile"],
    queryFn: fetchUserData,
  });

  return (
    <div className="flex w-full p-10 bg-gray-100 h-full gap-6">
      {data ? (
        <>
          <Leftbar data={data} />
          <Userinfo data={data} refetch={refetch} />
        </>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}
