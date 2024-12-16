"use client";

import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, setName } from "@/lib/features/googleAuthSlice";
import { setEmail } from "@/lib/features/emailAuthSlice";
import { useEffect } from "react";

export default function Page() {
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  // const currentStep = useSelector(
  //   (state: RootState) => state.emailAuth.currentStep
  // );

  useEffect(() => {
    if (session?.user) {
      const { name, email } = session.user;
      dispatch(setName(name || ""));
      dispatch(setEmail(email || ""));
      dispatch(googleLogin(email || ""));
    }
  }, [session, dispatch]);
  console.log(session?.user || {});

  const handleGoogleSignIn = async () => {
    const result = await signIn("google", { callbackUrl: "/u/home" });
    alert("Login successfully.");
  };
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
          <h1 className="text-3xl font-bold mb-6">Login</h1>

          <div className="flex flex-col gap-4">
            <button className="flex font-bold items-center justify-center py-3 px-2  outline outline-1 hover:bg-black hover:text-white ">
              <MdOutlineEmail className="mr-2" size={25} />
              Login with Email
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="group flex font-bold items-center justify-center py-3 px-2  outline outline-1 hover:bg-blue-400 hover:text-white"
            >
              <FaGoogle
                className="mr-2 text-blue-400 group-hover:text-white"
                size={25}
              />
              Login with Google
            </button>
          </div>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <a href="/signup" className="underline">
              Join now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
