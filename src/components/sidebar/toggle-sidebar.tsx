import Image from "next/image";
import React from "react";

import { IoCloseSharp, IoPersonCircle } from "react-icons/io5";
import { Label } from "../ui/label";
import { IoLogoInstagram } from "react-icons/io5";
import { CiFacebook } from "react-icons/ci";
import { accordionData } from "../consts/sidebar-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SearchField from "../navbar/search-field";
import Link from "next/link";

export default function Togglesidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="w-72 p-4 flex flex-col justify-evenly bg-white overflow-y-auto  h-screen z-50">
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
        <SearchField />
      </div>
      <div className="p-2 border-b-4 border-black">
        <Accordion type="single" collapsible className="w-full">
          {accordionData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <div className="flex justify-between text-sm items-center font-extrabold">
                <Link href={item.path}>
                  <h1>{item.trigger}</h1>
                </Link>
                <AccordionTrigger className="font-bold text-sm"></AccordionTrigger>
              </div>
              {item.content.length > 0 && (
                <div className="pl-3">
                  {item.content.map((subItem, subIndex) => (
                    <AccordionContent
                      className="hover:bg-gray-300 p-2"
                      key={subIndex}
                    >
                      <a href={subItem.path} className="hover:underline">
                        {subItem.name}
                      </a>
                    </AccordionContent>
                  ))}
                </div>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="p-2 border-b-4 border-black">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="gap-3 flex justify-center items-center    ">
                <IoPersonCircle size={25} className="text-customColor" />
                My Account
              </div>
            </AccordionTrigger>
            <Link href={""}>
              <AccordionContent>Log Out</AccordionContent>
            </Link>
            <Link href={"/u/user-profile"}>
              <AccordionContent>My profile</AccordionContent>
            </Link>
            <Link href={"/u/saved-recipes"}>
              <AccordionContent>Saved Recipes & Collection</AccordionContent>
            </Link>
            <Link href={"/u/add-recipes"}>
              <AccordionContent>Add a Recipe</AccordionContent>
            </Link>
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
