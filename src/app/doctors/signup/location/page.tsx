"use client";
import { Separator } from "@/components/ui/separator";
import { NotificationsForm } from "./location-form";

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Location</h3>
        <p className="text-sm text-muted-foreground">
          Detect your location preferences.
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  );
}
