"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import category_data from "../../../controllers/categoriesdetails";
import expereincelist from "@/app/controllers/experencedoctor"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useDispatch, useSelector } from "react-redux"
import { addDoctorProfiledetails } from "@/Store/Slices/doctorSlice"

const profileFormSchema = z.object({
  category: z
    .string({
      required_error: "Please select an Category to display.",
    }),
    experience: z
    .string({
      required_error: "Please select an Experience to display.",
    }),
    isCategoryComplete: z.boolean().default(false),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>



export function CategoryForm() {
  const dispatch = useDispatch();
  const { doctor } = useSelector((state) => state);
  const defaultValues: Partial<ProfileFormValues> = {
    category: doctor.category,
    experience: doctor.experience,
  }
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

 

  function onSubmit(data: ProfileFormValues) {
    data["isCategoryComplete"] = true;
    dispatch(addDoctorProfiledetails(data));
    toast({
      title: "Doctor Registration !",
      description: "Account information saved successfully!",
      action: (
        <ToastAction altText="Clear">Clear</ToastAction>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your specialisation." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {category_data && Array.isArray(category_data) && category_data.map((category, index) => (
                    <SelectItem key={index} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                  
                </SelectContent>
              </Select>
              <FormDescription>
                It would help patients to find you with your specialistion.{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />       
         <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Provide your Experience" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {
                  expereincelist && Array.isArray(expereincelist) && expereincelist.map((experence, index) => (
                    <SelectItem key={index} value={experence.exp}>
                      {experence.exp}
                    </SelectItem>
                  ))
                }
                </SelectContent>
              </Select>
              <FormDescription>
                It helps our users to know your experience in the field.{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />       
        <Button variant="outline" type="submit">Save Information</Button>
      </form>
    </Form>
  )
}