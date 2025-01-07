"use client";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { IoPeopleSharp } from "react-icons/io5";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import axios from "axios";
import { useUpateUserProfile } from "@/hook/useCustomHook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserInfoProps {
  refetch: () => void;
  data: {
    name: string;
    email: string;
    profileImage: string;
  };
}
interface CloudinaryResponse {
  secure_url: string;
}

export default function Userinfo({ data, refetch }: UserInfoProps) {
  const [profileImage, setProfileImage] = useState<string>(data.profileImage);
  const [name, setName] = useState<string>(data.name);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadImage = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "allrecipes");
    formData.append("folder", "recipes");

    try {
      setUploading(true);
      const response = await axios.post<CloudinaryResponse>(
        process.env.NEXT_PUBLIC_CLODINARY_URL || "",
        formData
      );
      setProfileImage(response.data.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleImageClick = (): void => {
    fileInputRef.current?.click();
  };

  const { mutate } = useUpateUserProfile();
  const handleUpadeProfile = async () => {
    mutate(
      { name, profileImage },
      {
        onSuccess: (resp) => {
          refetch();
          toast.success(resp.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        },
      }
    );
  };

  return (
    <div className="bg-white p-5 w-full">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-extrabold p-3">
            Profile Settings
          </h1>
          <Button
            variant="ghost"
            onClick={handleUpadeProfile}
            className="w-32 sm:w-44 border-none p-7 uppercase bg-customColor text-sm font-bold text-white"
          >
            Save changes
          </Button>
        </div>
        <div className="p-5 text-base sm:text-lg">
          <p>
            The information on this page will be displayed on your public
            profile, which is visible to other users.
          </p>
          <div className="flex gap-3 sm:gap-1 mt-3 items-center text-gray-600">
            <IoPeopleSharp className="text-2xl sm:text-sm" />
            <p className="text-xs sm:text-sm">
              The information on this page will be displayed publicly and will
              be visible to others.
            </p>
          </div>
        </div>
        <hr />
        <div className="p-2 border border-gray-400">
          <div className="p-4 border-b border-gray-400">
            <h1 className="text-2xl font-bold">About Me</h1>
          </div>
          <div className="p-6 flex flex-col lg:flex-row items-center justify-evenly">
            <div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-md font-bold" htmlFor="email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  disabled
                  className="p-3 h-15 rounded-none border-gray-400"
                  placeholder="Email"
                  defaultValue={data.email}
                />
                <p className="text-[13px] text-gray-600">
                  *If you'd like to update your email address, please contact
                  Customer Service.
                </p>
              </div>
              <div className="grid w-full mt-5 max-w-sm items-center gap-1.5">
                <Label className="text-md font-bold" htmlFor="name">
                  Display Name*
                </Label>
                <Input
                  type="text"
                  id="name"
                  defaultValue={data.name || ""}
                  onChange={(e) => setName(e.target.value)}
                  className="p-3 h-15 rounded-none border-black"
                  placeholder="Your Display Name"
                />
              </div>
            </div>
            <div className="cursor-pointer mt-6 lg:mt-0">
              <Label className="text-sm font-bold">Profile Picture</Label>
              <div
                onClick={handleImageClick}
                className="flex flex-col items-center"
              >
                <Image
                  src={
                    profileImage || data.profileImage || "/images/user-pro.png"
                  }
                  alt="User Profile"
                  height={200}
                  width={200}
                  className=" border border-gray-300 mt-3 hover:opacity-75 transition-opacity"
                />
                {uploading && (
                  <p className="text-sm text-gray-500 mt-2">Uploading...</p>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
