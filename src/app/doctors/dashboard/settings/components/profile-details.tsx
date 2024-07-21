"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux"

export function ProfileDetailsSettings() {
  const router = useRouter();
  const handleChangePassword = () => {
    router.push("/doctors/forgot-password");
  }
  const {doctor} = useSelector((state) => state as any);
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Profile Details</CardTitle>
        <CardDescription>
          What others see about You !
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="firstname">First Name</Label>
          <Input id="firstname" className="bg-white text-black" type="text" value={doctor.firstName} aria-disabled />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastname">Last Name</Label>
          <Input id="lastname" className="bg-white text-black" type="text" value={doctor.lastName} aria-disabled />
        </div>
      
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" className="bg-white text-black" type="email" value={doctor.email} aria-disabled />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" className="bg-white text-black" type="number" value={doctor.phoneNumber} aria-disabled />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" className="bg-white text-black" type="text" value={doctor.username} aria-disabled />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" className="bg-white text-black" type="text" value={doctor.password} aria-disabled/>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleChangePassword} className="w-full bg-green-500 text-white hover:bg-red-400 hover:text-white">Change Password</Button>
      </CardFooter>
    </Card>
  )
}