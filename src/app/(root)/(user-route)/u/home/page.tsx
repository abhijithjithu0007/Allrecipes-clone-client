"use client";
import { signOut } from "next-auth/react";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleLogOut = async () => {
    const userCookie = Cookies.get("user");
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
    <div>
      <h1>my home</h1>
      <button onClick={handleLogOut} className="text-xl p-5 bg-yellow-200">
        logout
      </button>
    </div>
  );
}
