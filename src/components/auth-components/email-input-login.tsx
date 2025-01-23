"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { sendOtpForLogin, setEmail } from "@/lib/features/emailAuthSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import validator from "validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function EmailInputLogin() {
  const dispatch: AppDispatch = useDispatch();
  const email = useSelector((state: RootState) => state.emailAuth.email);
  const loading = useSelector(
    (state: RootState) => state.emailAuth.loading.sendOtpForLogin
  );
  const error = useSelector(
    (state: RootState) => state.emailAuth.error.sendOtpForLogin
  );

  const handleSendOtp = async () => {
    if (!email || !validator.isEmail(email)) {
      toast.warning("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    await dispatch(sendOtpForLogin(email));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Login an account</h1>
      <div>
        <Label htmlFor="email" className="text-lg font-bold">
          Email Address
        </Label>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Input
            id="email"
            type="email"
            placeholder="yourname@example.com"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className="p-6 placeholder:text-lg outline outline-1 rounded-none mt-2"
          />
          <Button
            className="w-full p-6 bg-customColor rounded-none"
            onClick={handleSendOtp} // Trigger send OTP action
            disabled={loading}
          >
            {loading ? "Sending..." : "JOIN NOW"}
          </Button>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
