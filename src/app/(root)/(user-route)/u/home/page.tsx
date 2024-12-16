"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function Home() {
  const handleLogOut = async () => {
    await signOut({ callbackUrl: "/login" });
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
