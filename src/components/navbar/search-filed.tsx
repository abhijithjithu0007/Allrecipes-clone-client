import React from "react";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";

export default function Searchfiled() {
  return (
    <div className="flex justify-center items-center">
      <Input
        id="email"
        type="email"
        placeholder="Find a recipe or ingredient"
        className="rounded-none border border-black"
      />
      <div className="p-[10px] bg-customColor text-white">
        <IoSearch />
      </div>
    </div>
  );
}
