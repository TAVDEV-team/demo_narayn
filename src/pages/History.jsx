import React from 'react';

export default function History() {
  return (
    <section className="bg-white py-16 px-4 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* School image */}
        <div>
          <img
            src="/school.jpg" // adjust this if using school1.jpg etc.
            alt="Narayanpur High School"
            className="w-full rounded-xl shadow-lg"
            loading="lazy"
          />
        </div>

        {/* History content */}
        <div className="text-gray-900">
          <h2 className="text-4xl font-bold mb-4">History</h2>
          <p className="mb-4 leading-relaxed">
            <strong>Narayanpur High School</strong> is one of the most respected educational institutions in Chauddagram, Cumilla. Established in <span className="font-semibold">[Insert Year]</span>, the school began with a commitment to quality education, discipline, and character-building.
          </p>
          <p className="mb-4 leading-relaxed">
            Over the years, Narayanpur High School has expanded significantly. It currently offers classes from <span className="font-semibold">[lowest class]</span> to <span className="font-semibold">[highest class]</span>, accommodating over <span className="font-semibold">[number]</span> students in <span className="font-semibold">[single/two]</span> shifts. The institution serves both Bangla and English versions of the national curriculum.
          </p>
          <p className="mb-4 leading-relaxed">
            The school flag is <span className="font-semibold">[flag color]</span> and features the school's monogram with four stars, representing its motto: <span className="font-semibold">discipline, education, and character</span>. Its buildings include <span className="font-semibold">[describe buildings]</span> and provide an environment for both academic and extracurricular growth.
          </p>
        </div>
      </div>
    </section>
  );
}
