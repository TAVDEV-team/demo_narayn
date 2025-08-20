import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PhotoGallery({ images = [] }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const step = () => {
      if (!scrollContainer) return;
      scrollAmount += 1; // speed
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
      requestAnimationFrame(step);
    };

    const animation = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <section className="max-w-7xl mx-auto my-10 px-4 sm:px-10">
      <div className="flex justify-between items-center mb-4 border-white ">
        <h2 className="text-3xl font-bold text-gray-900 ">Photo Gallery</h2>
        <Link
          to="/gallery"
          className="text-blue-950 font-semibold hover:underline"
        >
          View all
        </Link>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-hidden py-2"
      >
        {/* Duplicate images for seamless continuous scroll */}
        {[...images, ...images].map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-72 h-48 md:w-80 md:h-52 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transform transition"
          >
            <img
              src={img}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
