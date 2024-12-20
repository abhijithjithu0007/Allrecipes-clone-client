import React from "react";
import { FaPlus } from "react-icons/fa";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

export default function Sectionone() {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-4">
        <div className="relative flex w-60">
          <div className="absolute top-0 left-0 z-10">
            <FaPlus size={32} className="text-[#d54215]" />
          </div>
          <h1 className="text-3xl font-bold pl-8 relative z-10">
            Add a Recipe
          </h1>
          <div className="bg-[#e7ab46] h-6 w-full absolute top-5     left-0"></div>
        </div>
        <div>
          <p>
            Uploading personal recipes is easy! Add yours to your favorites,
            share with friends, family, or the Allrecipes community.
          </p>
        </div>
        <hr />
      </div>
      <div className="flex justify-around p-6">
        <div className="flex flex-col gap-6">
          <div>
            <Label htmlFor="" className="text-base font-bold">
              Recipe Title{" "}
            </Label>

            <Input
              id="title"
              type="text"
              placeholder="e.g. Grandma's Apple Pie"
              className="p-6 placeholder:text-base outline outline-1 rounded-none mt-2"
            />
          </div>
          <div>
            <Label htmlFor="" className="text-base font-bold">
              Description{" "}
            </Label>

            <Textarea placeholder="Type your message here." />
          </div>
        </div>
        <div>
          <Label htmlFor="email" className="text-base font-bold">
            {`Photo (Optional)`}
          </Label>
          <Image src="/images/loginImg.png" alt="" width={200} height={200} />
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
