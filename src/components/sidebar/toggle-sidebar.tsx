import Image from "next/image";
import React from "react";

import { IoCloseSharp } from "react-icons/io5";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CgProfile } from "react-icons/cg";
import { IoLogoInstagram } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { CiFacebook } from "react-icons/ci";
import { accordionData } from "../consts/sidebar-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Togglesidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="w-72 p-4 flex flex-col justify-evenly bg-white  h-screen z-50">
      <div className="flex justify-around items-center gap-3">
        <Image
          src="/images/allrecipes_logo.jpg"
          alt=""
          width={120}
          height={35}
        />
        <IoCloseSharp
          onClick={() => setIsOpen(false)}
          size={32}
          className="z-50"
        />
      </div>
      <div className="p-2">
        <Label htmlFor="email" className="text-md font-bold">
          Search
        </Label>
        <div className="flex justify-center items-center">
          <Input
            id="email"
            type="email"
            placeholder="What are you looking for"
            className=" rounded-none border border-black"
          />
          <div className="p-[10px] bg-customColor text-white">
            <IoSearch />
          </div>
        </div>
      </div>
      <div className="p-2 border-b-4 border-gray-500">
        <Accordion type="single" collapsible className="w-full">
          {accordionData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-bold text-sm">
                {item.trigger}
              </AccordionTrigger>
              {item.content.length > 0 && (
                <div className="pl-3">
                  {item.content.map((subItem, subIndex) => (
                    <AccordionContent
                      className="hover:bg-gray-300 p-2"
                      key={subIndex}
                    >
                      {subItem}
                    </AccordionContent>
                  ))}
                </div>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="p-2 border-b-4 border-gray-500">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="gap-3 flex justify-center items-center    ">
                <CgProfile className="text-customColor" />
                My profile
              </div>
            </AccordionTrigger>
            <AccordionContent>Log Out</AccordionContent>
            <AccordionContent>My Profile</AccordionContent>
            <AccordionContent>Saved Recipes & Collection</AccordionContent>
            <AccordionContent>Add a Recipe</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="p-2 mt-3">
        <p className="text-md font-semibold">Follow us on</p>
        <div className="flex text-xl gap-3 pl-3 mt-2">
          <IoLogoInstagram />
          <CiFacebook />
        </div>
      </div>
    </div>
  );
}
