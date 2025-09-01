import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MessageCarousel() {
  const messages = [
    {
      image: "/sir.jpg",
      quote:
        "“At Narayanpur High School, we believe education is not only about academic excellence but also about nurturing character, discipline, and lifelong values.”",
      name: "Shapon Kumer Chakroborty",
      title: "Headmaster, Narayanpur High School",
    },
    {
      image: "/default.png",
      quote:
        "“Our vision is to empower every student with knowledge, skills, and values that help them thrive in life.”",
      name: "Abdullah Al Mamun",
      title: "Senior Teacher, Narayanpur High School",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-16">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={40}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
      >
        {messages.map((msg, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white rounded-2xl shadow-2xl p-8 md:p-12 hover:scale-105 transform transition duration-500">
              {/* Image */}
              <div className="flex justify-center md:justify-start">
                <img
                  src={msg.image}
                  alt={msg.name}
                  className="w-64 sm:w-80 md:w-96 h-auto rounded-xl shadow-lg object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="relative text-gray-900 px-2 sm:px-0">
                {/* Decorative quote */}
                <svg
                  className="absolute -top-6 left-0 w-10 h-10 sm:w-12 sm:h-12 text-blue-200 opacity-30"
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
                  {msg.quote}
                </p>

                <p className="mt-6 font-semibold text-lg sm:text-xl md:text-2xl">
                  {msg.name}
                </p>
                <p className="text-gray-500 text-sm sm:text-base md:text-lg">
                  {msg.title}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
