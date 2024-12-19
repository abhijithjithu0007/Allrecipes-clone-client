import React from "react";
import Searchfiled from "./search-filed";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Mainnav() {
  return (
    <nav className="flex justify-around p-6 ">
      <div className="p-6 w-full">
        <Image
          src={"/images/allrecipes_logo.jpg"}
          alt=""
          width={180}
          height={65}
        />
      </div>
      <div className="p-6 w-full mt-2">
        <Searchfiled />
      </div>
      <div className="p-6 w-full flex justify-end mt-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="flex text-base gap-2 items-center">
                  <CgProfile /> My Profile
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
              <NavigationMenuContent>
                <ul className="flex gap-2 p-4 flex-col lg:w-[170px] ">
                  <li className="hover:bg-gray-100 p-2">Log Out</li>
                  <li className="hover:bg-gray-100 p-2">My Profile</li>
                  <li className="hover:bg-gray-100 p-2">
                    Saved Recipe & Collection
                  </li>
                  <hr />
                  <li className="hover:bg-gray-100 p-2">Add Recipe</li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
