"use client";
import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@radix-ui/react-select";
import { SidebarNav } from "./components/sidebar-nav";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/doctors/signup",
  },
  {
    title: "Account",
    href: "/doctors/signup/account",
  },
  {
    title: "Category",
    href: "/doctors/signup/category",
  },
  {
    title: "Location",
    href: "/doctors/signup/location",
  },
  {
    title: "Education",
    href: "/doctors/signup/education",
  },

 
];
const words = [
  {
    text: "Join",
  },
  {
    text: "HealSync",
    className: "text-green-500 dark:text-green-400 font-bold",
  },
  {
    text: "and",
  },
  {
    text: "Start",
  },
  {
    text: "Healing",
  },
  {
    text: "Patients",
  },
  {
    text: "Today!",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="flex justify-center gap-[10px] flex-col">
        <div className="flex justify-center flex-col items-center mt-5 gap-5">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl opacity-60">
            HealSync - Doctor Registeration
          </h1>
          <div className="scroll-m-10 text-sm tracking-tight lg:text-sm opacity-90">
            <TypewriterEffectSmooth words={words} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[60vw] overflow-hidden rounded-[0.5rem] border bg-background shadow">
            <div className="hidden space-y-6 p-10 pb-16 md:block">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                  Manage your account settings and set e-mail preferences.
                </p>
              </div>
              <Separator className="my-6" />
              <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                  <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">
                  <div className=" p-4">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
