"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
const HeroSection = () => {
    const words = [
        {
          text: "Experience",
          className: "font-semibold",
        },
        {
          text: "expert",
          className: "font-semibold",
        },
        {
          text: "care",
          className: "font-semibold",
        },
        {
          text: "with",
          className: "font-semibold",
        },
        {
          text: "HealSync.",
          className: "text-green-500 dark:text-green-400 font-bold",
        },
      ];
  return (
    
    
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
    <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
      Begin your health journey here.
    </p>
    <TypewriterEffectSmooth words={words} />
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
      <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm hover:bg-white hover:text-black ">
        Join now
      </button>
      <Link href="/signupuser">    
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm ">
            Signup
          </button>     
      </Link>
    </div>
  </div>
  )
}

export default HeroSection;