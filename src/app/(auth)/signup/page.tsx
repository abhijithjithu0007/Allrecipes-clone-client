"use client";

import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { AppDispatch } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  goToEmailInput,
  setName,
  setEmail,
  googleRegister,
} from "@/lib/features/emailAuthSlice";
import { EmailInput } from "@/components/email-input";
import { EmailOtpInput } from "@/components/email-otp";
import { useEffect } from "react";

export default function Page() {
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.emailAuth.currentStep
  );

  useEffect(() => {
    if (session?.user) {
      const { name, email } = session.user;
      console.log("Session data:", session.user);
      dispatch(setName(name || ""));
      dispatch(setEmail(email || ""));
      dispatch(googleRegister({ name: name || "", email: email || "" }));
    }
  }, [session, dispatch]);

  const handleGoogleSignup = async () => {
    const result = await signIn("google", { callbackUrl: "/u/home" });
    if (result?.error) {
      console.error("Google Sign-In Error:", result.error);
    }
  };

  const renderContent = () => {
    if (currentStep === "emailInput") return <EmailInput />;
    if (currentStep === "otpInput") return <EmailOtpInput />;

    return (
      <button
        onClick={() => dispatch(goToEmailInput())}
        className="flex font-bold items-center justify-center py-3 px-2 outline outline-1 hover:bg-black hover:text-white"
      >
        <MdOutlineEmail className="mr-2" size={25} />
        Sign up with Email
      </button>
    );
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

          <div className="flex flex-col gap-4">
            {renderContent()}

            {currentStep === "" && (
              <button
                onClick={handleGoogleSignup}
                className="group flex font-bold items-center justify-center py-3 px-2 outline outline-1 hover:bg-blue-400 hover:text-white"
              >
                <FaGoogle
                  className="mr-2 text-blue-400 group-hover:text-white"
                  size={25}
                />
                Sign up with Google
              </button>
            )}
          </div>

          {currentStep === "" && (
            <p className="mt-10">
              By signing up, you agree to the{" "}
              <span className="underline">Terms of Service</span> and{" "}
              {/* <button onClick={() => signOut()}>======</button> */}
              <span className="underline">Privacy Policy.</span>
              If you live in the US you will also opt in to Allrecipes email
              communication.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
