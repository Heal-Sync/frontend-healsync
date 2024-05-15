"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoctorAccountdetails } from "@/Store/Slices/doctorSlice";


const accountFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name must not be longer than 30 characters." }),
  password: z
  .string()
  .min(2, { message: "Password must be at least 2 characters." })
  .max(30, { message: "Password must not be longer than 30 characters." }),
  aadhaar: z
  .string()
  .min(12, { message: "Aadhaar length should be 12 digits." }),
  license: z
  .string().toUpperCase(),
  dob: z.string(),
  profileImage: z.instanceof(File),
  age: z.number(),
  isAccountComplete: z.boolean().default(false),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;


export function AccountForm() {
  const dispatch = useDispatch();
  const { doctor } = useSelector((state) => state);
  const [age, setAge] = useState<number>(0);
  const defaultValues: Partial<AccountFormValues> = {
    username: doctor.username,
    password: doctor.password,
    aadhaar: doctor.aadhaar,
    license: doctor.license,
    dob: doctor.dob,
    age: doctor.age,
    profileImage: doctor.profileImage,
  };
  

  const calculateAge = (dob: Date): number => {
    const today = new Date();
    const birthDate = new Date(dob);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return calculatedAge;
  };
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    data['age'] = age;
    data['isAccountComplete'] = true;
    dispatch(addDoctorAccountdetails(data));
    toast({
      title: "Doctor Registration !",
      description: "Account information saved successfully!",
      action: (
        <ToastAction altText="Clear">Clear</ToastAction>
      ),
    });
  }
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    setAge(calculateAge(selectedDate));
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                Select a unique username to represent you on the platform.
                Choose wisely.
              </FormDescription>
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
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormDescription>
                Create a strong Password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aadhaar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhaar</FormLabel>
              <FormControl>
               <Input
                  type="text"
                  placeholder="Enter Aadhaar Number"
                  {...field}
                  onKeyDown={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                      e.preventDefault();
                    }
                    if (target.value.length >= 12 && e.key !== 'Backspace' && e.key !== 'Delete') {
                      e.preventDefault();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                Enter Your 12 digits Aadhaar Number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="license"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Number</FormLabel>
              <FormControl>
              <Input
                placeholder="Enter your License Number"
                {...field}
                onChange={(e) => {
                  const upperCaseValue = e.target.value.toUpperCase();
                  field.onChange(upperCaseValue);
                }}
              />
              </FormControl>
              <FormDescription>
                Provide your License Number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <label htmlFor="profileImage" className="block w-full">
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        field.onChange(e.target.files[0]);
                      }
                    }}
                    style={{ display: "none" }}
                  />
                  <Button
                    asChild
                    variant="outline"
                  >
                    <span className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100">
                      {field.value
                        ? "Change Profile Picture"
                        : "Upload Profile Picture"}
                    </span>
                  </Button>
                </label>
              </FormControl>
              {field.value && (
                <img
                  src={URL.createObjectURL(field.value)}
                  alt="Profile preview"
                  className="mt-4 w-24 h-24 rounded-full object-cover"
                />
              )}
              <FormDescription>Upload a profile picture.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
       <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Select your date of birth"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleDateChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>
                Your date of birth is required to verify your age Your age is {age} years.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline" >Save information</Button>
      </form>
    </Form>
  );
}
