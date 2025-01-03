import React from "react";
import { Button } from "../ui/button";
import { IoPeopleSharp } from "react-icons/io5";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";

export default function Userinfo() {
  return (
    <div className="bg-white p-5 w-full">
      <div>
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-extrabold p-3">Profile Settings</h1>
            <Button
              variant="ghost"
              className="w-44 border-none p-7 uppercase bg-customColor text-sm font-bold text-white"
            >
              Save changes
            </Button>
          </div>
          <div className="p-5 text-lg">
            <p>
              The information on this page will be displayed on your public
              profile, which is visible to other users
            </p>
            <div className="flex mt-3 items-center text-gray-600">
              <IoPeopleSharp />
              <p className="text-sm">
                The information on this page will be displayed publicly and will
                be visible to others
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="p-2 border border-gray-400">
          <div className="p-4 border-b border-gray-400">
            <h1 className="text-2xl font-bold">About Me</h1>
          </div>
          <div className="p-6 flex items-center justify-evenly">
            <div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-md font-bold" htmlFor="email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  className="p-3 h-15 rounded-none border-black"
                  placeholder="Email"
                />
                <p className="text-[13px] text-gray-600">
                  *If you'd like to update your email address, please contact
                  Customer Service.
                </p>
              </div>
              <div className="grid w-full mt-5 max-w-sm items-center gap-1.5">
                <Label className="text-md font-bold" htmlFor="name">
                  Display Name*
                </Label>
                <Input
                  type="text"
                  id="name"
                  className="p-3 h-15 rounded-none border-black"
                  placeholder="Your Display Name"
                />
              </div>
            </div>
            <div className="cursor-pointer">
              <Label className="text-sm font-bold" htmlFor="image">
                Add an image
              </Label>
              <Image
                src={"/images/user-pro.png"}
                alt=""
                height={200}
                width={200}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
