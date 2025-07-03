import React, { useState } from 'react';

export default function App() {
  const images = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Water
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', // Forest
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Mountain
    'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=80', // Beach
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Image Gallery</h1>

      <div className="flex flex-wrap gap-4 justify-center">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index}`}
            className="w-40 h-28 object-cover rounded cursor-pointer hover:scale-105 transition"
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            className="absolute cursor-pointer top-6 right-8 text-4xl text-white"
            onClick={closeModal}
          >
            &times;
          </button>

          <button
            className="absolute cursor-pointer left-8 text-white text-2xl"
            onClick={goPrev}
          >
            &#10094; Prev
          </button>

          <img
            src={images[currentIndex]}
            alt={`Large ${currentIndex}`}
            className="max-w-[90%] max-h-[80%] rounded shadow-lg"
          />

          <button
            className="absolute cursor-pointer right-8 text-white text-2xl"
            onClick={goNext}
          >
            Next &#10095;
          </button>
        </div>
      )}
    </div>
  );
}
