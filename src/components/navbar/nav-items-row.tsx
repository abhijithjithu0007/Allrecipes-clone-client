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
              <li className="hover:bg-gray-100 p-1 cursor-pointer">
                <NavigationMenuLink href="/meals/breakfast">
                  Breakfast
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-1 cursor-pointer">
                <NavigationMenuLink href="/meals/lunch">
                  Lunch
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-1 cursor-pointer">
                <NavigationMenuLink href="/meals/dinner ">
                  Dinners
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-1 cursor-pointer">
                <NavigationMenuLink href="/meals/desserts">
                  Desserts
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-1 cursor-pointer">
                <NavigationMenuLink href="/meals/salads">
                  Salads
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-1 cursor-pointer">
                <NavigationMenuLink href="/meals/drinks">
                  Drinks
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-1 cursor-pointer">
                <NavigationMenuLink href="/meals/snacks">
                  Snacks
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-1 cursor-pointer">
                <NavigationMenuLink href="/meals/side-dish">
                  Side-Dish
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
                <NavigationMenuLink href="/ingredients/egg">
                  Egg
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/ingredients/fish">
                  Fish
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/ingredients/rice">
                  Rice
                </NavigationMenuLink>
              </li>

              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/ingredients/wheat">
                  Wheat
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
            <ul className="flex gap-2 p-4 flex-col lg:w-[170px] z-50">
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
