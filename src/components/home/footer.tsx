import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center ">
            <img
              src="/images/allrecipes_logo.jpg"
              alt="Pagedone Logo"
              className="h-8 w-auto"
            />
          </div>
          <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-8 mb-5 border-b border-gray-200">
            <li>
              <a
                href="/recipe-a-z"
                className="text-gray-800 font-bold hover:text-customColor"
              >
                Meals
              </a>
            </li>
            <li>
              <a
                href="/recipe-a-z"
                className="font-bold text-gray-800 hover:text-customColor"
              >
                Cuisine
              </a>
            </li>
            <li>
              <a
                href="/recipe-a-z"
                className="font-bold text-gray-800 hover:text-customColor"
              >
                Ingredients
              </a>
            </li>
            <li>
              <a
                href="/recipe-a-z"
                className="font-bold text-gray-800 hover:text-customColor"
              >
                About
              </a>
            </li>
          </ul>
          <div className="flex space-x-10 justify-center py-3 items-center mb-10">
            <a
              href="https://www.instagram.com/abhiiiiy__/"
              className="block  text-gray-900 transition-all duration-500 hover:text-pink-600 "
            >
              <FaInstagram size={23} />
            </a>
            <a
              href="https://github.com/abhijithjithu0007"
              className="block  text-gray-900 transition-all duration-500 hover:text-gray-500"
            >
              <FaGithub size={23} />
            </a>
            <a
              href="https://www.linkedin.com/in/abhijith--v/"
              className="block  text-gray-900 transition-all duration-500 hover:text-indigo-600 "
            >
              <FaLinkedin size={23} />
            </a>
          </div>
          <span className="text-base text-gray-500 text-center block">
            ©<a>allrecipe</a> 2024, All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
