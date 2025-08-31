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
      <div className="relative flex flex-col justify-center items-start h-full px-4 sm:px-8 md:px-20">
        <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold leading-snug sm:leading-tight md:leading-tight text-white">
          {title}
        </h1>
        <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-xl max-w-prose text-white">
          {description}
        </p>

        {/* CTA button (optional) 
        <a
          href={ctaHref}
          className="mt-4 sm:mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Register Now
        </a>*/}
      </div>
    </div>
  );
}
