"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import Image from "next/image"
  


const primelocations: { title: string; href: string;  imageSrc: string;}[] = [
  {
    title: "Banglore",
    href: "/docs/primitives/alert-dialog",
    imageSrc: "/banglore.svg",
  },
  {
    title: "Mumbai",
    href: "/docs/primitives/hover-card",
    imageSrc: "/gurugram.svg",
  },
  {
    title: "Delhi",
    href: "/docs/primitives/progress",
    imageSrc: "/delhi.svg",
  },
  {
    title: "Hyderabad",
    href: "/docs/primitives/scroll-area",
    imageSrc: "/hyderabad.svg",
  },
  {
    title: "Noida",
    href: "/docs/primitives/tabs",
    imageSrc: "/noida.svg",
  },
  {
    title: "Faridabad",
    href: "/docs/primitives/tooltip",
    imageSrc: "/faridabad.svg",
  },
]


export default function NavBar() {
  return (
    <nav>
        <div className="mt-3 flex items-center justify-evenly  " > 
        {/* text-blue-600 */}
            <div>
                <span className="font-bold text-xl">
                    HealSync
                </span>
                {/* Image Logo HealSync */}
            </div>
            <div className="relative">
            <Command>
                <CommandInput placeholder="Search Category or Healers" />
                {/* <CommandList className="absolute top-full mt-2 w-full border-gray-200 rounded-md shadow-lg">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search Emoji</CommandItem>
                    <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                    <CommandItem>Profile</CommandItem>
                    <CommandItem>Billing</CommandItem>
                    <CommandItem>Settings</CommandItem>
                    </CommandGroup>
                </CommandList> */}
            </Command>
            </div>

            <NavigationMenu>
            <NavigationMenuList className="gap-5">
                <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                        <NavigationMenuLink asChild>
                        <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                        >
                    
                            <div className="mb-2 mt-4 text-lg font-medium">
                            Video Consult
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                                Video Consultancy service,
                                connecting you with healthcare professionals 
                                for convenient and efficient medical advice and treatment from anywhere.
                            </p>
                        </a>
                        </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Find Near Doctor">
                        Find the doctor nearest you.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Instant Call">
                        Insant Video Consultancy.
                    </ListItem>
                    <ListItem href="/docs/primitives/typography" title="MediTrade">
                        MediTrade for getting Medicines Easily.
                    </ListItem>
                    </ul>
                </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base">Prime Locations</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {primelocations.map((component) => (
                        <ListItem
                        key={component.title}
                        
                        href={component.href}
                        >
                        <Image src= {component.imageSrc} className="transition-transform transform hover:scale-105 " width={100} height={100} alt={component.title}/>
                        {component.title}
                        </ListItem>
                    ))}
                    </ul>
                </NavigationMenuContent>
                </NavigationMenuItem>
                

                <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base">SignIn/SignUp</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul  className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                   
                        <ListItem
                        key="doctorsignin"
                        
                        href="/"
                        
                        >
                          <div className="flex gap-3">
                            <Image src="/login.svg" width={20} height={20} alt=""  />
                            Doctor SignIn
                          </div>
                        </ListItem>
                        <ListItem
                        key="doctorsignup"
                        
                        href="/doctors/signup"
                        >
                          <div className="flex gap-3">
                            <Image src="/register.svg" width={20} height={20} alt=""  />
                            Doctor SignUp
                          </div>
                        </ListItem>
                        <ListItem
                        key="usersignin"
                        
                        href="/"
                        >
                          <div className="flex gap-3">
                            <Image src="/login.svg" width={20} height={20} alt=""  />
                            User SignIn
                          </div>
                        </ListItem>
                        <ListItem
                        key="usersignup"
                        
                        href="/users/signup"
                        >
                          <div className="flex gap-3">
                            <Image src="/register.svg" width={20} height={20} alt=""  />
                            User SignUp
                          </div>
                        </ListItem>
                     
                    </ul>
                </NavigationMenuContent>
                </NavigationMenuItem>


                <NavigationMenuItem >
                <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} >
                    <span className="text-base">About</span>
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
                <NavigationMenuItem >
                <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} >
                    <span className="text-base">Contact</span>
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
            </NavigationMenu>
        </div>
    </nav>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"