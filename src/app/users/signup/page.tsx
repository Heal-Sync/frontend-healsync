"use client";
import React from "react";
import { Separator } from "@radix-ui/react-select";
import { ProfileFormUsers } from "./profile-form.tsx/profileusers";

const page = () => {
  return (
    <div>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Fill your proper details to get started with HealSync
          </p>
          <ProfileFormUsers />
        </div>
        <Separator />
      </div>
    </div>
  );
};

export default page;
