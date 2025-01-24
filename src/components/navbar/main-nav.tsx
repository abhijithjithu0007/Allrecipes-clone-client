import React from "react";
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
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { useUserLogout } from "@/hook/useCustomHook";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./notification";

export default function Mainnav({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const fetchUserData = async () => {
    const response = await axiosInstance.get("/user/user-profile");
    if (response.status !== 200) {
      throw new Error("Something went wrong");
    }
    return response.data.data;
  };

  const { data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserData,
  });

  const router = useRouter();

  const isUser = data?.email ? true : false;
  const { mutate } = useUserLogout();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    mutate(
      { void: true },
      {
        onSuccess: () => {
          toast.success("Logged out successfully.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          router.push("/login");
        },
      }
    );
  };

  return (
    <nav className="flex justify-between p-2 pl-5 pr-5 sm:p-4 lg:p-6 sm:pl-14 sm:pr-14">
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
        </Link>
      </div>

      <div className="hidden md:flex w-full mt-2">
        <Searchfield />
      </div>
      <div className="w-full flex justify-end mt-2 z-40">
        <div className="flex items-center mt-1">
          <Notification />
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              {isUser ? (
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
                        onClick={handleLogout}
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
                        <li className="hover:bg-gray-100 p-2">Add Recipe</li>
                      </Link>
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuTrigger>
                  <NavigationMenuLink
                    href="/login"
                    className="flex items-center gap-2"
                  >
                    <IoPersonCircle size={20} /> Login
                  </NavigationMenuLink>
                </NavigationMenuTrigger>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
