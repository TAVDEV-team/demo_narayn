import React from "react";

export default function Hero({
  imageSrc = "/school.jpg",
  title = "Narayanpur High School",
  description = "Narayanpur High School is a boys & girls educational institute in Narayanpur, Chauddagram, Cumilla.We treat every student as unique! ",
  ctaHref = "/register",
  ctaText = "Teachers Portal",
}) {
  return (
    <div className="relative w-full h-screen overflow-hidden" aria-label="Homepage hero">
      {/* Background image + gradient */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt="Narayanpur High School building"
          className="w-full h-full object-cover"
          loading="eager"
          style={{ objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/40" />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 max-w-4xl  px-6 h-full flex items-end  text-white pb-12">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">{title}</h1>
          <p className="text-lg max-w-prose">{description}</p>
          {/* <div className="mt-4">
            <a
              href={ctaHref}
              className="inline-block bg-yellow-500 hover:bg-amber-600 text-black font-semibold px-6 py-3 mx-10 rounded-md shadow hover:shadow-lg transition"
            >
              {ctaText}
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}
