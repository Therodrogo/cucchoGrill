import React, { useState, useEffect } from "react";
import { Image } from "@nextui-org/react";

const slides = [
  {
    message: "",
    img: "https://i.ibb.co/7R3zTtM/WE-RE-1.png",
  },
  {
    message: "",
    img: "https://i.ibb.co/59khq4W/WE-RE-2.png",
  },
  {
    message: "",
    img: "https://i.ibb.co/VWp92Zv/WE-RE-3.png",
  },
];

const Carrousel = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="container mx-auto p-4 text-center relative">
      <div className="relative bg-blue-100 p-4 rounded-lg shadow-lg overflow-hidden">
        <Image
          src={slides[currentSlideIndex].img}
          alt="Slide image"
          className="w-full object-cover h-64 rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <h2 className="text-xl font-bold text-white text-center">{slides[currentSlideIndex].message}</h2>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition duration-300"
        >
          &#9664;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition duration-300"
        >
          &#9654;
        </button>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlideIndex ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carrousel;