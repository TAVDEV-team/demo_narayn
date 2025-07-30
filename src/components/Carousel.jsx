import { useState, useEffect } from 'react';

const slides = [
  "/public/school.jpg",
  "/public/school1.jpg",
  "/school2.jpg",
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <img
        src={slides[currentIndex]}
        className="w-full h-full object-cover transition-opacity duration-700"
        alt={`Slide ${currentIndex + 1}`}
      />

      
      <button
        onClick={() =>
          setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white text-black font-bold px-3 py-1 rounded"
      >
        ❮
      </button>
      <button
        onClick={() =>
          setCurrentIndex((currentIndex + 1) % slides.length)
        }
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white text-black font-bold px-3 py-1 rounded"
      >
        ❯
      </button>

      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
