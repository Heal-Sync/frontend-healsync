import React, { useState } from 'react';
import CategoryCard from './Card';
import { Button } from '../ui/button';
import { ChevronRight } from "lucide-react";
import category_data  from '../../app/controllers/categoriesdetails';

interface Category {
  name: string;
  img: string;
  details: string;
}

const Categories: React.FC = () => {
  const [showAll, setShowAll] = useState(false); 

  const rows: Category[][] = [];
  for (let i = 0; i < (showAll ? category_data.length : 3); i += 3) {
    rows.push(category_data.slice(i, i + 3));
  }

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className='mt-[100px] flex flex-col gap-5'>
      <div className='flex justify-between items-center'>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl opacity-70">
          Categories
        </h1>
        <Button variant="outline" size="icon" onClick={toggleShowAll}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-5">
          {row.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.name}
              details={category.details}
              image={category.img}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Categories;
