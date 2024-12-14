"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setEmail, goToOtpInput } from "@/lib/features/emailAuthSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";

export function EmailInput() {
  const dispatch: AppDispatch = useDispatch();
  const email = useSelector((state: RootState) => state.emailAuth.email);

  const handleSendOtp = () => {
    if (email) {
      console.log(`Sending OTP to: ${email}`);
      dispatch(goToOtpInput());
    } else {
      alert("Please enter a valid email.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create an account</h1>

      <div>
        <Label htmlFor="email" className="text-lg font-bold">
          Email Adress
        </Label>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Input
            type="email"
            placeholder="yourname@example.com"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className="p-6 placeholder:text-lg outline outline-1 rounded-none mt-2"
          />
          <Button
            className="w-full p-6 bg-customColor rounded-none"
            onClick={handleSendOtp}
          >
            JOIN NOW
          </Button>
        </div>
      </div>
    </div>
  );
}
