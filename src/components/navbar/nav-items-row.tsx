import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navitemsrow() {
  return (
    <div className="flex justify-between items-center p-5 ">
      <div className="flex">
        <DinnersMenu />
        <MealsMenu />
        <IngredientsMenu />
        <AboutUsMenu />
      </div>
      <div>
        <h1 className="text-sm font-bold">GET MAGAZINE</h1>
      </div>
    </div>
  );
}

function DinnersMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <div className="text-sm">DINNERS</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex gap-2 p-4 flex-col lg:w-[170px]">
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink>View Dinners</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MealsMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <div className="text-sm">MEALS</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex gap-2 p-4 flex-col lg:w-[170px]">
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/meals/breakfast">
                  Breakfast
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/meals/lunch">
                  Lunch
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/meals/salads">
                  Salads
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/meals/drinks">
                  Drinks
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/meals/desserts">
                  Desserts
                </NavigationMenuLink>
              </li>
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
            <div className="text-sm">INGREDIENTS</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex gap-2 p-4 flex-col lg:w-[170px]">
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/ingredients/chicken">
                  Chicken
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/ingredients/beef">
                  Beef
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/ingredients/fruits">
                  Fruits
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/ingredients/vegetables">
                  Vegetables
                </NavigationMenuLink>
              </li>
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
          <NavigationMenuTrigger>
            <div className="text-sm">ABOUT US</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex gap-2 p-4 flex-col lg:w-[170px]">
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
