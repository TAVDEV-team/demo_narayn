import React from "react";

export default function History() {
  return (
    <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <div>
          <img
            src="/school.jpg"
            alt="Narayanpur High School"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Text */}
        <div className="text-gray-900">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            History
          </h2>
          <p className="mb-4 leading-relaxed text-sm sm:text-base md:text-lg">
            Narayanpur High School was founded in 1980 with the vision of
            providing quality education. Over the years, it has expanded from a
            small setup to a fully established institution, now educating over
            500 students.
          </p>
          <p className="mb-4 leading-relaxed text-sm sm:text-base md:text-lg">
            The school upholds its motto of{" "}
            <span className="font-semibold">discipline, education, and character</span>{" "}
            and provides modern facilities for both academic and extracurricular
            excellence.
          </p>
        </div>
      </div>
    </section>
  );
}
