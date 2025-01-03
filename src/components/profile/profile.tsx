import React from "react";
import Leftbar from "./left-bar";
import Userinfo from "./user-info";

export default function Profile() {
  return (
    <div className="flex w-full p-10 bg-gray-100 h-full gap-6">
      <Leftbar />
      <Userinfo />
    </div>
  );
}
