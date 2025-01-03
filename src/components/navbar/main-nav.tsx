import React, { useEffect } from "react";
import Searchfield from "./search-field";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { IoPersonCircle, IoReorderThreeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Mainnav({
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLogout, setIsLogout] = React.useState(false);
  const router = useRouter();
  const userCookie = Cookies.get("user");

  useEffect(() => {
    const handlecheck = async () => {
      if (!userCookie) {
        setIsLogout(true);
        await signOut({ redirect: false });
      }
    };

    handlecheck();
  }, []);

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
    <nav className="flex justify-between p-6 pl-14 pr-14">
      <div className="w-full flex justify-start gap-10 items-center">
        <IoReorderThreeOutline
          onClick={() => setIsOpen(true)}
          size={32}
          className="z-50 block md:hidden"
        />
        <Link href="/home">
          <Image
            src={"/images/allrecipes_logo.jpg"}
            alt="AllRecipes Logo"
            width={180}
            height={65}
          />
        </Link>{" "}
      </div>
      <div className="w-full mt-2">
        <Searchfield />
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
                    <IoPersonCircle size={20} /> Login
                  </NavigationMenuLink>
                </NavigationMenuTrigger>
              ) : (
                <>
                  <NavigationMenuTrigger>
                    <div className="flex text-sm gap-2 items-center">
                      <IoPersonCircle size={25} className="text-customColor" />{" "}
                      My Profile
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex gap-2 p-4 flex-col lg:w-[170px] cursor-pointer">
                      <li
                        onClick={handleLogOut}
                        className="hover:bg-gray-100 p-2"
                      >
                        Log Out
                      </li>
                      <Link href={`/u/user-profile`}>
                        <li className="hover:bg-gray-100 p-2">My Profile</li>
                      </Link>
                      <Link href="/u/saved-recipes">
                        <li className="hover:bg-gray-100 p-2">
                          Saved Recipe & Collection
                        </li>
                      </Link>
                      <hr />
                      <Link href="/u/add-recipe">
                        {" "}
                        <li className="hover:bg-gray-100 p-2">Add Recipe</li>
                      </Link>
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
