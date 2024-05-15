import React, { useState } from 'react';
import CategoryCard from '../Categories/Card';
import { Button } from '../ui/button';
import { ChevronRight } from "lucide-react";

interface Category {
  name: string;
  img: string;
  details: string;
}

const category_data: Category[] = [
    {
    "name": "Instant Call",
    "img": "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_instant_video_consulation.png",
    "details": ""
    },
    {
    "name": "Doctors Near You",
    "img": "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_find_doctors.png",
    "details": ""
    },
    {
    "name": "Medicines",
    "img": "https://cdni.iconscout.com/illustration/premium/thumb/home-delivery-of-online-ordered-medicine-2790910-2357304.png?f=webp",
    "details": ""
    },
    {
    "name": "Book Appointment",
    "img": "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_surgeries.png",
    "details": ""
    },
];

const Features: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
  
    const toggleShowAll = () => {
      setShowAll(!showAll);
    };
  
    return (
      <div className='mt-[100px] flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl opacity-70">
            Services
          </h1>
          <Button variant="outline" size="icon" onClick={toggleShowAll}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-5 ">
          {category_data.map((category, index) => (
            <div key={index} className="max-w-sm w-full flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img src={category.img} alt={category.name} style={{ maxHeight: '200px', width: '100%', objectFit: 'cover' }} />
              </a>
              <div className="p-5 flex">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{category.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default Features;
