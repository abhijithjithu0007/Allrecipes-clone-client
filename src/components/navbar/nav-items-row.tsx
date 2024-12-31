import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {
  navMealData,
  navIngredientsData,
  navCuisineData,
} from "../consts/nav-items-data";

export default function Navitemsrow() {
  return (
    <div className="flex justify-between items-center p-4 pl-12 pr-14 ">
      <div className="flex ">
        <MealsMenu />
        <IngredientsMenu />
        <CuisineMenu />
        <AboutUsMenu />
      </div>
      <div>
        <h1 className="text-sm font-bold">GET MAGAZINE</h1>
      </div>
    </div>
  );
}

function MealsMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Link href="/recipe-a-z" className="hover:underline">
              <div className="text-sm font-extrabold">MEALS</div>
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex gap-2 p-4 flex-col lg:w-[170px]">
              {navMealData.map((item, key) => (
                <li key={key} className="hover:bg-gray-100 p-1 cursor-pointer">
                  <NavigationMenuLink href={item.path}>
                    {item.name}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function IngredientsMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Link href="/recipe-a-z" className="hover:underline">
              <div className="text-sm font-extrabold">INGREDIENTS</div>
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex gap-2 p-4 flex-col lg:w-[170px]">
              {navIngredientsData.map((item, key) => (
                <li key={key} className="hover:bg-gray-100 p-2 cursor-pointer">
                  <NavigationMenuLink href={item.path}>
                    {item.name}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
function CuisineMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Link href="/recipe-a-z" className="hover:underline">
              <div className="text-sm font-extrabold">CUISINE</div>
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="max-h-[350px] overflow-y-auto">
            <ul className="flex gap-2 p-4 flex-col lg:w-[170px]">
              {navCuisineData.map((item, key) => (
                <li key={key} className="hover:bg-gray-100 p-2 cursor-pointer">
                  <NavigationMenuLink href={item.path}>
                    {item.name}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function AboutUsMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:underline">
            <div className="text-sm font-extrabold">ABOUT US</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex gap-2 p-4 flex-col lg:w-[170px] z-30">
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/aboutus/about-all-recipes">
                  About All Recipes
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/aboutus/how-to-add-recipes">
                  How to Add Recipes
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
