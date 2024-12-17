"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/lib/store";
import { verifyOtp } from "@/lib/features/emailAuthSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function EmailOtpInput() {
  const dispatch: AppDispatch = useDispatch();
  const { email } = useSelector((state: RootState) => state.emailAuth);

  const loading = useSelector(
    (state: RootState) => state.emailAuth.loading.verifyOtp
  );
  const error = useSelector(
    (state: RootState) => state.emailAuth.error.verifyOtp
  );

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleVerifyOtp = async (data: z.infer<typeof FormSchema>) => {
    if (!email) {
      alert("No email found. Please try again.");
      return;
    }

    const output = await dispatch(verifyOtp({ email, otp: data.otp }));
    console.log(output);

    if (verifyOtp.fulfilled.match(output)) {
      router.push("/u/home");
    }
    if (verifyOtp.rejected.match(output)) {
      alert(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Check your email</h1>

      <div className="flex flex-col gap-4 ">
        <p className="text-xl">
          If this account exists, a unique <br /> verification code will be sent
          to <span className="font-bold"> {email}.</span>
        </p>
        <p className="text-xl">
          Enter the code here to complete <br /> your sign-up
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleVerifyOtp)}
            className="flex flex-col gap-6 justify-center items-center mt-5"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel className="text-lg font-bold">
                    Enter your unique code below:
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="w-full gap-3">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!form.formState.isValid || loading}
              variant="outline"
              className="w-full p-7 bg-customColor text-md font-bold text-white rounded-none"
            >
              LOG ME IN
            </Button>
          </form>
        </Form>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
