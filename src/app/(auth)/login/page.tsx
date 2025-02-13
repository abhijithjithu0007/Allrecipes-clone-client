"use client";

import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { AppDispatch } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { goToEmailInputForLogin } from "@/lib/features/emailAuthSlice";
import { EmailInputLogin } from "@/components/auth-components/email-input-login";
import { EmailOtpInputLogin } from "@/components/auth-components/email-otp-login";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { googleLogin } from "@/lib/features/googleAuthSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const { data: session } = useSession();
  const currentStep = useSelector(
    (state: RootState) => state.emailAuth.currrentStepOfLogin
  );
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      const { email } = session.user;
      if (email) {
        dispatch(googleLogin(email || ""))
          .unwrap()
          .then((response) => {
            if (response.statusCode === 200) {
              router.push("/home");
            }
            if (response.message) {
              toast.success(response.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          });
      }
    }
  }, [session, dispatch]);

  const handleGoogleSignup = async () => {
    await signIn("google");
  };
  const handleOut = async () => {
    if (session) {
      await signOut({ redirect: false });
    }
  };

  const renderContent = () => {
    if (currentStep === "emailInput") return <EmailInputLogin />;
    if (currentStep === "otpInput") return <EmailOtpInputLogin />;

    return (
      <button
        onClick={() => dispatch(goToEmailInputForLogin())}
        className="flex font-bold items-center justify-center py-3 px-2 outline outline-1 hover:bg-black hover:text-white"
      >
        <MdOutlineEmail className="mr-2" size={25} />
        Login with Email
      </button>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen w-full">
      <div className="relative w-full sm:w-1/2 h-full">
        <Image
          src="/images/loginImg.png"
          alt="Login"
          layout="fill"
          className="object-cover"
        />
      </div>

      <div className="w-full sm:w-1/2 h-full flex flex-col items-center justify-center bg-white px-6 py-8">
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
                Login with Google
              </button>
            )}
          </div>

          {currentStep === "" && (
            <p className="mt-10 text-center">
              Dont have an account?
              <a href="/signup" onClick={handleOut} className="underline">
                Join now
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
