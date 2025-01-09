import Image from "next/image";
import React from "react";
import { IoCloseSharp, IoPersonCircle, IoLogoInstagram } from "react-icons/io5";
import { CiFacebook } from "react-icons/ci";
import { accordionData } from "../consts/sidebar-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "../ui/label";
import SearchField from "../navbar/search-field";
import Link from "next/link";

export default function Togglesidebar({
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed top-0 left-0 w-80 p-5 bg-white shadow-lg overflow-y-auto h-screen z-50">
      <div className="flex items-center justify-between mb-6">
        <Image
          src="/images/allrecipes_logo.jpg"
          alt="Logo"
          width={120}
          height={35}
          className="object-contain"
        />
        <IoCloseSharp
          onClick={() => setIsOpen(false)}
          size={32}
          className="cursor-pointer text-gray-700"
        />
      </div>
      <div className="mb-6">
        <Label htmlFor="search" className="text-md font-semibold">
          Search
        </Label>
        <div className="mt-2">
          <SearchField />
        </div>
      </div>
      <div className="mb-6">
        <Accordion type="single" collapsible className="w-full">
          {accordionData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <div className="flex justify-between items-center font-bold text-gray-800">
                <Link href={item.path}>
                  <span className="hover:text-customColor transition-colors">
                    {item.trigger}
                  </span>
                </Link>
                {item.content.length > 0 && (
                  <AccordionTrigger className="ml-2 text-gray-600" />
                )}
              </div>
              {item.content.length > 0 && (
                <div className="ml-4">
                  {item.content.map((subItem, subIndex) => (
                    <AccordionContent key={subIndex}>
                      <Link href={subItem.path}>
                        <span className="text-sm text-gray-700 hover:text-customColor transition-colors">
                          {subItem.name}
                        </span>
                      </Link>
                    </AccordionContent>
                  ))}
                </div>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mb-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-account">
            <AccordionTrigger className="w-full">
              <div className="flex items-center gap-3 text-gray-800 font-semibold">
                <IoPersonCircle size={25} className="text-customColor" />
                My Account
              </div>
            </AccordionTrigger>
            <div className="ml-4 mt-2">
              <Link href={""}>
                <AccordionContent>Log Out</AccordionContent>
              </Link>
              <Link href={"/u/user-profile"}>
                <AccordionContent>My Profile</AccordionContent>
              </Link>
              <Link href={"/u/saved-recipes"}>
                <AccordionContent>Saved Recipes & Collections</AccordionContent>
              </Link>
              <Link href={"/u/add-recipes"}>
                <AccordionContent>Add a Recipe</AccordionContent>
              </Link>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="mt-4">
        <p className="text-md font-semibold mb-2">Follow us on</p>
        <div className="flex gap-4 text-xl text-gray-700">
          <a href="#" className="hover:text-customColor">
            <IoLogoInstagram />
          </a>
          <a href="#" className="hover:text-customColor">
            <CiFacebook />
          </a>
        </div>
      </div>
    </div>
  );
}
