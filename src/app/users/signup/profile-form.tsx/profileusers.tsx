"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
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
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast";
import { addUserProfiledetails, resetUserState } from "@/Store/Slices/userSlice";
import { useEffect, useRef } from "react";

const profileFormSchema = z
  .object({
    username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name must not be longer than 30 characters." }),
    password: z
  .string()
  .min(2, { message: "Password must be at least 2 characters." })
  .max(30, { message: "Password must not be longer than 30 characters." }),
   name: z.string( {required_error: "Please enter your name."}).min(5).max(30),
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email(),
    dob: z.string(),
    phoneNumber: z.string(),
    profileImage: z.instanceof(File),
    address: z.string(),
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;




export function ProfileFormUsers() {
  const isDataUploaded = useRef({profileImage: false, finaldata: false});
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state as any);
  const {backend} = useSelector((state) => state as any);
  const { toast } = useToast();
  const defaultValues: Partial<ProfileFormValues> = {
    username: user.username,
    password: user.password,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    profileImage: user.profileImage,
    dob: user.dob,
    address: user.address,
  };
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function uploadProfileImage(){
    const formdataimg = new FormData();
    formdataimg.append('username', user.username);
    formdataimg.append('profileimage', user.profileImage); 
    fetch(`${backend.rootapi}/user/register/profileimage`, {
      method: 'POST',
      body: formdataimg,
    })
    .then(response => {
      if (response.status === 200) {
        isDataUploaded.current.profileImage = true;
      }
      })
      .then(data => {
      })
      .catch(error => {
      console.error(error);
      });
  }
  useEffect(() => {   
    if (user.username &&  user.profileImage) {
    uploadProfileImage(); 
    fetch(`${backend.rootapi}/user/register`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        console.log("final",response);
        
      if (response.status === 200) {
        isDataUploaded.current.finaldata = true;  
        if(isDataUploaded.current.finaldata && isDataUploaded.current.profileImage){
          dispatch(resetUserState());
          window.location.reload();
        }
      }
      })
      .then(data => {
        
      })
      .catch(error => {
      console.error(error);
      });
    }
  }, [user])

  function onSubmit(data: ProfileFormValues) {
    dispatch(addUserProfiledetails(data));
    toast({
      title: "User Registration !",
      description: "Profile information saved successfully!",
      action: (
        <ToastAction altText="Clear">Clear</ToastAction>
      ),
    });    
  }
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
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
                <Input placeholder="Enter your username" {...field}  />
              </FormControl>
              <FormDescription>
                This is your username that should be unique.
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
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                onChange={field.onChange}
                defaultValue={field.value}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormDescription>
                Enter your phone number without the country code.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your address" {...field}  />
              </FormControl>
              <FormDescription>
                Provide your Postal Address.
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
             
              <FormMessage />
            </FormItem>
          )}
        /> 
        <Button
          type="submit"
          variant="outline"
        >
          Register
      </Button>
      </form>
    </Form>
  );
}
