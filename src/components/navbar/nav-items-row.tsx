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

export default function Navitemsrow() {
  return (
    <div className="flex justify-between items-center p-4 pl-12 pr-14 ">
      <div className="flex">
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
              <div className="text-sm font-bold">MEALS</div>
            </Link>
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
            <Link href="/recipe-a-z" className="hover:underline">
              <div className="text-sm font-bold">INGREDIENTS</div>
            </Link>
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
function CuisineMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Link href="/recipe-a-z" className="hover:underline">
              <div className="text-sm font-bold">CUISINE</div>
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="max-h-[350px] overflow-y-auto">
            <ul className="flex gap-2 p-4 flex-col lg:w-[170px]">
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/cuisine/italian">
                  Italian
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/cuisine/chinese">
                  Chinese
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/cuisine/indian">
                  Indian
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/cuisine/mexican">
                  Mexican
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/cuisine/french">
                  French
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/cuisine/japanese">
                  Japanese
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/cuisine/american">
                  American
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/cuisine/korean">
                  Korean
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/cuisine/greek">
                  Greek
                </NavigationMenuLink>
              </li>
              <li className="hover:bg-gray-100 p-2 cursor-pointer">
                <NavigationMenuLink href="/cuisine/russian">
                  Russian
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
          <NavigationMenuTrigger className="hover:underline">
            <div className="text-sm font-bold">ABOUT US</div>
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
