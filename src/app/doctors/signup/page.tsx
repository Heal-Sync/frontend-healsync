"use client";
import React from "react";
import { ProfileForm } from "./profile-form";
import { Separator } from "@radix-ui/react-select";

const page = () => {
  return (
    <div>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the platform.
          </p>
        </div>
        <Separator />
        <ProfileForm />
      </div>
    </div>
  );
};

export default page;
