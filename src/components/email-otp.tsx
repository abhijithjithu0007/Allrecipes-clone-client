import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";

export function EmailOtpInput() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Check your email</h1>

      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col gap-5">
          <p className="text-xl">
            If this account exists, a unique <br /> verification code will be
            sent to{" "}
            <span className="font-bold"> abhijithjithu36151@gmail.com.</span>
          </p>
          <p className="text-xl">
            Enter the code here to complete <br /> your sign-up
          </p>
        </div>

        <div className="flex flex-col gap-6 justify-center items-center mt-5">
          <Label className="text-lg font-bold">
            Enter your unique code below:
          </Label>
          <div>
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
              <InputOTPGroup className="w-full gap-3">
                <InputOTPSlot index={0} className="border-2 border-black p-4" />
                <InputOTPSlot index={1} className="border-2 border-black p-4" />
                <InputOTPSlot index={2} className="border-2 border-black p-4" />
                <InputOTPSlot index={3} className="border-2 border-black p-4" />
                <InputOTPSlot index={4} className="border-2 border-black p-4" />
                <InputOTPSlot index={5} className="border-2 border-black p-4" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            variant="outline"
            className="w-full p-7 bg-customColor text-lg font-bold text-white rounded-none"
          >
            Verify OTP
          </Button>
        </div>
      </div>
    </div>
  );
}
