"use client";

import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  console.log(session?.user);

  return (
    <div className="flex h-screen w-full">
      <div className="relative w-1/2 h-full">
        <Image
          src="/images/loginImg.png"
          alt="Login"
          layout="fill"
          className="object-cover"
        />
      </div>

      <div className="w-1/2 h-full flex flex-col items-center justify-center bg-white px-6 py-8">
        <div className="w-full max-w-sm">
          <div className="mb-12">
            <Image
              src="/images/allrecipes_logo.jpg"
              alt="Logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold mb-6">Create an account</h1>

          <div className="flex flex-col gap-4">
            {/* Email Sign-up Button */}
            <button className="flex font-bold items-center justify-center py-3 px-2 outline outline-1 hover:bg-black hover:text-white">
              <MdOutlineEmail className="mr-2" size={25} />
              Sign up with Email
            </button>

            {/* Google Sign-up Button */}
            <button
              onClick={() => signIn("google")}
              className="group flex font-bold items-center justify-center py-3 px-2 outline outline-1 hover:bg-blue-400 hover:text-white"
            >
              <FaGoogle
                className="mr-2 text-blue-400 group-hover:text-white"
                size={25}
              />
              Sign up with Google
            </button>
          </div>

          <p className="mt-4 text-center">
            Have an account?{" "}
            <a href="/login" className="underline">
              Log in
            </a>
          </p>
          <p className="mt-10">
            By signing up, you agree to the{" "}
            <span className="underline">Terms of Service</span> and{" "}
            <span className="underline">Privacy Policy.</span>
            If you live in the US you will also opt in to Allrecipes email
            communication.
          </p>
        </div>
      </div>
    </div>
  );
}
