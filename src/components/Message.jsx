import React, { useRef } from "react";

export default function Message() {
  const imageRef = useRef(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-gray-50">
      {/* Headmaster Image */}
      <div className="w-full flex justify-center md:justify-start" ref={imageRef}>
        <img
          src="/sir.jpg" // replace with your uploaded headmaster image
          alt="Headmaster"
          className="w-64 sm:w-80 md:w-96 h-auto rounded-md shadow-lg object-cover"
        />
      </div>

      {/* Quote Section */}
      <div className="relative text-gray-900 px-2 sm:px-0">
        <svg
          className="absolute -top-6 left-0 w-10 h-10 sm:w-12 sm:h-12 text-gray-300"
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

        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-relaxed">
          “Your headmaster message goes here, exactly like a Harvard style
          quote inside these stylish quotation marks.”
        </p>

        <p className="mt-6 font-semibold text-base sm:text-lg md:text-xl">
          Headmaster Name
        </p>
        <p className="text-gray-600 text-sm sm:text-base">School Name</p>

        <button className="mt-4 inline-flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm sm:text-base">
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
