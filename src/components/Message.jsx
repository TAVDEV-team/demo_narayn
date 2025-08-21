import React, { useEffect, useRef } from "react";

export default function Message() {
  const imageRef = useRef(null);

  // Optional parallax effect
//   useEffect(() => {
//   const handleScroll = () => {
//     if (imageRef.current) {
//       const offset = window.scrollY;
//       // Smooth transform: subtle rise
//       imageRef.current.style.transform = `translateY(${offset * 0.15}px)`;
//       // Smooth fade: clamp to 0.3 minimum
//       const opacity = Math.max(1 - offset / 600, 0.3);
//       imageRef.current.style.opacity = opacity;
//     }
//   };
//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, []);


  return (
    <div className="max-w-7xl mx-auto px-20 py-12 grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-gray-50">
      {/* Headmaster Image */}
      <div className="w-96" ref={imageRef}>
        <img
          src="/sir.jpg" // replace with your uploaded headmaster image
          alt="Headmaster"
          className="w-full h-auto rounded-md shadow-lg object-cover"
        />
      </div>

      {/* Quote Section */}
      <div className="relative text-gray-900">
        <svg
          className="absolute -top-8 left-0 w-12 h-12 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5v14l7-7-7-7z"
          />
        </svg>

        <p className="text-3xl md:text-5xl font-serif leading-relaxed">
          “Your headmaster message goes here, exactly like a Harvard style
          quote inside these stylish quotation marks.”
        </p>

        <p className="mt-6 font-semibold text-lg">
          Headmaster Name
        </p>
        <p className="text-gray-600">School Name</p>

        <button className="mt-4 inline-flex items-center text-gray-700 hover:text-gray-900 font-medium">
          Read more about his work
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
