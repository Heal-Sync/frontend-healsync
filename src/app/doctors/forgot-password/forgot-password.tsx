"use client";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useDispatch, useSelector } from "react-redux";
import { updateValue } from "@/Store/Slices/doctorSlice";

const forgotPasswordSchema = z.object({
  username: z.string({ message: "Invalid username" }),
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
  newPassword: z.string().min(8, { message: "New password is required" }), 
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm password is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});;

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const {backend} = useSelector((state) => state as any);
  const onInvalid = (errors: any) => console.error(errors)
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      username: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    console.log("Form data:", data);
    const { username, newPassword } = data;
    try {
      const response = await axios.post(
        `${backend.rootapi}/doctor/reset-password`,
        { username, newPassword }
      );
      if (response.status === 200) {
        dispatch(updateValue({ key: 'password', value: response.data.password }));  //updated new password to redux
      }
      setError(null);
      router.push("/doctors/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data.error || "Failed to reset password. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    }

  }

  async function verifyOTP() {
    const { username, otp } = form.getValues();
    console.log("Verifying OTP with data:", { username, otp });
    try {
      const response = await axios.post(
        "http://localhost:6001/doctor/verify-otp",
        { username, otp }
      );
      setOtpVerified(true);
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data.error || "Failed to verify OTP. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  }

  async function sendOTP() {
    const username = form.getValues("username");
    if (!username) {
      setError("Please enter your email address");
      return;
    }
    try {
      await axios.post("http://localhost:6001/doctor/send-otp", { username });
      setOtpSent(true);
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data.error || "Failed to send OTP. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8">
        {!otpVerified && (
          <>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
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
          </>
        )}
         {otpVerified && (
          <>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <div className="flex justify-between">
          {!otpVerified && (
            <Button type="button" onClick={sendOTP} disabled={otpSent}>
              {otpSent ? "OTP Sent" : "Send OTP"}
            </Button>
          )}
          {!otpVerified ? (
            <Button type="button" onClick={verifyOTP}>
              Verify OTP
            </Button>
          ) : (
            <Button type="submit">
              Reset Password
            </Button>
          )}
        </div>
          
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
