import React, { useEffect } from "react";
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
import { IoReorderThreeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";

export default function Mainnav({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLogout, setIsLogout] = React.useState(false);
  const router = useRouter();
  const userCookie = Cookies.get("user");

  useEffect(() => {
    if (!userCookie) setIsLogout(true);
  }, [userCookie]);

  const handleLogOut = async () => {
    const user = JSON.parse(userCookie || "{}");

    if (user.authMethod === "google") {
      await signOut({ callbackUrl: "/login" });
      Cookies.remove("user");
    }
    if (user.authMethod === "email") {
      Cookies.remove("user");
      router.push("/login");
    }
  };

  return (
    <nav className="flex justify-between p-6">
      <div className="w-full flex justify-start gap-10 items-center">
        <IoReorderThreeOutline
          onClick={() => setIsOpen(true)}
          size={32}
          className="z-50 block md:hidden"
        />
        <Image
          src={"/images/allrecipes_logo.jpg"}
          alt="AllRecipes Logo"
          width={180}
          height={65}
        />
      </div>
      <div className="w-full mt-2">
        <Searchfiled />
      </div>
      <div className="w-full flex justify-end mt-2 z-40">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              {isLogout ? (
                <NavigationMenuTrigger>
                  <NavigationMenuLink
                    href="/login"
                    className="flex items-center gap-2"
                  >
                    <CgProfile size={20} /> Login
                  </NavigationMenuLink>
                </NavigationMenuTrigger>
              ) : (
                <>
                  <NavigationMenuTrigger>
                    <div className="flex text-base gap-2 items-center">
                      <CgProfile size={20} /> My Profile
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                  <NavigationMenuContent>
                    <ul className="flex gap-2 p-4 flex-col lg:w-[170px] cursor-pointer">
                      <li
                        onClick={handleLogOut}
                        className="hover:bg-gray-100 p-2"
                      >
                        Log Out
                      </li>
                      <li className="hover:bg-gray-100 p-2">My Profile</li>
                      <li className="hover:bg-gray-100 p-2">
                        Saved Recipe & Collection
                      </li>
                      <hr />
                      <li className="hover:bg-gray-100 p-2">Add Recipe</li>
                    </ul>
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}