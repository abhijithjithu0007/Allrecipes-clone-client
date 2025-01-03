import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { TiHeartFullOutline } from "react-icons/ti";

interface LeftbarProps {
  data: {
    name: string;
    email: string;
    profileImage: string;
  };
}

export default function Leftbar({ data }: LeftbarProps) {
  return (
    <div className="w-[350px] h-[190px] bg-white">
      <div className="flex items-center justify-around p-3">
        {data.profileImage ? (
          <Image src={data.profileImage} alt="profile" width={60} height={60} />
        ) : (
          <IoPersonCircleSharp
            size={60}
            className="p-1 text-white bg-customColor"
          />
        )}

        <h1 className="font-bold text-lg">Hi, {data.name || data.email}</h1>
      </div>
      <hr />
      <div className="p-3 flex items-center gap-3">
        <FaUserEdit />
        <h1 className="text-gray-700">Personal Info</h1>
      </div>
      <div className="h-3 bg-gray-100"></div>
      <Link href={"/u/saved-recipes"}>
        <div className="flex items-center gap-3 p-3">
          <TiHeartFullOutline className="text-customColor" />
          <h1 className="text-gray-700">Saved Recipes</h1>
        </div>
      </Link>
    </div>
  );
}
