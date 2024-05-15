import * as React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";

const testimonials = [
  {
    text: "Very helpful. Far easier than doing the same things on a computer. Allows quick and easy search with speedy booking. Even maintains a history of doctors visited.",
    author: {
      name: "Rishabh",
      avatar: "https://example.com/jane-avatar.png"
    }
  },
  {
    text: "Great experience! Booking appointments has never been easier. The app is intuitive and user-friendly. Highly recommended!",
    author: {
      name: "Aviral",
      avatar: "https://example.com/jane-avatar.png"
    }
  },
  {
    text: "I love this app! It saves me so much time and hassle. The interface is clean and modern, and I appreciate the ability to track my medical history.",
    author: {
      name: "Tanishka",
      avatar: "https://example.com/john-avatar.png"
    }
  },
  {
    text: "Impressive! I've been using it for a while now, and it consistently exceeds my expectations. It's like having a personal assistant for all my medical needs.",
    author: {
      name: "Tanushree",
      avatar: "https://example.com/emily-avatar.png"
    }
  },
  {
    text: "This app is a game-changer! I no longer dread scheduling appointments. Plus, the reminders keep me on track with my healthcare routine.",
    author: {
      name: "Ayush",
      avatar: "https://example.com/emily-avatar.png"
    }
  }
];

export function Testimonial() {
  return (
    <div className="mt-[100px] flex flex-col justify-center items-center gap-5">
      <div className="text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl opacity-70">
          What our users have to say
        </h1>
      </div>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-xl opacity-70">
                      {testimonial.text}
                    </h2>
                    <Avatar>
                      <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                      <AvatarFallback>{testimonial.author.name[0]}</AvatarFallback>
                    </Avatar>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
