import { ChevronDownIcon } from "@radix-ui/react-icons"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSelector } from "react-redux"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function DemoTeamMembers() {
  const {doctor} = useSelector((state) => state as any);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bio and Links</CardTitle>
        <CardDescription>
          Your Bio and Links.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex flex-col gap-4">
          {doctor.urls.map((url: any) => {
            return (
              <div key={url.value} >
                <div>
                  <Input value={url.value} aria-disabled/>
                </div>
              </div>
            )
          })}
          <div className="grid gap-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" value={doctor.dob} aria-disabled/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" value={doctor.age} aria-disabled/>
          </div>
        </div>
        <div className="grid gap-2">
        <Label htmlFor="description">Bio</Label>
          <Textarea
            id="description"
            value={doctor.bio}
            aria-disabled
          />
        </div>
      </CardContent>
    </Card>
  )
}