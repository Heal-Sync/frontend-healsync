"use client"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useSelector } from "react-redux"

export function DemoReportAnIssue() {
  const {doctor} = useSelector((state) => state as any);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Informations</CardTitle>
        <CardDescription>
          Your professional informations will be displayed on your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={doctor.category} aria-disabled/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="experience">Expereince</Label>
            <Input id="experience" value={doctor.experience} aria-disabled/>
          </div>
        </div>
          <Label htmlFor="subject">Degrees</Label>
        <div className="flex gap-2">
          {
            doctor.medicaldegree.map((degree: any) => {
              return (
                <div key={degree}>
                  <Input value={degree.toString().toUpperCase()} aria-disabled/>
                </div>
              )
            })
          }
        
        </div>
        <div className="flex gap-2">
          <div>
            <Label htmlFor="subject">Aadhar</Label>   
            <Input value={doctor.aadhaar} aria-disabled/>     
          </div>
          <div>
            <Label htmlFor="license">License</Label>   
            <Input value={doctor.license} aria-disabled/>     
          </div>
          <div>
            <Label htmlFor="registration">Registration</Label>   
            <Input value={doctor.registration} aria-disabled/>     
          </div>
        </div>
      </CardContent>
      
    </Card>
  )
}