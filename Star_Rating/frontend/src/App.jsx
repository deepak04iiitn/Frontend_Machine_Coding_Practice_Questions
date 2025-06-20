import React, { useState, useEffect } from 'react';
import { IoStarOutline, IoStar } from "react-icons/io5";

export default function App() {
  const [rating, setRating] = useState(() => {
    const savedRating = localStorage.getItem("rating");
    return savedRating ? parseInt(savedRating) : 0;
  });

  const hoverContent = {
    1: "Very bad",
    2: "Bad",
    3: "Good",
    4: "Very Good",
    5: "Excellent"
  };

  const handleClick = (index) => {
    if(rating === index + 1) {
      setRating(0);
      localStorage.removeItem("rating");
    } else {
      setRating(index + 1);
      localStorage.setItem("rating", index + 1);
    }
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center gap-4'>
      
      <div className='flex gap-3'>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="relative group">
            {index < rating ? (
              <IoStar
                size={50}
                className="cursor-pointer text-yellow-400 transition"
                onClick={() => handleClick(index)}
              />
            ) : (
              <IoStarOutline
                size={50}
                className="cursor-pointer text-yellow-400 transition"
                onClick={() => handleClick(index)}
              />
            )}

            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
              {hoverContent[index + 1]}
            </span>
          </div>
        ))}
      </div>

      <div>
        {rating > 0 && (
          <span className="text-lg font-medium text-gray-700">
            {hoverContent[rating]}
          </span>
        )}
      </div>
    </div>
  );
}
