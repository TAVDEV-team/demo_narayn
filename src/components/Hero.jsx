import React from "react";

export default function Hero({
  imageSrc = "/school.jpg",
  title = "Narayanpur High School",
  description = "Narayanpur High School is a boys & girls educational institute in Narayanpur, Chauddagram, Cumilla. We treat every student as unique!",
  ctaHref = "/register",
 
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
      <div className="relative z-10 max-w-4xl bottom-0 mt-32 left-0 px-20 h-screen flex flex-col justify-center items-start text-white">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
          {title}
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl max-w-prose">
          {description}
        </p>
       
      </div>
    </div>
  );
}
