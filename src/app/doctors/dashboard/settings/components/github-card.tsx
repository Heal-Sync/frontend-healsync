import {
    ChevronDownIcon,
    CircleIcon,
    PlusIcon,
    StarIcon,
  } from "@radix-ui/react-icons"
  
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {Avatar, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from "react-redux"
import { Label } from "@/components/ui/label"
import Link from "next/link"
  
  export function DemoGithub() {
    const {doctor} = useSelector((state) => state as any);
    const {backend} = useSelector((state) => state as any);
    return (
      <Card>
      <CardHeader>
        <CardTitle>Degree Details </CardTitle>
        <CardDescription>Your degree is visible to everyone.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2">
        <div className="">
        <Link
        target="_blank"
          href={`${backend.rootapi}/${doctor.degreepdf}.pdf`}
          className="flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          <Avatar id="degreepdf" className="h-[130px] w-[130px]">
            <AvatarImage src={'/degreeicon.jpg'} alt="@degree" />
          </Avatar>
          <Label htmlFor="degreepdf">Degree PDF</Label>
        </Link>
        </div>

        <div className="">
          <Link
          target="_blank"
            href={`${backend.rootapi}/${doctor.profileImage}.jpg`}
            className="flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              <Avatar id="profileimg" className="h-[130px] w-[130px]">
                <AvatarImage src={`${backend.rootapi}/${doctor.profileImage}.jpg`} alt="@profile" />
              </Avatar>
              <Label htmlFor="profileimg">Profile Image</Label>
          </Link>
        </div>
        <div className="h-2">

        </div>
        <Button variant="outline">Update Profile Image</Button>
      </CardContent>
      </Card>
    )
  }