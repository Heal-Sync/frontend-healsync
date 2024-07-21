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
import { useDispatch, useSelector } from "react-redux";
import { addDoctordetails } from "@/Store/Slices/doctorSlice";
import { updateToken } from "@/Store/Slices/tokenSlice";

const loginFormSchema = z.object({
  email: z.string().min(2, { message: "email is required" }),
  password: z.string().min(2, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const {backend} = useSelector((state) => state as any);
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      const response = await axios.post(
        `${backend.rootapi}/doctor/login`,
        data
      );
      const doctor = response.data.doctor;
      dispatch(addDoctordetails(doctor));
      dispatch(updateToken({ key: 'id', value: response.data.token }));
      const token = response.data.token;
      console.log("Login successful. Token:", token);

      router.push("/doctors/dashboard");
      setError(null);
    } catch (error) {
      setError("Invalid email or password");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex items-center justify-between">
          <Button type="submit">Login</Button>
          <a
            href="/doctors/forgot-password"
            className="text-sm text-muted-foreground hover:text-gray-200"
          >
            Forgot password?
          </a>
        </div>
      </form>
    </Form>
  );
}
