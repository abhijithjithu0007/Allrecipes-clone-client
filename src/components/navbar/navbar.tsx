"use client";

import React, { useState } from "react";
import Navitemsrow from "./nav-items-row";
import Mainnav from "./main-nav";
import Togglesidebar from "../sidebar/toggle-sidebar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Mainnav isOpen={isOpen} setIsOpen={setIsOpen} />

      {isOpen && (
        <div className="absolute top-0 left-0 h-full bg-gray-100 shadow-lg z-50">
          <Togglesidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}

      <div className={`relative ${isOpen ? "z-40" : "z-10"}`}>
        <Navitemsrow />
      </div>
    </div>
  );
}
