"use client";
import { Separator } from "@/components/ui/separator";
import { CategoryForm } from "./category-form";

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Category</h3>
        <p className="text-sm text-muted-foreground">
          Configure your category settings. Choose your speciality and
          experience.
        </p>
      </div>
      <Separator />
      <CategoryForm />
    </div>
  );
}
