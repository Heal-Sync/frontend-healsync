"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { addDoctorLocationdetails } from "@/Store/Slices/doctorSlice";

const notificationsFormSchema = z.object({
  current_location: z.boolean().default(false).optional(),
  clinic_location: z.boolean().default(false).optional(),
  home_location: z.boolean().default(false).optional(),
  detected_location: z
    .object({
      lat: z.number({required_error: "Please provide your location"}),
      lng: z.number({required_error: "Please provide your location"}),
    }),
    location_terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    }),
  isLocationComplete: z.boolean().default(false),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;


export function NotificationsForm() {
  const dispatch = useDispatch();
  const { doctor } = useSelector((state) => state as any);
  const defaultValues: Partial<NotificationsFormValues> = {
    current_location: doctor.current_location,
    clinic_location:  doctor.clinic_location,
    home_location:  doctor.home_location,
    detected_location: doctor.detected_location,
    location_terms: doctor.location_terms,
  };
  
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  function onSubmit(data: NotificationsFormValues) {
    data["isLocationComplete"] = true;
    dispatch(addDoctorLocationdetails(data));    
    toast({
      title: "Doctor Registration !",
      description: "Account information saved successfully!",
      action: (
        <ToastAction altText="Clear">Clear</ToastAction>
      ),
    });
  }

  const [detectedLocation, setDetectedLocation] = useState({ lat: 0, lng: 0 });

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDetectedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          form.setValue("detected_location", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          toast({
            title: "Error detecting location",
            description: err.message,
          });
        }
      );
    } else {
      toast({
        title: "Geolocation is not supported by this browser.",
      });
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBcjOCY2sK1-HXkxsQUqISRRYqF9p9Ul8U",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="detected_location"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <div>
                  <Button variant="outline" onClick={detectLocation}>Detect Location</Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: "640px", height: "400px" }}
            center={detectedLocation}
            zoom={15}
          >
            <Marker position={detectedLocation} />
          </GoogleMap>
        )}

        <div>
          <h3 className="mb-4 text-lg font-medium">Where is this location?</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="current_location"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Current Location
                    </FormLabel>
                    <FormDescription>
                      This is my current random location.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clinic_location"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Clinic Location</FormLabel>
                    <FormDescription>
                      This is the location of my clinic.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="home_location"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Home Location</FormLabel>
                    <FormDescription>
                      This is the location of my house.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="location_terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I agree to share my location.</FormLabel>
                <FormDescription>
                  We need your location for security purposes, and we won’t
                  share it with anyone else.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button variant="outline" type="submit">Save information</Button>
      </form>
    </Form>
  );
}
