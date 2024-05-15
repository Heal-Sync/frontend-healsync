"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useDispatch, useSelector } from "react-redux";
import { addDoctorEducationdetails, resetDoctorState } from "@/Store/Slices/doctorSlice";
import { Doctor } from "@/Store/interfaces";
import { useEffect, useRef, useState } from "react";
import { set } from "date-fns";

const items = [
  {
    id: "mbbs",
    label: "MBBS",
  },
  {
    id: "md",
    label: "MD",
  },
  {
    id: "ms",
    label: "MS",
  },
  {
    id: "dm",
    label: "DM",
  },
  {
    id: "mch",
    label: "MCh",
  },
  {
    id: "bds",
    label: "BDS",
  },
  {
    id: "bams",
    label: "BAMS",
  },
  {
    id: "bhms",
    label: "BHMS",
  },
  {
    id: "bums",
    label: "BUMS",
  },
  {
    id: "bnys",
    label: "BNYS",
  },
  {
    id: "bpt",
    label: "BPT",
  },
] as const;

const displayFormSchema = z.object({
  medicaldegree: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one program.",
  }),
  registration: z.string().min(6, { message: "Registration number is too short" }).optional(),
  degreepdf: z.instanceof(File),
  isEducationComplete: z.boolean().default(false),
});

type DisplayFormValues = z.infer<typeof displayFormSchema>;




export function EducationForm() {
  const isDataUploaded = useRef({degreePdf: false, profileImage: false, finaldata: false});
  const [isAlert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const { doctor } = useSelector((state) => state as any);
  const {backend} = useSelector((state) => state as any);
  const defaultValues: Partial<DisplayFormValues> = {
    registration: doctor.registration,
    degreepdf: doctor.degreepdf,
    medicaldegree: doctor.medicaldegree,
  };

  function uploadDegree(){
    const formdata = new FormData();
    formdata.append('username', doctor.username);
    formdata.append('degree', doctor.degreepdf); 
    
    fetch(`${backend.rootapi}/doctor/register/degree`, {
      method: 'POST',
      body: formdata,
    })
    .then(response => {
      if (response.status === 200) {
        isDataUploaded.current.degreePdf = true;
      }
        
      })
      .then(data => {
      })
      .catch(error => {
      console.error(error);
      });
  }

  function uploadProfileImage(){
    const formdataimg = new FormData();
    formdataimg.append('username', doctor.username);
    formdataimg.append('profileimage', doctor.profileImage); 
    fetch(`${backend.rootapi}/doctor/register/profileimage`, {
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
    if(!doctor.isEducationComplete || !doctor.isProfileComplete || !doctor.isAccountComplete || !doctor.isCategoryComplete || !doctor.isLocationComplete) {
      setAlert(true);
      return;
    }
    uploadDegree();
    uploadProfileImage(); 
    fetch(`${backend.rootapi}/doctor/register`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctor),
    })
      .then(response => {
        console.log("final",response);
        
      if (response.status === 200) {
        isDataUploaded.current.finaldata = true;  
        if(isDataUploaded.current.finaldata && isDataUploaded.current.degreePdf && isDataUploaded.current.profileImage){
          dispatch(resetDoctorState());
        }
      }
      })
      .then(data => {
        
      })
      .catch(error => {
      console.error(error);
      });
  }, [doctor])
  
  
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues,
  });
  function onSubmit(data: DisplayFormValues) {
    data["isEducationComplete"] = true;
    dispatch(addDoctorEducationdetails(data));
    toast({
      title: "Doctor Registration !",
      description: "Education information saved successfully!",
      action: (
        <ToastAction altText="Clear">Clear</ToastAction>
      ),
    });          
  }
  function changAlert(){
    setAlert(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="medicaldegree"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">
                  Select Medical Programs
                </FormLabel>
                <FormDescription>
                  Select the medical programs you have completed.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="medicaldegree"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter registration" {...field} />
              </FormControl>
              <FormDescription>
                Enter your government registration number. This will be used to
                verify your identity and qualification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="degreepdf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Document</FormLabel>
              <FormControl>
                <label htmlFor="document" className="block w-full">
                  <input
                    id="document"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        field.onChange(e.target.files[0]);
                      }
                    }}
                    style={{ display: "none" }}
                  />
                  <Button asChild variant="outline">
                    <span className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100">
                      {field.value ? "Change Document" : "Upload Document"}
                    </span>
                  </Button>
                </label>
              </FormControl>
              {field.value && <div className="mt-4">{field.value.name}</div>}
              <FormDescription>
                Upload any relevant document here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="outline" type="submit">Final Submit</Button>
        <AlertDialog open={isAlert}>
          <AlertDialogTrigger>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>You did not completed the form !</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be done because you did not complete the form. Fill the whole form first.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
             
              <AlertDialogAction onClick={changAlert} >Ok</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </form>
    </Form>
  );
}
