"use client"
import { Metadata } from "next"
import Image from "next/image"

import { cn } from "@/lib/utils"

import { DemoCookieSettings } from "./components/cookie-settings"
import { ProfileDetailsSettings } from "./components/profile-details"
import { DemoDatePicker } from "./components/date-picker"
import { DemoGithub } from "./components/github-card"
import { DemoNotifications } from "./components/notifications"
import { DemoPaymentMethod } from "./components/payment-method"
import { DemoReportAnIssue } from "./components/report-an-issue"
import { DemoShareDocument } from "./components/share-document"
import { DemoTeamMembers } from "./components/team-members"
import { MainNav } from "../components/main-nav"

import { UserNav } from "../components/user-nav"


function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  )
}

export default function CardsPage() {
  
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/cards-light.png"
          width={1280}
          height={1214}
          alt="Cards"
          className="block dark:hidden"
        />
        <Image
          src="/examples/cards-dark.png"
          width={1280}
          height={1214}
          alt="Cards"
          className="hidden dark:block"
        />
      </div>
      <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
             
            </div>
          </div>
      </div>
      <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <DemoContainer>
            <ProfileDetailsSettings />
          </DemoContainer>
          <DemoContainer>
            <DemoTeamMembers />
          </DemoContainer>
        </div>
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <DemoContainer>
            <DemoPaymentMethod />  
          </DemoContainer>
          <DemoContainer>
            <DemoShareDocument />
          </DemoContainer>
          <DemoContainer>
            <DemoDatePicker />
          </DemoContainer>
          <DemoContainer>
            <DemoNotifications />
          </DemoContainer>
        </div>
        <div className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
          <DemoContainer>
            <DemoReportAnIssue />
          </DemoContainer>
          <DemoContainer>
            <DemoGithub />
          </DemoContainer>
          <DemoContainer>
            <DemoCookieSettings />
          </DemoContainer>
        </div>
      </div>
    </>
  )
}