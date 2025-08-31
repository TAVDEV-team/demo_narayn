import React from "react";

export default function WelcomeMessage() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* One single card containing text + image */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 md:p-12 relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Decorative left border */}
          <div className="hidden sm:block absolute left-0 top-0 h-full w-1 bg-yellow-500 rounded-l-2xl "></div>

          {/* Left: Text */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Welcome to Narayanpur High School
            </h2>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
              Narayanpur High School is one of the most prestigious and important
              educational institutions in Chauddagram, Cumilla. It was established
              in 1980 with only five classes and has since grown into a respected
              institution with modern facilities and a reputation for discipline,
              education, and character. Today, it accommodates thousands of
              students across Bangla and English versions, housed in multiple
              multi-storied buildings. Narayanpur High School was founded in 1980
              with the vision of providing quality education. Over the years, it
              has expanded from a small setup to a fully established institution,
              now educating over 500 students.
            </p>
          </div>

          {/* Right: Image */}
          <div>
            <img
              src="/school.jpg"
              alt="Narayanpur High School"
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
