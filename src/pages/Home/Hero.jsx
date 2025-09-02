import React from "react";

export default function Hero({
  imageSrc = "/school.jpg",
  title = "Narayanpur High School",
  description = "Narayanpur High School is a boys & girls educational institute in Narayanpur, Chauddagram, Cumilla. We treat every student as unique!",
 
}) {
  return (
    <div className="relative w-full h-[80vh] md:h-screen overflow-hidden">
      {/* Background */}
      <img
        src={imageSrc}
        alt="Narayanpur High School building"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

      {/* Overlay text */}

      <div className="relative z-10 w-full h-full flex flex-col justify-center md:justify-end items-center md:items-start text-white px-6 sm:px-12 md:px-20 pb-12 md:pb-20">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-center md:text-left">
          {title}
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl max-w-prose text-center md:text-left">
          {description}
        </p>

      </div>
    </div>
  );
}
