import React from "react";

export default function WelcomeMessage() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative">
          {/* Yellow decorative left border */}
          <div className="absolute left-0 top-0 h-full w-1 bg-yellow-500 rounded-l-2xl"></div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Welcome to Narayanpur High School
          </h2>

          <p className="text-lg leading-relaxed text-gray-700">
            Narayanpur High School is one of the most prestigious and
            important educational institutions in Cauddagram. It is located in the
            Cumilla, comprising of an area of 5.00 acres
            of land. Narayanpur Hign School was established in 1980. The
            classes started functioning with only five classes, from class six
            to Ten. The first batch of students appeared in the Matriculation
            Examination in 1962. Subsequently, with further expansion of the
            institution, it was converted into a college and was renamed as
            Adamjee Cantonment College. In 1995, for some administrative reasons
            and effective teaching, the school section was totally bifurcated
            and shifted to its present location and its original name ''Adamjee
            Cantonment Public School'' was reinstated. The school is housed in
            two buildings: six storied and five storied. At present this is a
            two-shift school with the strength of about 7,500 students. The Day
            Shift which was discontinued, has been reintroduced on 1st January
            2013. This school consists of Bangla version and English version and
            its flag is yellow colour and monogram is pasted on the flag with
            four stars, which indicate the motto of the school – discipline,
            education and character.
          </p>
        </div>
      </div>
    </section>
  );
}
