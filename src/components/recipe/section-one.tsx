"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  setDescription,
  uploadImage,
} from "@/lib/features/formSlice";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { AppDispatch, RootState } from "@/lib/store";
import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

export default function Sectionone() {
  const dispatch: AppDispatch = useDispatch();
  const { title, description } = useSelector((state: RootState) => state.form);
  const { image } = useSelector((state: RootState) => state.form);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setDescription(e.target.value));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      dispatch(uploadImage(selectedFile));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-3 sm:p-5">
      <div className="flex flex-col gap-4">
        <div className="relative flex w-60">
          <div className="absolute top-0 left-0 z-10">
            <FaPlus size={32} className="text-[#d54215]" />
          </div>
          <h1 className="text-3xl font-bold pl-8 relative z-10">
            Add a Recipe
          </h1>
          <div className="bg-[#e7ab46] h-6 w-full absolute top-5 left-0"></div>
        </div>
        <div>
          <p>
            Uploading personal recipes is easy! Add yours to your favorites,
            share with friends, family, or the Cookhouse community.
          </p>
        </div>
        <hr />
      </div>
      <div className="flex flex-col lg:flex-row p-6">
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <div>
            <Label htmlFor="title" className="text-base font-bold">
              Recipe Title
            </Label>

            <Input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Grandma's Apple Pie"
              className="p-6 placeholder:text-sm outline outline-1 rounded-none mt-2"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-base font-bold">
              Description
            </Label>

            <Textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Type your message here."
              className="min-h-28"
            />
          </div>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2 flex flex-col justify-center items-center gap-2">
          <Label htmlFor="photo" className="text-base font-bold">
            Photo (Optional)
          </Label>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />

          <div onClick={handleImageClick} className="cursor-pointer">
            <Image
              src={image || "/images/loginImg.png"}
              alt="Recipe Image"
              width={200}
              height={200}
            />
          </div>

          <p className="text-xs text-gray-600 pt-2">
            Use JPEG or PNG. Must be at least <br /> 960 x 960. Max file size:
            30MB
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
}
