import Image from 'next/image';
import React from 'react';

interface CategoryCardProps {
  title: string;
  details: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, details, image }) => {
  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img src={image} alt={title} />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{details}</p>
          <button className="animate-pulse bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Click Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
