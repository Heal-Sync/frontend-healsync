"use client"
import Categories from "@/components/Categories/Categories";
import { Faqs } from "@/components/Faqs/faqs";
import Features from "@/components/Features/Features";
import HeroSection from "@/components/HeroSection/HeroSection";
import NavBar from "@/components/NavBar/NavBar";
import ScrollDown from "@/components/ScrollDown/ScrollDown";
import { Testimonial } from "@/components/Testimonials/Testimonial";
import Image from "next/image";

export default function Home() {
  return (

    <>
        <NavBar />
    <div className="flex justify-center">
      <div className="max-w-screen-lg w-full">
        <HeroSection />
        <ScrollDown />
        <Categories />
        <Features />
        <Testimonial />
        <Faqs />
      
      </div>
    </div>
    </>
  
  );
}
